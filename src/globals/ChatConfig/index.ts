import type { GlobalConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { revalidatePath } from 'next/cache'

export const ChatConfig: GlobalConfig = {
  slug: 'chat-config',
  admin: {
    description: 'Configure the AI chatbot widget shown on every page.',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidatePath('/', 'layout')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'isEnabled',
      label: 'Enable Chatbot',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uncheck to hide the chat bubble from the entire site.',
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'welcomeMessageEn',
          label: 'Welcome Message (English)',
          type: 'textarea',
          defaultValue:
            "Hello! I'm CMI's assistant. I can help with events, giving, prayer, and learning about our missions. How can I help you?",
          admin: { width: '50%' },
        },
        {
          name: 'welcomeMessageZh',
          label: '歡迎訊息 (Chinese)',
          type: 'textarea',
          defaultValue:
            '你好！我是CMI的小助理。我可以幫您了解活動、奉獻方式、禱告夥伴計劃或各地事工。有什麼可以幫助您的嗎？',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'systemPromptExtra',
      label: 'Extra AI Instructions (optional)',
      type: 'textarea',
      admin: {
        description:
          'Additional instructions merged into the AI system prompt. E.g. "Always mention our upcoming summer conference." Leave empty to use defaults.',
      },
    },
  ],
}
