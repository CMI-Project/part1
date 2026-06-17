import type { Block } from 'payload'

export const CmiHeroBlock: Block = {
  slug: 'cmiHero',
  interfaceName: 'CmiHeroBlock',
  labels: { singular: 'CMI Hero', plural: 'CMI Heroes' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'titleEn',
          label: 'Title (English)',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'titleZh',
          label: '標題 (Chinese)',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'subtitleEn',
          label: 'Subtitle (English)',
          type: 'textarea',
          admin: { width: '50%' },
        },
        {
          name: 'subtitleZh',
          label: '副標題 (Chinese)',
          type: 'textarea',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'style',
      label: 'Style',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark (navy background)', value: 'dark' },
        { label: 'Light (white background)', value: 'light' },
        { label: 'Image (full bleed)', value: 'image' },
      ],
    },
  ],
}
