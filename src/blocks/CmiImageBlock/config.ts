import type { Block } from 'payload'

export const CmiImageBlock: Block = {
  slug: 'cmiImage',
  interfaceName: 'CmiImageBlock',
  labels: { singular: 'CMI Image', plural: 'CMI Images' },
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'captionEn',
          label: 'Caption (English)',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'captionZh',
          label: '圖說 (Chinese)',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'size',
      label: 'Display Size',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small (centered)', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Full width', value: 'full' },
      ],
    },
  ],
}
