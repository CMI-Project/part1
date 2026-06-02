import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import Image from 'next/image'
import type { RegionalUpdate } from '@/payload-types'

function fetchUpdates(slug: string) {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise })
      const { docs } = await payload.find({
        collection: 'regional-updates',
        where: { region: { equals: slug }, isPublished: { equals: true } },
        sort: '-date', limit: 4, depth: 1,
      })
      return docs as RegionalUpdate[]
    },
    [`updates-${slug}`],
    { tags: ['regional-updates'] },
  )
}

const DEMO_NEWS: Record<string, { dateZh: string; dateEn: string; titleZh: string; titleEn: string }[]> = {
  'middle-east-turkey': [
    { dateZh: '2026年5月', dateEn: 'May 2026', titleZh: '土耳其難民服事月報', titleEn: 'Turkey Refugee Ministry Monthly Report' },
    { dateZh: '2026年4月', dateEn: 'Apr 2026', titleZh: '語言班與福音外展', titleEn: 'Language Classes & Gospel Outreach' },
    { dateZh: '2026年3月', dateEn: 'Mar 2026', titleZh: '宣教士代禱信 — 三月', titleEn: 'Missionary Prayer Letter — March' },
  ],
  'middle-east-lebanon': [
    { dateZh: '2026年5月', dateEn: 'May 2026', titleZh: '黎巴嫩危機中的盼望', titleEn: 'Hope Amid Crisis in Lebanon' },
    { dateZh: '2026年4月', dateEn: 'Apr 2026', titleZh: '流離失所家庭救援計劃', titleEn: 'Displaced Families Relief Program' },
    { dateZh: '2026年3月', dateEn: 'Mar 2026', titleZh: '地方教會夥伴關係更新', titleEn: 'Local Church Partnership Update' },
  ],
}

export default async function MiddleEastPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const [turkeyUpdates, lebanonUpdates] = await Promise.all([
    fetchUpdates('middle-east-turkey')().catch(() => [] as RegionalUpdate[]),
    fetchUpdates('middle-east-lebanon')().catch(() => [] as RegionalUpdate[]),
  ])

  const countries = [
    {
      slug: 'middle-east-turkey', flag: '🇹🇷', labelEn: 'Turkey', labelZh: '土耳其',
      descEn: 'Turkey sits at the crossroads of Europe and Asia, hosting millions of refugees and unreached peoples. CMI missionaries serve displaced communities with humanitarian aid, language support, and the life-changing message of the Gospel.',
      descZh: '土耳其位於歐亞交匯處，接納了數百萬難民和未得之民。CMI宣教士透過人道援助、語言支持和福音宣講，服事流離失所的社群。',
      color: '#6B21A8', href: `/${locale}/regional/middle-east/turkey`, updates: turkeyUpdates,
    },
    {
      slug: 'middle-east-lebanon', flag: '🇱🇧', labelEn: 'Lebanon', labelZh: '黎巴嫩',
      descEn: 'Lebanon faces ongoing economic and political crises, yet God\'s work continues. Our missionaries bring hope and practical support to displaced families while partnering with local believers to strengthen the church in this strategic nation.',
      descZh: '黎巴嫩面臨持續的經濟和政治危機，然而神的工作繼續進行。我們的宣教士向流離失所的家庭帶來盼望和實際支持，同時與當地信徒合作，在這個重要國家強化教會。',
      color: '#6B21A8', href: `/${locale}/regional/middle-east/lebanon`, updates: lebanonUpdates,
    },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-16 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: titleFont }}>
          {isZh ? '中東地區' : 'Middle East'}
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-sm" style={{ fontFamily: font }}>
          {isZh ? '在充滿挑戰的地區傳揚福音，帶來盼望' : 'Bringing hope and the Gospel to one of the world\'s most challenging regions'}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: '#1A1A2E' }}>
          <div className="px-5 py-3" style={{ backgroundColor: '#1A1A2E' }}>
            <h2 className="text-white font-bold text-base" style={{ fontFamily: titleFont }}>
              {isZh ? '中東地區' : 'Middle East'}
            </h2>
          </div>

          {countries.map((c, i) => {
            const label = isZh ? c.labelZh : c.labelEn
            const desc = isZh ? c.descZh : c.descEn
            const newsLabel = isZh ? '最新消息' : 'News'
            const demoItems = DEMO_NEWS[c.slug] ?? []
            const newsItems = c.updates.length > 0
              ? c.updates.map(u => ({
                  date: new Date(u.date).toLocaleDateString(isZh ? 'zh-TW' : 'en-US', { year: 'numeric', month: 'short' }),
                  title: (isZh ? u.title_zh || u.title_en : u.title_en) ?? '',
                  media: typeof u.media === 'object' && u.media !== null ? (u.media as any).url : null,
                }))
              : demoItems.map(d => ({ date: isZh ? d.dateZh : d.dateEn, title: isZh ? d.titleZh : d.titleEn, media: null }))

            return (
              <div key={c.slug} className={i > 0 ? 'border-t border-gray-300' : ''}>
                <div className="p-5">
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="font-bold text-base flex items-center gap-1.5" style={{ color: c.color, fontFamily: titleFont }}>
                      <span>{c.flag}</span> {label}
                    </h3>
                    <span className="text-sm font-bold" style={{ color: '#555', fontFamily: font }}>{newsLabel}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-[3] min-w-0">
                      <div className="rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}>
                        <div className="w-full relative overflow-hidden" style={{ height: '180px', backgroundColor: c.color }}>
                          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: c.color }}>
                            <span className="text-7xl">{c.flag}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600 text-sm leading-relaxed mb-3" style={{ fontFamily: font }}>{desc}</p>
                          <Link href={c.href} className="inline-flex items-center gap-1 text-xs font-bold rounded px-3 py-1.5 text-white transition hover:opacity-90" style={{ backgroundColor: c.color, fontFamily: font }}>
                            {isZh ? '了解更多 →' : 'Learn More →'}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex-[2] min-w-0">
                      <div className="rounded-lg overflow-hidden h-full" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}>
                        <div className="px-3 py-2 text-xs font-bold text-white" style={{ backgroundColor: c.color }}>{newsLabel}</div>
                        <div className="divide-y divide-gray-100">
                          {newsItems.slice(0, 3).map((item, ni) => (
                            <div key={ni} className="p-3 flex gap-2 items-start">
                              <div className="w-14 h-12 rounded shrink-0 overflow-hidden" style={{ backgroundColor: c.color, opacity: 0.85 }}>
                                {item.media && <Image src={item.media} alt="" width={56} height={48} className="w-full h-full object-cover" />}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: font }}>{item.date}</p>
                                <p className="text-xs font-semibold leading-tight line-clamp-2" style={{ color: '#1A1A2E', fontFamily: titleFont }}>{item.title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-3 pb-3 pt-1">
                          <Link href={c.href} className="text-xs font-semibold hover:opacity-75" style={{ color: c.color, fontFamily: font }}>
                            {isZh ? '查看全部 →' : 'View all →'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
