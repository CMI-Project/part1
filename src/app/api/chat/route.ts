import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Singleton client — avoids creating a new instance on every request
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, locale = 'en', conversationHistory = [] } = body as {
      message: string
      locale: string
      conversationHistory: { role: 'user' | 'assistant'; content: string }[]
    }

    if (!message?.trim()) {
      return Response.json({ error: 'message is required' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 })
    }

    const isZh = locale === 'zh'
    const payload = await getPayload({ config: configPromise })

    // ── Fetch CMS context in parallel ────────────────────────────────────────
    const [eventsRes, regionsRes, settingsRes, pagesRes, chatCfgRes] = await Promise.allSettled([
      payload.find({
        collection: 'events',
        where: {
          isActive: { equals: true },
          date: { greater_than: new Date().toISOString() },
        },
        sort: 'order date',
        limit: 5,
        depth: 0,
      }),
      payload.find({ collection: 'regions', sort: 'order', limit: 10, depth: 0 }),
      payload.findGlobal({ slug: 'site-settings', depth: 0 }),
      payload.find({
        collection: 'pages',
        where: { _status: { equals: 'published' } },
        select: { slug: true, title: true, titleEn: true, titleZh: true } as any,
        limit: 20,
        depth: 0,
      }),
      payload.findGlobal({ slug: 'chat-config', depth: 0 }),
    ])

    const events   = eventsRes.status   === 'fulfilled' ? eventsRes.value.docs   : []
    const regions  = regionsRes.status  === 'fulfilled' ? regionsRes.value.docs  : []
    const settings = settingsRes.status === 'fulfilled' ? (settingsRes.value as any) : null
    const pages    = pagesRes.status    === 'fulfilled' ? pagesRes.value.docs    : []
    const chatCfg  = chatCfgRes.status  === 'fulfilled' ? (chatCfgRes.value as any) : null

    // Respect the admin's on/off toggle
    if (chatCfg?.isEnabled === false) {
      return Response.json({ error: 'Chatbot is disabled' }, { status: 503 })
    }

    // ── Build CMS context snapshot ────────────────────────────────────────────
    const cmsContext = JSON.stringify(
      {
        upcomingEvents: events.map((e: any) => ({
          title:            isZh ? (e.titleZh    || e.titleEn)      : e.titleEn,
          date:             e.date,
          endDate:          e.endDate ?? null,
          location:         isZh ? (e.location_zh || e.location_en) : e.location_en,
          registrationLink: e.registrationLink ?? null,
        })),
        regions: regions.map((r: any) => ({
          name:      isZh ? (r.nameZh      || r.nameEn)      : r.nameEn,
          countries: isZh ? (r.countriesZh || r.countriesEn) : r.countriesEn,
          pageUrl:   r.href,
        })),
        missionStatement: isZh
          ? (settings?.missionStatement_zh || settings?.missionStatement_en)
          : settings?.missionStatement_en,
        contactEmail: settings?.contactEmail ?? null,
        contactPhone: settings?.contactPhone ?? null,
        givingMethods: {
          zelle:  isZh ? settings?.zelleInfo_zh    : settings?.zelleInfo_en,
          paypal: settings?.paypalLink ?? null,
        },
        publishedPages: pages.map((p: any) => ({
          slug:  p.slug,
          title: isZh ? (p.titleZh || p.titleEn || p.title) : (p.titleEn || p.title),
        })),
      },
      null,
      2,
    )

    // ── System prompt ─────────────────────────────────────────────────────────
    const languageRule = isZh
      ? 'CRITICAL: You MUST respond exclusively in Traditional Chinese (繁體中文). Never respond in English.'
      : 'CRITICAL: You MUST respond exclusively in English. Never respond in Chinese.'

    const systemPrompt = `You are a warm, friendly, faith-based assistant for USA Care Ministries International (CMI / 美國國際關懷協會) — a Chinese Christian cross-cultural missions organization.

## Your purpose
Help visitors with:
- **Navigation** — point users to the right page or section
- **Events** — share upcoming events, conferences, and training
- **Giving** — explain how to donate (Zelle, PayPal/Credit Card, other methods)
- **Prayer** — invite users to become prayer partners; accept prayer requests
- **Missions** — describe CMI's work in Asia, Middle East, Africa, and USA
- **General FAQ** — answer questions about CMI's identity, mission, and team

## Tone & style
- Warm, welcoming, and Christ-centered
- Concise: 1–3 sentences unless more detail is clearly needed
- Encouraging — never pushy or pressuring
- When referring to the organization use "CMI" or "我們" (we)

## Language rule
${languageRule}

## Live website data (use this to give accurate answers)
\`\`\`json
${cmsContext}
\`\`\`
${chatCfg?.systemPromptExtra ? `\n## Additional admin instructions\n${chatCfg.systemPromptExtra}\n` : ''}
## Key page URLs (prepend the current locale prefix, e.g. /zh or /en)
- About CMI:              /about
- Statement of Faith:     /about/faith
- Our Missionaries:       /about/missionaries
- Regional Ministries:    /regional  (Asia → /regional/asia, etc.)
- Missionary Prayer:      /news
- Giving / Donations:     /giving  (Zelle → /giving/zelle, PayPal → /giving/paypal)
- Events & Training:      /mobilization/conferences
- Contact Us:             /contact
- Become a Prayer Partner:/news/partners

## Closing guidance
At the end of conversations, gently invite the visitor to:
1. Become a prayer partner at /news/partners
2. Give at /giving
3. Leave their contact info through /contact`

    // ── Stream from Claude ────────────────────────────────────────────────────
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = anthropic.messages.stream({
            model: 'claude-sonnet-4-6',
            max_tokens: 1024,
            // Cache the stable system prompt — reduces latency and cost on repeated calls
            system: [
              {
                type: 'text',
                text: systemPrompt,
                cache_control: { type: 'ephemeral' },
              },
            ],
            messages: [
              // Existing conversation history
              ...conversationHistory.map((m) => ({
                role: m.role,
                content: m.content,
              })),
              // Current user message
              { role: 'user' as const, content: message },
            ],
          })

          for await (const event of anthropicStream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }

          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type':   'text/plain; charset=utf-8',
        'Cache-Control':  'no-cache',
        'X-Accel-Buffering': 'no', // disable nginx buffering for streaming
      },
    })
  } catch (err: any) {
    console.error('[/api/chat]', err)
    return Response.json(
      { error: err?.message ?? 'Internal server error' },
      { status: 500 },
    )
  }
}
