import type { GlobalConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { revalidatePath, revalidateTag } from 'next/cache'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    description: 'Global site settings — name, logo, mission statement, contact info, giving details',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('site-settings', 'max')
        revalidatePath('/', 'layout')
        return doc
      },
    ],
  },
  fields: [
    // ── Identity ──────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Site Identity',
      fields: [
        {
          name: 'siteName',
          label: 'Site Name',
          type: 'text',
          defaultValue: 'Care Ministries International',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'siteTagline_en',
              label: 'Tagline (English)',
              type: 'text',
              defaultValue: 'Gospel into China, Gospel out of China',
              admin: { width: '50%' },
            },
            {
              name: 'siteTagline_zh',
              label: 'Tagline (Chinese)',
              type: 'text',
              defaultValue: '福音進中華，福音出中華',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'logo',
              label: 'Site Logo',
              type: 'upload',
              relationTo: 'media',
              admin: { width: '50%' },
            },
            {
              name: 'favicon',
              label: 'Favicon',
              type: 'upload',
              relationTo: 'media',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },

    // ── Who We Are ────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Who We Are Section',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'whoWeAre_title_en',
              label: 'Section Title (English)',
              type: 'text',
              defaultValue: 'Care Ministries International',
              admin: { width: '50%' },
            },
            {
              name: 'whoWeAre_title_zh',
              label: 'Section Title (Chinese)',
              type: 'text',
              defaultValue: '關懷國際宣教機構',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'whoWeAre_content_en',
          label: 'About Text (English)',
          type: 'richText',
        },
        {
          name: 'whoWeAre_content_zh',
          label: 'About Text (Chinese)',
          type: 'richText',
        },
        {
          name: 'whoWeAre_image',
          label: 'About Section Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    // ── Mission Statement ─────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Mission Statement',
      fields: [
        {
          name: 'missionStatement_en',
          label: 'Mission Statement (English)',
          type: 'textarea',
          defaultValue:
            '"Gospel into China, Gospel out of China" — Mobilizing the next generation of Chinese Christians to the nations',
        },
        {
          name: 'missionStatement_zh',
          label: 'Mission Statement (Chinese)',
          type: 'textarea',
          defaultValue: '「福音進中華，福音出中華」— 動員下一代華裔基督徒走向萬國',
        },
      ],
    },

    // ── Contact ───────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Contact Information',
      fields: [
        {
          name: 'contactEmail',
          label: 'Contact Email',
          type: 'email',
        },
        {
          name: 'contactPhone',
          label: 'Phone Number',
          type: 'text',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'contactAddress_en',
              label: 'Address (English)',
              type: 'textarea',
              admin: { width: '50%' },
            },
            {
              name: 'contactAddress_zh',
              label: 'Address (Chinese)',
              type: 'textarea',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },

    // ── Social Media ─────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Social Media',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'facebookUrl',
              label: 'Facebook URL',
              type: 'text',
              admin: { width: '33%' },
            },
            {
              name: 'youtubeUrl',
              label: 'YouTube URL',
              type: 'text',
              admin: { width: '33%' },
            },
            {
              name: 'instagramUrl',
              label: 'Instagram URL',
              type: 'text',
              admin: { width: '34%' },
            },
          ],
        },
      ],
    },

    // ── Get Involved Cards ────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Get Involved Cards (Homepage)',
      admin: {
        description: 'The three "Give / Pray / Go" cards shown on the homepage. Leave empty to use defaults.',
      },
      fields: [
        {
          name: 'getInvolvedCards',
          label: 'Cards',
          type: 'array',
          maxRows: 6,
          admin: {
            description: 'Add up to 6 cards. Leave empty to use the built-in Give / Pray / Go defaults.',
            initCollapsed: true,
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
                  name: 'ctaEn',
                  label: 'Button Label (English)',
                  type: 'text',
                  admin: { width: '50%' },
                },
                {
                  name: 'ctaZh',
                  label: '按鈕文字 (Chinese)',
                  type: 'text',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'href',
                  label: 'Link URL',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'e.g. /giving  (locale prefix added automatically)',
                  },
                },
                {
                  name: 'icon',
                  label: 'Icon',
                  type: 'select',
                  defaultValue: 'heart',
                  options: [
                    { label: 'Heart (Give)', value: 'heart' },
                    { label: 'Globe (Pray)', value: 'globe' },
                    { label: 'Map Pin (Go)', value: 'mappin' },
                    { label: 'Book Open', value: 'book' },
                    { label: 'Users', value: 'users' },
                    { label: 'Star', value: 'star' },
                  ],
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'color',
              label: 'Accent Color (hex)',
              type: 'text',
              defaultValue: '#D4A017',
              admin: {
                description: '#D4A017 = gold, #6B21A8 = purple, #1E40AF = blue',
              },
            },
          ],
        },
      ],
    },

    // ── Giving ────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Giving Information',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'zelleInfo_en',
              label: 'Zelle Instructions (English)',
              type: 'textarea',
              admin: { width: '50%' },
            },
            {
              name: 'zelleInfo_zh',
              label: 'Zelle Instructions (Chinese)',
              type: 'textarea',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'paypalLink',
          label: 'PayPal / Credit Card Link',
          type: 'text',
        },
        {
          name: 'otherGiving_en',
          label: 'Other Giving Methods (English)',
          type: 'richText',
        },
        {
          name: 'otherGiving_zh',
          label: 'Other Giving Methods (Chinese)',
          type: 'richText',
        },
      ],
    },
  ],
}
