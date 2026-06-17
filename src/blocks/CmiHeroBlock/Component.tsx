import React from 'react'
import { getLocale } from 'next-intl/server'
import Image from 'next/image'
import type { CmiHeroBlock as CmiHeroBlockType } from '@/payload-types'

export const CmiHeroBlockComponent: React.FC<CmiHeroBlockType> = async (props) => {
  const { titleEn, titleZh, subtitleEn, subtitleZh, backgroundImage, style = 'dark' } = props
  const locale = await getLocale()
  const isZh = locale === 'zh'

  const title = isZh ? (titleZh || titleEn) : titleEn
  const subtitle = isZh ? (subtitleZh || subtitleEn || '') : (subtitleEn || '')

  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'
  const bodyFont = isZh ? 'var(--font-chinese)' : 'var(--font-body)'

  const img = typeof backgroundImage === 'object' && backgroundImage !== null
    ? backgroundImage as any
    : null

  if (style === 'image' && img?.url) {
    return (
      <div className="relative w-full overflow-hidden" style={{ minHeight: '320px' }}>
        <Image
          src={img.url}
          alt={title ?? ''}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: titleFont }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/80 text-lg max-w-2xl" style={{ fontFamily: bodyFont }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    )
  }

  if (style === 'light') {
    return (
      <div className="py-20 px-4 text-center bg-gray-50 border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 text-lg max-w-2xl mx-auto" style={{ fontFamily: bodyFont }}>
            {subtitle}
          </p>
        )}
      </div>
    )
  }

  // Default: dark navy
  return (
    <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: titleFont }}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-white/60 text-lg max-w-2xl mx-auto" style={{ fontFamily: bodyFont }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
