import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import Image from 'next/image'
import type { RegionalUpdate } from '@/payload-types'

const getUpdates = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'regional-updates',
      where: { region: { equals: 'usa-socal' }, isPublished: { equals: true } },
      sort: '-date', limit: 4, depth: 1,
    })
    return docs as RegionalUpdate[]
  },
  ['updates-usa-socal'],
  { tags: ['regional-updates'] },
)

const DEMO_NEWS = [
  { dateZh: '2026年5月', dateEn: 'May 2026', titleZh: '南加州宣教動員大會', titleEn: 'SoCal Missions Mobilization Conference' },
  { dateZh: '2026年4月', dateEn: 'Apr 2026', titleZh: '宣教士差派禮拜回顧', titleEn: 'Missionary Commissioning Service Recap' },
  { dateZh: '2026年3月', dateEn: 'Mar 2026', titleZh: '短宣隊出發前訓練', titleEn: 'Short-Term Mission Team Pre-Trip Training' },
]

export default async function USAPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'
  const color = '#16A34A'

  const updates = await getUpdates().catch(() => [] as RegionalUpdate[])
  const newsItems = updates.length > 0
    ? updates.map(u => ({
        date: new Date(u.date).toLocaleDateString(isZh ? 'zh-TW' : 'en-US', { year: 'numeric', month: 'short' }),
        title: (isZh ? u.title_zh || u.title_en : u.title_en) ?? '',
        media: typeof u.media === 'object' && u.media !== null ? (u.media as any).url : null,
      }))
    : DEMO_NEWS.map(d => ({ date: isZh ? d.dateZh : d.dateEn, title: isZh ? d.titleZh : d.titleEn, media: null }))

  const label = isZh ? '南加州' : 'Southern California'
  const newsLabel = isZh ? '最新消息' : 'News'
  const desc = isZh
    ? 'CMI美國總部位於南加州，動員當地華人教會參與全球宣教。我們提供短宣培訓、宣教士差派禱告會，以及跨文化事工裝備課程，幫助更多信徒回應神的差遣呼召。'
    : 'CMI\'s US headquarters in Southern California mobilizes Chinese churches for global missions. We offer short-term mission training, missionary commissioning prayer services, and cross-cultural ministry equipping courses to help more believers respond to God\'s call.'

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-16 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: titleFont }}>
          {isZh ? '美國本土' : 'USA'}
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-sm" style={{ fontFamily: font }}>
          {isZh ? '從北美差遣宣教士走向萬國' : 'Sending missionaries from North America to the ends of the earth'}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: '#1A1A2E' }}>
          <div className="px-5 py-3" style={{ backgroundColor: '#1A1A2E' }}>
            <h2 className="text-white font-bold text-base" style={{ fontFamily: titleFont }}>
              {isZh ? '美國本土' : 'USA Ministries'}
            </h2>
          </div>

          <div className="p-5">
            <div className="flex justify-between items-baseline mb-3">
              <h3 className="font-bold text-base flex items-center gap-1.5" style={{ color, fontFamily: titleFont }}>
                <span>🇺🇸</span> {label}
              </h3>
              <span className="text-sm font-bold" style={{ color: '#555', fontFamily: font }}>{newsLabel}</span>
            </div>

            <div className="flex gap-4">
              <div className="flex-[3] min-w-0">
                <div className="rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}>
                  <div className="w-full flex items-center justify-center" style={{ height: '180px', backgroundColor: color }}>
                    <span className="text-7xl">🇺🇸</span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm leading-relaxed mb-3" style={{ fontFamily: font }}>{desc}</p>
                    <Link href={`/${locale}/regional/usa/socal`} className="inline-flex items-center gap-1 text-xs font-bold rounded px-3 py-1.5 text-white transition hover:opacity-90" style={{ backgroundColor: color, fontFamily: font }}>
                      {isZh ? '了解更多 →' : 'Learn More →'}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex-[2] min-w-0">
                <div className="rounded-lg overflow-hidden h-full" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}>
                  <div className="px-3 py-2 text-xs font-bold text-white" style={{ backgroundColor: color }}>{newsLabel}</div>
                  <div className="divide-y divide-gray-100">
                    {newsItems.slice(0, 3).map((item, ni) => (
                      <div key={ni} className="p-3 flex gap-2 items-start">
                        <div className="w-14 h-12 rounded shrink-0" style={{ backgroundColor: color, opacity: 0.85 }}>
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
                    <Link href={`/${locale}/regional/usa/socal`} className="text-xs font-semibold hover:opacity-75" style={{ color, fontFamily: font }}>
                      {isZh ? '查看全部 →' : 'View all →'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
