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
        sort: '-date',
        limit: 4,
        depth: 1,
      })
      return docs as RegionalUpdate[]
    },
    [`updates-${slug}`],
    { tags: ['regional-updates'] },
  )
}

// Demo news fallback — visible until CMS content is added
const DEMO_NEWS: Record<string, { dateZh: string; dateEn: string; titleZh: string; titleEn: string }[]> = {
  'asia-cambodia': [
    { dateZh: '2026年5月', dateEn: 'May 2026', titleZh: '柬埔寨兒童教育事工進展報告', titleEn: 'Cambodia Children\'s Education Ministry Update' },
    { dateZh: '2026年4月', dateEn: 'Apr 2026', titleZh: '復活節佈道會後記', titleEn: 'Easter Outreach Follow-up Report' },
    { dateZh: '2026年3月', dateEn: 'Mar 2026', titleZh: '三月份宣教士代禱信', titleEn: 'March Missionary Prayer Letter' },
  ],
  'asia-indonesia': [
    { dateZh: '2026年5月', dateEn: 'May 2026', titleZh: '印尼植堂事工月報', titleEn: 'Indonesia Church Planting Monthly Report' },
    { dateZh: '2026年4月', dateEn: 'Apr 2026', titleZh: '四月份宣教士分享', titleEn: 'April Missionary Update' },
    { dateZh: '2026年3月', dateEn: 'Mar 2026', titleZh: '社區服事新進展', titleEn: 'New Community Ministry Development' },
  ],
  'asia-taiwan': [
    { dateZh: '2026年5月', dateEn: 'May 2026', titleZh: '台灣宣教培訓回顧', titleEn: 'Taiwan Missions Training Recap' },
    { dateZh: '2026年4月', dateEn: 'Apr 2026', titleZh: '四月禱告事項更新', titleEn: 'April Prayer Requests Update' },
    { dateZh: '2026年3月', dateEn: 'Mar 2026', titleZh: '台灣教會差派宣教士', titleEn: 'Taiwan Church Sends New Missionary' },
  ],
}

export default async function AsiaPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const [cambodiaUpdates, indonesiaUpdates, taiwanUpdates] = await Promise.all([
    fetchUpdates('asia-cambodia')().catch(() => [] as RegionalUpdate[]),
    fetchUpdates('asia-indonesia')().catch(() => [] as RegionalUpdate[]),
    fetchUpdates('asia-taiwan')().catch(() => [] as RegionalUpdate[]),
  ])

  const countries = [
    {
      slug: 'asia-cambodia',
      flag: '🇰🇭',
      labelEn: 'Cambodia',
      labelZh: '柬埔寨',
      descEn: 'CMI missionaries in Cambodia serve vulnerable children and families through education programs, healthcare outreach, and Gospel proclamation. The ministry focuses on orphan care, literacy programs, and building partnerships with local churches.',
      descZh: 'CMI宣教士在柬埔寨透過教育計劃、醫療外展和福音宣講，服事脆弱的兒童和家庭。事工著重孤兒關懷、識字計劃，並與地方教會建立夥伴關係。',
      color: '#1E40AF',
      href: `/${locale}/regional/asia/cambodia`,
      updates: cambodiaUpdates,
    },
    {
      slug: 'asia-indonesia',
      flag: '🇮🇩',
      labelEn: 'Indonesia',
      labelZh: '印尼',
      descEn: 'In the world\'s largest archipelago nation, our missionaries partner with local believers to plant churches, train leaders, and reach unreached people groups across the islands. Community development projects open doors for the Gospel.',
      descZh: '在世界最大的群島國家，我們的宣教士與當地信徒合作，在各島嶼植堂、培訓領袖，並接觸未得之民。社區發展項目為福音打開大門。',
      color: '#1E40AF',
      href: `/${locale}/regional/asia/indonesia`,
      updates: indonesiaUpdates,
    },
    {
      slug: 'asia-taiwan',
      flag: '🇹🇼',
      labelEn: 'Taiwan',
      labelZh: '台灣',
      descEn: 'Taiwan serves as both a sending and receiving mission base. CMI works with Taiwanese churches to equip and deploy cross-cultural missionaries, while also supporting ministry to new immigrants and international students on the island.',
      descZh: '台灣既是差派基地也是接收宣教基地。CMI與台灣教會合作，裝備和差派跨文化宣教士，同時支持島上新移民和國際學生的事工。',
      color: '#1E40AF',
      href: `/${locale}/regional/asia/taiwan`,
      updates: taiwanUpdates,
    },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      {/* Hero */}
      <div className="py-16 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: titleFont }}>
          {isZh ? '亞洲事工' : 'Asia Ministries'}
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-sm" style={{ fontFamily: font }}>
          {isZh ? '服事東南亞邊緣社群，傳揚基督的愛' : 'Serving marginalized communities across Southeast Asia with the love of Christ'}
        </p>
      </div>

      {/* Figure 2 layout — bordered container */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: '#1A1A2E' }}>

          {/* Section title bar */}
          <div className="px-5 py-3" style={{ backgroundColor: '#1A1A2E' }}>
            <h2 className="text-white font-bold text-base" style={{ fontFamily: titleFont }}>
              {isZh ? '亞洲事工' : 'Asia Ministries'}
            </h2>
          </div>

          {/* Sub-item rows */}
          {countries.map((c, i) => {
            const label = isZh ? c.labelZh : c.labelEn
            const desc = isZh ? c.descZh : c.descEn
            const newsLabel = isZh ? '最新消息' : 'News'
            const demoItems = DEMO_NEWS[c.slug] ?? []

            // Use CMS updates if available, otherwise show demo
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
                  {/* Row header: sub-item label + "News" on same line */}
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="font-bold text-base flex items-center gap-1.5" style={{ color: c.color, fontFamily: titleFont }}>
                      <span>{c.flag}</span> {label}
                    </h3>
                    <span className="text-sm font-bold" style={{ color: '#555', fontFamily: font }}>{newsLabel}</span>
                  </div>

                  {/* Figure 2 two-column layout */}
                  <div className="flex gap-4">
                    {/* LEFT — Large content block (~62%) */}
                    <div className="flex-[3] min-w-0">
                      <div
                        className="rounded-lg overflow-hidden shadow-sm"
                        style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                      >
                        {/* Image area */}
                        <div
                          className="w-full relative overflow-hidden"
                          style={{ height: '180px', backgroundColor: c.color, opacity: 1 }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: c.color }}>
                            <span className="text-7xl">{c.flag}</span>
                          </div>
                        </div>
                        {/* Text content */}
                        <div className="p-4">
                          <p className="text-gray-600 text-sm leading-relaxed mb-3" style={{ fontFamily: font }}>
                            {desc}
                          </p>
                          <Link
                            href={c.href}
                            className="inline-flex items-center gap-1 text-xs font-bold rounded px-3 py-1.5 text-white transition hover:opacity-90"
                            style={{ backgroundColor: c.color, fontFamily: font }}
                          >
                            {isZh ? '了解更多 →' : 'Learn More →'}
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT — News block (~38%) */}
                    <div className="flex-[2] min-w-0">
                      <div
                        className="rounded-lg overflow-hidden h-full"
                        style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                      >
                        <div
                          className="px-3 py-2 text-xs font-bold text-white"
                          style={{ backgroundColor: c.color }}
                        >
                          {newsLabel}
                        </div>
                        <div className="divide-y divide-gray-100">
                          {newsItems.slice(0, 3).map((item, ni) => (
                            <div key={ni} className="p-3 flex gap-2 items-start">
                              {/* Thumbnail */}
                              <div
                                className="w-14 h-12 rounded shrink-0 overflow-hidden"
                                style={{ backgroundColor: c.color, opacity: 0.85 }}
                              >
                                {item.media && (
                                  <Image src={item.media} alt="" width={56} height={48} className="w-full h-full object-cover" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: font }}>{item.date}</p>
                                <p className="text-xs font-semibold leading-tight line-clamp-2" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
                                  {item.title}
                                </p>
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
