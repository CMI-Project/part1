import type { GlobalConfig } from 'payload'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true },
  admin: {
    description: 'Manage the site navigation. URLs starting with / are internal (locale prefix added automatically). External URLs start with https://',
  },
  fields: [
    {
      name: 'navItems',
      label: 'Navigation Items',
      type: 'array',
      maxRows: 8,
      admin: {
        description: 'Top-level menu tabs. Each can have a submenu.',
        initCollapsed: true,
        components: { RowLabel: '@/Header/RowLabel#RowLabel' },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'labelEn',
              label: 'Label (English)',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'labelZh',
              label: '標籤 (Chinese)',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
          admin: { description: 'e.g. /about  or  https://cmigo.org' },
        },
        {
          name: 'openInNewTab',
          label: 'Open in new tab',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'submenu',
          label: 'Submenu Items',
          type: 'array',
          maxRows: 10,
          admin: { initCollapsed: true },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'labelEn',
                  label: 'Label (English)',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'labelZh',
                  label: '標籤 (Chinese)',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
            },
            {
              name: 'openInNewTab',
              label: 'Open in new tab',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'submenu',
              label: 'Sub-submenu Items',
              type: 'array',
              maxRows: 8,
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'labelEn',
                      label: 'Label (English)',
                      type: 'text',
                      required: true,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'labelZh',
                      label: '標籤 (Chinese)',
                      type: 'text',
                      required: true,
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'url',
                  label: 'URL',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'openInNewTab',
                  label: 'Open in new tab',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
