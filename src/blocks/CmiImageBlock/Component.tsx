import React from 'react'
import { getLocale } from 'next-intl/server'
import Image from 'next/image'
import type { CmiImageBlock as CmiImageBlockType } from '@/payload-types'

export const CmiImageBlockComponent: React.FC<CmiImageBlockType> = async (props) => {
  const { image, captionEn, captionZh, size = 'medium' } = props
  const locale = await getLocale()
  const isZh = locale === 'zh'

  const img = typeof image === 'object' && image !== null ? image as any : null
  if (!img?.url) return null

  const caption = isZh ? (captionZh || captionEn || '') : (captionEn || '')
  const bodyFont = isZh ? 'var(--font-chinese)' : 'var(--font-body)'

  const containerClass =
    size === 'small' ? 'max-w-sm mx-auto' :
    size === 'full' ? 'w-full' :
    'max-w-3xl mx-auto'

  const aspectClass =
    size === 'full' ? 'aspect-[16/6]' : 'aspect-[16/9]'

  return (
    <figure className={`${containerClass} px-4 py-6`}>
      <div className={`relative w-full ${aspectClass} rounded-xl overflow-hidden shadow-md`}>
        <Image
          src={img.url}
          alt={caption || img.alt || ''}
          fill
          className="object-cover"
          sizes={size === 'full' ? '100vw' : '(max-width: 768px) 100vw, 768px'}
        />
      </div>
      {caption && (
        <figcaption
          className="mt-3 text-center text-sm text-gray-500"
          style={{ fontFamily: bodyFont }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
