'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Trash2, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatWidgetProps {
  locale: string
  welcomeMessageEn?: string
  welcomeMessageZh?: string
}

// ── Brand colors ──────────────────────────────────────────────────────────────
const BRAND = '#7A5080'   // CMI mauve
const DARK  = '#1A1A2E'   // CMI navy

export function ChatWidget({ locale, welcomeMessageEn, welcomeMessageZh }: ChatWidgetProps) {
  const isZh = locale === 'zh'
  const welcomeText = isZh
    ? (welcomeMessageZh || '你好！我是CMI的小助理。有什麼可以幫助您的嗎？')
    : (welcomeMessageEn || "Hello! I'm CMI's assistant. How can I help you today?")

  const [isOpen,   setIsOpen]   = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input,    setInput]    = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef       = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Scroll when messages update
  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  // Inject welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: welcomeText }])
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    // Append user message
    const userMsg: Message = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setIsLoading(true)

    // Placeholder for the streaming assistant reply
    const assistantIdx = history.length
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const conversationHistory = history.slice(0, -1).map(m => ({
        role: m.role,
        content: m.content,
      }))

      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: text, locale, conversationHistory }),
      })

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        // Update streaming message in-place
        setMessages(prev => {
          const updated = [...prev]
          updated[assistantIdx] = { role: 'assistant', content: accumulated }
          return updated
        })
      }
    } catch {
      const errText = isZh
        ? '抱歉，發生錯誤。請稍後再試。'
        : 'Sorry, something went wrong. Please try again.'
      setMessages(prev => {
        const updated = [...prev]
        updated[assistantIdx] = { role: 'assistant', content: errText }
        return updated
      })
    } finally {
      setIsLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [input, isLoading, messages, locale, isZh])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: welcomeText }])
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Chat panel ─────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            width:     'min(400px, calc(100vw - 2rem))',
            height:    'min(560px, calc(100vh - 8rem))',
            background: '#fff',
            border:    `1px solid #e5e7eb`,
          }}
          role="dialog"
          aria-label={isZh ? 'CMI 聊天助理' : 'CMI Chat Assistant'}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ backgroundColor: BRAND }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">
                  {isZh ? 'CMI 小助理' : 'CMI Assistant'}
                </p>
                <p className="text-white/70 text-xs leading-tight">
                  {isZh ? '隨時為您服務' : 'Here to help'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                title={isZh ? '清除對話' : 'Clear chat'}
                aria-label={isZh ? '清除對話' : 'Clear conversation'}
              >
                <Trash2 size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={isZh ? '關閉' : 'Close'}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ backgroundColor: '#f9f8f7' }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                  style={
                    msg.role === 'user'
                      ? { backgroundColor: BRAND,   color: '#fff',     borderBottomRightRadius: '4px' }
                      : { backgroundColor: '#fff',   color: '#1a1a1a',  borderBottomLeftRadius:  '4px', boxShadow: '0 1px 3px rgba(0,0,0,.08)' }
                  }
                >
                  {/* Show typing cursor while streaming empty response */}
                  {msg.content || (msg.role === 'assistant' && isLoading && i === messages.length - 1
                    ? <span className="inline-block w-2 h-4 bg-current opacity-70 animate-pulse" />
                    : null
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="shrink-0 flex items-center gap-2 px-3 py-3 border-t border-gray-100"
            style={{ backgroundColor: '#fff' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isZh ? '輸入您的問題…' : 'Ask a question…'}
              disabled={isLoading}
              className="flex-1 text-sm rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50"
              style={{ '--tw-ring-color': BRAND } as React.CSSProperties}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 shrink-0"
              style={{ backgroundColor: BRAND, color: '#fff' }}
              aria-label={isZh ? '發送' : 'Send'}
            >
              {isLoading
                ? <Loader2 size={16} className="animate-spin" />
                : <Send size={15} />
              }
            </button>
          </div>

          {/* Powered-by footer */}
          <div className="shrink-0 text-center py-1.5 text-[10px] text-gray-400">
            {isZh ? '由 Claude AI 驅動' : 'Powered by Claude AI'}
          </div>
        </div>
      )}

      {/* ── Floating bubble button ──────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ backgroundColor: isOpen ? DARK : BRAND }}
        aria-label={isOpen
          ? (isZh ? '關閉聊天' : 'Close chat')
          : (isZh ? '開啟聊天助理' : 'Open chat assistant')
        }
      >
        {isOpen
          ? <X size={24} className="text-white" />
          : <MessageCircle size={24} className="text-white" />
        }
      </button>
    </>
  )
}
