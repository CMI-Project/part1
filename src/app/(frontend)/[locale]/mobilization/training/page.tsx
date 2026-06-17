import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

const getTrainingCourses = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'training-courses',
      sort: 'order',
      limit: 20,
      depth: 0,
    })
    return docs as any[]
  },
  ['training-courses'],
  { tags: ['training-courses'] },
)

const LEVEL_COLORS: Record<string, string> = {
  foundations: '#16A34A',
  advanced: '#1E40AF',
  intensive: '#6B21A8',
}

const LEVEL_LABELS_EN: Record<string, string> = {
  foundations: 'Foundations',
  advanced: 'Advanced',
  intensive: 'Intensive',
}

const LEVEL_LABELS_ZH: Record<string, string> = {
  foundations: '基礎',
  advanced: '進階',
  intensive: '強化',
}

// Fallback data — used until admins populate Training Courses in Payload admin
const FALLBACK_EN = [
  { titleEn: 'Introduction to Missions', level: 'foundations', descriptionEn: "Understand the theology of missions, cross-cultural ministry principles, and how to discern God's call.", duration: '6 weeks' },
  { titleEn: 'Cross-Cultural Ministry Training', level: 'advanced', descriptionEn: 'Deep dive into cultural adaptation, language learning, Gospel contextualization, and field preparation.', duration: '12 weeks' },
  { titleEn: 'Pre-Field Intensive', level: 'intensive', descriptionEn: 'Practical modules including psychological assessment, financial planning, security training, and conflict resolution.', duration: '2-week intensive' },
]

const FALLBACK_ZH = [
  { titleZh: '宣教概論', level: 'foundations', descriptionZh: '認識宣教神學基礎、跨文化服事原則，以及如何回應神的呼召。', durationZh: '6週' },
  { titleZh: '跨文化事工培訓', level: 'advanced', descriptionZh: '深入學習文化適應、語言學習策略、福音呈現方式，為前往工場做準備。', durationZh: '12週' },
  { titleZh: '宣教士差遣前訓練', level: 'intensive', descriptionZh: '包含心理評估、財務規劃、安全培訓和跨文化衝突處理等實踐課程。', durationZh: '2週密集' },
]

export default async function TrainingPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const cmsCourses = await getTrainingCourses().catch(() => [] as any[])
  const hasCms = cmsCourses.length > 0

  // Normalise to { title, desc, level, duration, href } regardless of source
  const courses = hasCms
    ? cmsCourses.map((c) => ({
        title: isZh ? (c.titleZh || c.titleEn) : c.titleEn,
        desc: isZh ? (c.descriptionZh || c.descriptionEn || '') : (c.descriptionEn || ''),
        level: c.level ?? 'foundations',
        duration: isZh ? (c.durationZh || c.duration || '') : (c.duration || ''),
        href: c.href ?? null,
      }))
    : isZh
      ? FALLBACK_ZH.map((c) => ({ title: c.titleZh, desc: c.descriptionZh, level: c.level, duration: c.durationZh, href: null }))
      : FALLBACK_EN.map((c) => ({ title: c.titleEn, desc: c.descriptionEn, level: c.level, duration: c.duration, href: null }))

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '宣教課程' : 'Training Courses'}
        </h1>
        <p className="text-white/60 mt-3 max-w-xl mx-auto" style={{ fontFamily: font }}>
          {isZh ? '系統化的培訓，裝備你走向宣教工場' : 'Systematic training to equip you for the mission field'}
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
        {courses.map((c, i) => {
          const color = LEVEL_COLORS[c.level] ?? '#6B21A8'
          const levelLabel = isZh ? (LEVEL_LABELS_ZH[c.level] ?? c.level) : (LEVEL_LABELS_EN[c.level] ?? c.level)

          return (
            <div key={i} className="bg-white rounded-xl p-7 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-xl font-bold" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
                  {c.title}
                </h2>
                <span
                  className="px-3 py-1 rounded-full text-white text-xs font-semibold shrink-0"
                  style={{ backgroundColor: color, fontFamily: font }}
                >
                  {levelLabel}
                </span>
              </div>
              <p className="text-gray-600 mb-3 leading-relaxed" style={{ fontFamily: font }}>{c.desc}</p>
              {c.duration && (
                <p className="text-sm text-gray-400 mb-3" style={{ fontFamily: font }}>
                  {isZh ? `課程時長：${c.duration}` : `Duration: ${c.duration}`}
                </p>
              )}
              {c.href && (
                <Link
                  href={c.href}
                  className="inline-block mt-1 text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color, fontFamily: font }}
                >
                  {isZh ? '了解更多 →' : 'Learn More →'}
                </Link>
              )}
            </div>
          )
        })}

        <div className="pt-6 text-center">
          <p className="text-gray-500 mb-4" style={{ fontFamily: font }}>
            {isZh ? '有興趣報名？請與我們聯絡了解更多詳情。' : 'Interested in enrolling? Contact us for more details.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-7 py-3 rounded-lg font-bold text-white transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: '#6B21A8', fontFamily: font }}
          >
            {isZh ? '聯絡我們' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </main>
  )
}
