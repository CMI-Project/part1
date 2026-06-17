import type { Payload, PayloadRequest } from 'payload'

/**
 * CMI Pages Seed
 *
 * Creates Page documents for key static pages so admins can later edit
 * them through the Payload admin without touching code.
 *
 * SAFE TO RUN MULTIPLE TIMES — skips any page whose slug already exists.
 *
 * Trigger via: POST /api/seed-cmi-pages   (requires admin session)
 */

type PageSeed = {
  slug: string
  title: string
  titleEn: string
  titleZh: string
  blocks: any[]
}

// ─── Helper: wrap plain text as a minimal Lexical node ───────────────────────
function lexicalParagraph(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
          direction: 'ltr',
          textFormat: 0,
          textStyle: '',
        },
      ],
      direction: 'ltr',
    },
  }
}

// ─── Page definitions ─────────────────────────────────────────────────────────
const pages: PageSeed[] = [
  // ── About / Vision & Mission ────────────────────────────────────────────────
  {
    slug: 'about-mission',
    title: 'Vision & Mission',
    titleEn: 'Vision & Mission',
    titleZh: '異象與使命',
    blocks: [
      {
        blockType: 'cmiHero',
        titleEn: 'Vision & Mission',
        titleZh: '異象與使命',
        subtitleEn: '"Gospel into China, Gospel out of China"',
        subtitleZh: '「福音進中華，福音出中華」',
        style: 'dark',
      },
      {
        blockType: 'cmiText',
        headingEn: 'Our Vision',
        headingZh: '我們的異象',
        contentEn: lexicalParagraph(
          'To see Chinese Christians play a vital role in the global missions movement — bringing the Gospel into China and out to the nations.',
        ),
        contentZh: lexicalParagraph(
          '看見華裔基督徒在全球宣教運動中扮演重要角色，將福音帶入中華，也從中華帶出福音到萬國。',
        ),
        layout: 'narrow',
      },
      {
        blockType: 'cmiText',
        headingEn: 'Our Mission',
        headingZh: '我們的使命',
        contentEn: lexicalParagraph(
          'To mobilize, equip, and send Chinese Christians into cross-cultural missions — planting churches and glorifying God across Asia, the Middle East, Africa, and beyond.',
        ),
        contentZh: lexicalParagraph(
          '動員、裝備和差遣華裔基督徒參與跨文化宣教，在亞洲、中東、非洲等地服事，建立教會，榮耀主名。',
        ),
        layout: 'narrow',
      },
      {
        blockType: 'cmiText',
        headingEn: 'Our Core Values',
        headingZh: '我們的價值觀',
        contentEn: lexicalParagraph(
          'Biblical Truth · Missions Heart · Cross-Cultural Sensitivity · Discipleship — these four values shape everything we do.',
        ),
        contentZh: lexicalParagraph(
          '聖經真理 · 宣教心志 · 跨文化服事 · 門徒訓練 — 這四個價值觀塑造了我們所做的一切。',
        ),
        layout: 'narrow',
      },
    ],
  },

  // ── Regional / Asia ─────────────────────────────────────────────────────────
  {
    slug: 'regional-asia',
    title: 'Asia Ministries',
    titleEn: 'Asia Ministries',
    titleZh: '亞洲事工',
    blocks: [
      {
        blockType: 'cmiHero',
        titleEn: 'Asia Ministries',
        titleZh: '亞洲事工',
        subtitleEn: 'Serving marginalized communities across Southeast Asia with the love of Christ',
        subtitleZh: '服事東南亞邊緣社群，傳揚基督的愛',
        style: 'dark',
      },
      {
        blockType: 'cmiText',
        headingEn: 'Cambodia',
        headingZh: '柬埔寨',
        contentEn: lexicalParagraph(
          'CMI missionaries in Cambodia serve vulnerable children and families through education programs, healthcare outreach, and Gospel proclamation.',
        ),
        contentZh: lexicalParagraph(
          'CMI宣教士在柬埔寨透過教育計劃、醫療外展和福音宣講，服事脆弱的兒童和家庭。',
        ),
        layout: 'full',
      },
      {
        blockType: 'cmiText',
        headingEn: 'Indonesia',
        headingZh: '印尼',
        contentEn: lexicalParagraph(
          'In the world\'s largest archipelago nation, our missionaries partner with local believers to plant churches and reach unreached people groups.',
        ),
        contentZh: lexicalParagraph(
          '在世界最大的群島國家，我們的宣教士與當地信徒合作，植堂並接觸未得之民。',
        ),
        layout: 'full',
      },
      {
        blockType: 'cmiText',
        headingEn: 'Taiwan',
        headingZh: '台灣',
        contentEn: lexicalParagraph(
          'Taiwan serves as both a sending and receiving mission base. CMI equips Taiwanese churches to deploy cross-cultural missionaries.',
        ),
        contentZh: lexicalParagraph(
          '台灣既是差派基地也是接收宣教基地。CMI幫助台灣教會差遣跨文化宣教士。',
        ),
        layout: 'full',
      },
    ],
  },

  // ── Regional / Middle East ───────────────────────────────────────────────────
  {
    slug: 'regional-middle-east',
    title: 'Middle East',
    titleEn: 'Middle East',
    titleZh: '中東地區',
    blocks: [
      {
        blockType: 'cmiHero',
        titleEn: 'Middle East',
        titleZh: '中東地區',
        subtitleEn: 'Bringing hope and the Gospel to one of the world\'s most challenging regions',
        subtitleZh: '在充滿挑戰的地區傳揚福音，帶來盼望',
        style: 'dark',
      },
      {
        blockType: 'cmiText',
        headingEn: 'Turkey',
        headingZh: '土耳其',
        contentEn: lexicalParagraph(
          'Turkey sits at the crossroads of Europe and Asia, hosting millions of refugees. CMI missionaries serve displaced communities with humanitarian aid and the Gospel.',
        ),
        contentZh: lexicalParagraph(
          '土耳其位於歐亞交匯處，接納了數百萬難民。CMI宣教士透過人道援助和福音宣講，服事流離失所的社群。',
        ),
        layout: 'full',
      },
      {
        blockType: 'cmiText',
        headingEn: 'Lebanon',
        headingZh: '黎巴嫩',
        contentEn: lexicalParagraph(
          'Lebanon faces ongoing economic and political crises. Our missionaries bring hope and practical support to displaced families while partnering with local churches.',
        ),
        contentZh: lexicalParagraph(
          '黎巴嫩面臨持續的危機。我們的宣教士向流離失所的家庭帶來盼望和實際支持，並與地方教會合作。',
        ),
        layout: 'full',
      },
    ],
  },

  // ── Regional / Africa ────────────────────────────────────────────────────────
  {
    slug: 'regional-africa',
    title: 'Africa Ministries',
    titleEn: 'Africa Ministries',
    titleZh: '非洲地區',
    blocks: [
      {
        blockType: 'cmiHero',
        titleEn: 'Africa Ministries',
        titleZh: '非洲地區',
        subtitleEn: 'Serving vulnerable families and communities in Ghana with the love of Christ',
        subtitleZh: '服事迦納貧困家庭，傳揚福音的大愛',
        style: 'dark',
      },
      {
        blockType: 'cmiText',
        headingEn: 'Ghana',
        headingZh: '迦納',
        contentEn: lexicalParagraph(
          "CMI's ministry in Ghana focuses on community development, children's education, and church planting — bringing holistic care and the hope of the Gospel to vulnerable families.",
        ),
        contentZh: lexicalParagraph(
          'CMI在迦納的事工著重社區發展、兒童教育和植堂事工——為脆弱家庭帶來全人關懷和福音盼望。',
        ),
        layout: 'narrow',
      },
    ],
  },
]

// ─── Main seed function ───────────────────────────────────────────────────────
export const seedCmiPages = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<{ created: string[]; skipped: string[] }> => {
  const created: string[] = []
  const skipped: string[] = []

  for (const page of pages) {
    // Check if a page with this slug already exists
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      depth: 0,
    })

    if (existing.docs.length > 0) {
      payload.logger.info(`[cmi-seed] Skipping "${page.slug}" — already exists`)
      skipped.push(page.slug)
      continue
    }

    await payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      data: {
        title: page.title,
        titleEn: page.titleEn,
        titleZh: page.titleZh,
        slug: page.slug,
        _status: 'published',
        hero: { type: 'none' },
        layout: page.blocks,
        publishedAt: new Date().toISOString(),
      } as any,
    })

    payload.logger.info(`[cmi-seed] Created page "${page.slug}"`)
    created.push(page.slug)
  }

  return { created, skipped }
}
