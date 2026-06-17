import React from 'react'
import { getLocale } from 'next-intl/server'
import RichText from '@/components/RichText'
import type { CmiTextBlock as CmiTextBlockType } from '@/payload-types'

export const CmiTextBlockComponent: React.FC<CmiTextBlockType> = async (props) => {
  const { headingEn, headingZh, contentEn, contentZh, layout = 'full' } = props
  const locale = await getLocale()
  const isZh = locale === 'zh'

  const heading = isZh ? (headingZh || headingEn || '') : (headingEn || '')
  const content = isZh ? (contentZh || contentEn) : contentEn

  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'
  const bodyFont = isZh ? 'var(--font-chinese)' : 'var(--font-body)'

  const maxWidth =
    layout === 'narrow' ? 'max-w-2xl' :
    layout === 'two-col' ? 'max-w-6xl' :
    'max-w-4xl'

  return (
    <section className={`${maxWidth} mx-auto px-4 py-10`}>
      {heading && (
        <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
          {heading}
        </h2>
      )}
      {content && (
        <div style={{ fontFamily: bodyFont }} className="prose prose-gray max-w-none">
          <RichText data={content} />
        </div>
      )}
    </section>
  )
}
