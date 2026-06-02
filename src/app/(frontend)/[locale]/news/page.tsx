import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/payload-types'

const getLatestPosts = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      sort: '-publishedAt', limit: 3, depth: 1,
    })
    return docs as Post[]
  },
  ['latest-posts-news'],
  { tags: ['posts'] },
)

const DEMO_POSTS = [
  { dateZh: '2026年5月', dateEn: 'May 2026', titleZh: '2026年5月祈禱夥伴通訊', titleEn: '2026/05 Prayer Partner Newsletter' },
  { dateZh: '2026年4月', dateEn: 'Apr 2026', titleZh: '2026年4月祈禱夥伴通訊', titleEn: '2026/04 Prayer Partner Newsletter' },
  { dateZh: '2026年4月', dateEn: 'Apr 2026', titleZh: '第82期關懷通訊', titleEn: 'Issue #82 Care Newsletter' },
]

export default async function NewsPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const latestPosts = await getLatestPosts().catch(() => [] as Post[])
  const newsItems = latestPosts.length > 0
    ? latestPosts.map(p => ({
        date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString(isZh ? 'zh-TW' : 'en-US', { year: 'numeric', month: 'short' }) : '',
        title: p.title,
        media: typeof p.heroImage === 'object' && p.heroImage !== null ? (p.heroImage as any).url : null,
        href: `/${locale}/posts/${p.slug}`,
      }))
    : DEMO_POSTS.map(d => ({ date: isZh ? d.dateZh : d.dateEn, title: isZh ? d.titleZh : d.titleEn, media: null, href: `/${locale}/news/letters` }))

  const sections = [
    {
      labelEn: 'Global Outreach', labelZh: '胸懷普世',
      descEn: 'Carrying the burden for all nations in prayer. Intercede for every tribe, tongue, and nation as CMI missionaries reach the world\'s unreached peoples. Discover how to pray effectively for global missions.',
      descZh: '在禱告中承擔對萬民的負擔，為CMI宣教士所接觸的每個族群、語言和國家代禱。學習如何有效地為全球宣教禱告。',
      color: '#1E40AF', href: `/${locale}/news/global`,
    },
    {
      labelEn: 'Prayer Partners', labelZh: '宣教祈禱夥伴',
      descEn: 'Join our dedicated prayer partner network and receive monthly missionary prayer letters. As a prayer partner, your intercession directly supports our missionaries on the field and fuels God\'s work among the nations.',
      descZh: '加入我們的禱告夥伴網絡，每月收到宣教士代禱信。作為禱告夥伴，您的代禱直接支持工場上的宣教士，並推動神在萬國中的工作。',
      color: '#6B21A8', href: `/${locale}/news/partners`,
    },
    {
      labelEn: 'Missionary Letters', labelZh: '宣教士代禱信',
      descEn: 'Read firsthand accounts from our missionaries on the field. Each letter includes specific prayer requests, praise reports, and ministry updates so you can intercede with precision and faith.',
      descZh: '閱讀宣教士來自工場的第一手消息。每封信包含具體代禱事項、感恩報告和事工更新，讓您能精確而有信心地代禱。',
      color: '#9D174D', href: `/${locale}/news/letters`,
    },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-16 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#D4A017', fontFamily: font }}>
          {isZh ? '禱告與消息' : 'Prayer & Updates'}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '宣教祈禱' : 'Missionary Prayer'}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: '#1A1A2E' }}>
          <div className="px-5 py-3" style={{ backgroundColor: '#1A1A2E' }}>
            <h2 className="text-white font-bold text-base" style={{ fontFamily: titleFont }}>
              {isZh ? '宣教祈禱' : 'Missionary Prayer'}
            </h2>
          </div>

          {sections.map((s, i) => {
            const label = isZh ? s.labelZh : s.labelEn
            const desc = isZh ? s.descZh : s.descEn
            const newsLabel = isZh ? '最新消息' : 'News'

            return (
              <div key={s.href} className={i > 0 ? 'border-t border-gray-300' : ''}>
                <div className="p-5">
                  {/* Row header: label + News on same line */}
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="font-bold text-base" style={{ color: s.color, fontFamily: titleFont }}>
                      {label}
                    </h3>
                    <span className="text-sm font-bold" style={{ color: '#555', fontFamily: font }}>{newsLabel}</span>
                  </div>

                  <div className="flex gap-4">
                    {/* LEFT — Large content block */}
                    <div className="flex-[3] min-w-0">
                      <div className="rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}>
                        <div className="w-full flex items-center justify-center" style={{ height: '160px', backgroundColor: s.color }}>
                          <p className="text-white text-2xl font-bold opacity-60" style={{ fontFamily: titleFont }}>{label}</p>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600 text-sm leading-relaxed mb-3" style={{ fontFamily: font }}>{desc}</p>
                          <Link href={s.href} className="inline-flex items-center gap-1 text-xs font-bold rounded px-3 py-1.5 text-white transition hover:opacity-90" style={{ backgroundColor: s.color, fontFamily: font }}>
                            {isZh ? '了解更多 →' : 'Learn More →'}
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT — News block */}
                    <div className="flex-[2] min-w-0">
                      <div className="rounded-lg overflow-hidden h-full" style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}>
                        <div className="px-3 py-2 text-xs font-bold text-white" style={{ backgroundColor: s.color }}>{newsLabel}</div>
                        <div className="divide-y divide-gray-100">
                          {newsItems.slice(0, 3).map((item, ni) => (
                            <Link key={ni} href={item.href} className="p-3 flex gap-2 items-start block hover:bg-gray-50 transition-colors">
                              <div className="w-14 h-12 rounded shrink-0 overflow-hidden" style={{ backgroundColor: s.color, opacity: 0.85 }}>
                                {item.media && <Image src={item.media} alt="" width={56} height={48} className="w-full h-full object-cover" />}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: font }}>{item.date}</p>
                                <p className="text-xs font-semibold leading-tight line-clamp-2" style={{ color: '#1A1A2E', fontFamily: titleFont }}>{item.title}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="px-3 pb-3 pt-1">
                          <Link href={s.href} className="text-xs font-semibold hover:opacity-75" style={{ color: s.color, fontFamily: font }}>
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
