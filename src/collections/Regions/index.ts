import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidatePath, revalidateTag } from 'next/cache'

export const Regions: CollectionConfig = {
  slug: 'regions',
  admin: {
    useAsTitle: 'nameEn',
    description: 'Regional ministry cards shown on the homepage. Add/edit/reorder without touching code.',
    defaultColumns: ['nameEn', 'nameZh', 'href', 'order'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('regions', 'max')
        revalidatePath('/en')
        revalidatePath('/zh')
        return doc
      },
    ],
    afterDelete: [
      () => {
        revalidateTag('regions', 'max')
        revalidatePath('/en')
        revalidatePath('/zh')
      },
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'nameEn',
          label: 'Region Name (English)',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'nameZh',
          label: '地區名稱 (Chinese)',
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
          name: 'countriesEn',
          label: 'Countries (English)',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g. Cambodia · Indonesia · Taiwan',
          },
        },
        {
          name: 'countriesZh',
          label: '國家 (Chinese)',
          type: 'text',
          admin: {
            width: '50%',
            description: '例如：柬埔寨 · 印尼 · 台灣',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'descriptionEn',
          label: 'Description (English)',
          type: 'textarea',
          admin: { width: '50%' },
        },
        {
          name: 'descriptionZh',
          label: '描述 (Chinese)',
          type: 'textarea',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'image',
      label: 'Region Image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional hero image for the region card' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'href',
          label: 'Page URL',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            description: 'e.g. /regional/asia  (locale prefix added automatically)',
          },
        },
        {
          name: 'color',
          label: 'Accent Color (hex)',
          type: 'text',
          defaultValue: '#1E40AF',
          admin: {
            width: '50%',
            description: '#1E40AF = blue, #6B21A8 = purple, #D4A017 = gold, #16A34A = green',
          },
        },
      ],
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 10,
      admin: {
        description: 'Lower number = appears first on homepage. Use multiples of 10 (10, 20, 30…) so you can insert items later.',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
