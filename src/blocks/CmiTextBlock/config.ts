import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const richTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})

export const CmiTextBlock: Block = {
  slug: 'cmiText',
  interfaceName: 'CmiTextBlock',
  labels: { singular: 'CMI Text Section', plural: 'CMI Text Sections' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'headingEn',
          label: 'Section Heading (English)',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'headingZh',
          label: '段落標題 (Chinese)',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'contentEn',
          label: 'Content (English)',
          type: 'richText',
          editor: richTextEditor,
          admin: { width: '50%' },
        },
        {
          name: 'contentZh',
          label: '內容 (Chinese)',
          type: 'richText',
          editor: richTextEditor,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Full width', value: 'full' },
        { label: 'Narrow (centered)', value: 'narrow' },
        { label: 'Two columns', value: 'two-col' },
      ],
    },
  ],
}
