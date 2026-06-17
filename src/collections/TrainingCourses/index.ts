import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidatePath, revalidateTag } from 'next/cache'

export const TrainingCourses: CollectionConfig = {
  slug: 'training-courses',
  admin: {
    useAsTitle: 'titleEn',
    description: 'Training courses shown on the Mobilization → Training Courses page.',
    defaultColumns: ['titleEn', 'level', 'duration', 'order'],
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
        revalidateTag('training-courses', 'max')
        revalidatePath('/en/mobilization/training')
        revalidatePath('/zh/mobilization/training')
        return doc
      },
    ],
    afterDelete: [
      () => {
        revalidateTag('training-courses', 'max')
        revalidatePath('/en/mobilization/training')
        revalidatePath('/zh/mobilization/training')
      },
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'titleEn',
          label: 'Course Title (English)',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'titleZh',
          label: '課程名稱 (Chinese)',
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
      type: 'row',
      fields: [
        {
          name: 'level',
          label: 'Level',
          type: 'select',
          required: true,
          defaultValue: 'foundations',
          options: [
            { label: 'Foundations / 基礎', value: 'foundations' },
            { label: 'Advanced / 進階', value: 'advanced' },
            { label: 'Intensive / 強化', value: 'intensive' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'duration',
          label: 'Duration',
          type: 'text',
          admin: {
            width: '50%',
            description: 'e.g. "6 weeks" / "6週"',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'durationZh',
          label: 'Duration (Chinese)',
          type: 'text',
          admin: {
            width: '50%',
            description: '例如：6週、12週、2週密集',
          },
        },
        {
          name: 'href',
          label: 'Registration / Detail URL',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Optional link (e.g. /contact or an external form URL)',
          },
        },
      ],
    },
    {
      name: 'image',
      label: 'Course Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 10,
      admin: {
        description: 'Lower = appears first. Use multiples of 10.',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
