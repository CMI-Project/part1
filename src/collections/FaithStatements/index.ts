import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidatePath, revalidateTag } from 'next/cache'

export const FaithStatements: CollectionConfig = {
  slug: 'faith-statements',
  admin: {
    useAsTitle: 'titleEn',
    description: 'Statement of Faith articles shown on the About → Statement of Faith page.',
    defaultColumns: ['titleEn', 'titleZh', 'order'],
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
        revalidateTag('faith-statements', 'max')
        revalidatePath('/en/about/faith')
        revalidatePath('/zh/about/faith')
        return doc
      },
    ],
    afterDelete: [
      () => {
        revalidateTag('faith-statements', 'max')
        revalidatePath('/en/about/faith')
        revalidatePath('/zh/about/faith')
      },
    ],
  },
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
          name: 'bodyEn',
          label: 'Body Text (English)',
          type: 'textarea',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'bodyZh',
          label: '內文 (Chinese)',
          type: 'textarea',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 10,
      admin: {
        description: 'Lower = appears first. Use multiples of 10 (10, 20, 30…).',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
