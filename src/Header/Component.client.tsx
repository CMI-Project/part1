'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Search, Menu, X, Plus, Minus, Globe, ChevronDown } from 'lucide-react'
import type { Header } from '@/payload-types'

// ─── Types matching the new Header CMS config ────────────────────────────────
interface CmsSubSubItem {
  labelEn: string
  labelZh: string
  url: string
  openInNewTab?: boolean
}
interface CmsSubItem {
  labelEn: string
  labelZh: string
  url: string
  openInNewTab?: boolean
  submenu?: CmsSubSubItem[]
}
interface CmsNavItem {
  labelEn: string
  labelZh: string
  url: string
  openInNewTab?: boolean
  submenu?: CmsSubItem[]
}

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations()
  const locale = useLocale()
  const isZh = locale === 'zh'

  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [expandedSubItem, setExpandedSubItem] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMobileOpen(false)
    setExpandedItem(null)
    setExpandedSubItem(null)
  }, [pathname])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en'
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  // Prepend /{locale} to internal paths; leave external URLs and /admin untouched
  const buildHref = (url: string) => {
    if (!url) return `/${locale}`
    if (url.startsWith('http') || url.startsWith('//') || url === '/admin') return url
    if (url.startsWith(`/${locale}/`) || url === `/${locale}`) return url
    return `/${locale}${url.startsWith('/') ? url : `/${url}`}`
  }

  // Hardcoded fallback — used when the CMS Header global has no items yet
  const fallbackNav = [
    {
      label: t('nav.about'),
      href: `/${locale}/about`,
      submenu: [
        { label: isZh ? '信仰告白' : 'Statement of Faith', href: `/${locale}/about/faith` },
        { label: isZh ? '異象與使命' : 'Vision & Mission', href: `/${locale}/about/mission` },
        { label: isZh ? '我們的宣教士' : 'Our Missionaries', href: `/${locale}/about/missionaries` },
        { label: isZh ? '我們的宣教事工' : 'Our Ministries', href: `/${locale}/about/ministries` },
        { label: isZh ? '國際總部網站' : 'HQ Website', href: 'https://cmigo.org', external: true },
        { label: isZh ? '管理員登入' : 'Admin Login', href: '/admin' },
      ],
    },
    {
      label: t('nav.ministry'),
      href: `/${locale}/regional`,
      submenu: [
        {
          label: isZh ? '亞洲事工' : 'Asia', href: `/${locale}/regional/asia`,
          submenu: [
            { label: isZh ? '柬埔寨' : 'Cambodia', href: `/${locale}/regional/asia/cambodia` },
            { label: isZh ? '印尼' : 'Indonesia', href: `/${locale}/regional/asia/indonesia` },
            { label: isZh ? '台灣' : 'Taiwan', href: `/${locale}/regional/asia/taiwan` },
          ],
        },
        {
          label: isZh ? '中東地區' : 'Middle East', href: `/${locale}/regional/middle-east`,
          submenu: [
            { label: isZh ? '土耳其' : 'Turkey', href: `/${locale}/regional/middle-east/turkey` },
            { label: isZh ? '黎巴嫩' : 'Lebanon', href: `/${locale}/regional/middle-east/lebanon` },
          ],
        },
        {
          label: isZh ? '非洲地區' : 'Africa', href: `/${locale}/regional/africa`,
          submenu: [{ label: isZh ? '迦納' : 'Ghana', href: `/${locale}/regional/africa/ghana` }],
        },
        {
          label: isZh ? '美國本土' : 'USA', href: `/${locale}/regional/usa`,
          submenu: [{ label: isZh ? '南加州' : 'Southern California', href: `/${locale}/regional/usa/socal` }],
        },
        {
          label: isZh ? '宣教動員' : 'Mobilization', href: `/${locale}/mobilization`,
          submenu: [
            { label: isZh ? '宣教課程' : 'Training Courses', href: `/${locale}/mobilization/training` },
            { label: isZh ? '特別聚會' : 'Special Conferences', href: `/${locale}/mobilization/conferences` },
            { label: isZh ? '宣教祈禱團契' : 'Prayer Fellowships', href: `/${locale}/mobilization/prayer` },
          ],
        },
      ],
    },
    {
      label: t('nav.prayer'),
      href: `/${locale}/news`,
      submenu: [
        { label: isZh ? '胸懷普世' : 'Global Outreach', href: `/${locale}/news/global` },
        { label: isZh ? '宣教祈禱夥伴' : 'Prayer Partners', href: `/${locale}/news/partners` },
        { label: isZh ? '宣教祈禱期採' : 'Prayer Newsletter', href: `/${locale}/news/newsletters` },
        { label: isZh ? '宣教士代禱信' : 'Missionary Letters', href: `/${locale}/news/letters` },
      ],
    },
    {
      label: t('nav.giving'),
      href: `/${locale}/giving`,
      submenu: [
        { label: isZh ? '透過 Zelle 奉獻' : 'Give via Zelle', href: `/${locale}/giving/zelle` },
        { label: isZh ? '透過 PayPal、信用卡奉獻' : 'Give via PayPal / Credit Card', href: `/${locale}/giving/paypal` },
        { label: isZh ? '其他奉獻方式' : 'Other Methods', href: `/${locale}/giving/other` },
      ],
    },
    {
      label: t('nav.contact'),
      href: `/${locale}/contact`,
      submenu: [
        { label: isZh ? '聯絡方式' : 'Contact Info', href: `/${locale}/contact` },
        { label: isZh ? '成為宣教祈禱夥伴' : 'Become a Prayer Partner', href: `/${locale}/news/partners` },
      ],
    },
  ]

  // Convert CMS nav items (new labelEn/labelZh format) to internal shape
  const cmsRaw = ((data as any).navItems ?? []) as CmsNavItem[]
  const hasCmsNav = cmsRaw.length > 0 && 'labelEn' in cmsRaw[0]

  const cmsNav = cmsRaw.map((item) => ({
    label: isZh ? item.labelZh : item.labelEn,
    href: buildHref(item.url),
    external: item.openInNewTab,
    submenu: (item.submenu ?? []).map((sub) => ({
      label: isZh ? sub.labelZh : sub.labelEn,
      href: buildHref(sub.url),
      external: sub.openInNewTab,
      submenu: (sub.submenu ?? []).map((ss) => ({
        label: isZh ? ss.labelZh : ss.labelEn,
        href: buildHref(ss.url),
        external: ss.openInNewTab,
      })),
    })),
  }))

  const navItems = hasCmsNav ? cmsNav : fallbackNav

  const isActive = (href: string) => {
    if (href.startsWith('http')) return false
    const base = `/${locale}`
    if (href === base) return pathname === base || pathname === `${base}/`
    return pathname.startsWith(href)
  }

  const BRAND = '#7A5080'
  const fontChinese = 'var(--font-chinese)'
  const fontBody = 'var(--font-body)'
  const fontDisplay = 'var(--font-display)'

  return (
    <header className="sticky top-0 z-50 bg-white" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>

      {/* ── ROW 1: Logo + Language switcher ── */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: '72px' }}>

        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center shrink-0">
          <img
            src="/images/cmi-logo.png"
            alt="CMI 美國國際關懷協會"
            className="object-contain"
            style={{ height: '52px', width: 'auto' }}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement
              el.style.display = 'none'
              const fallback = document.getElementById('logo-fallback')
              if (fallback) fallback.style.display = 'flex'
            }}
          />
          <div id="logo-fallback" className="hidden items-center gap-2">
            <img src="/favicon.svg" alt="" style={{ height: '44px', width: '44px' }} />
            <div>
              <p className="font-bold text-base leading-tight" style={{ color: BRAND, fontFamily: isZh ? fontChinese : fontDisplay }}>
                {isZh ? '美國國際關懷協會' : 'USA Care Ministries'}
              </p>
              <p className="text-xs text-gray-500 leading-tight" style={{ fontFamily: fontBody }}>
                USA Care Ministries International
              </p>
            </div>
          </div>
        </Link>

        {/* Right: Search + Language + Mobile hamburger */}
        <div className="flex items-center gap-1">
          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center border rounded overflow-hidden mr-1">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={isZh ? '搜尋…' : 'Search…'}
                className="px-3 py-1.5 text-sm w-40 focus:outline-none"
                style={{ fontFamily: isZh ? fontChinese : fontBody }}
              />
              <button type="submit" className="px-2 py-1.5 text-gray-500 hover:text-gray-800 border-l">
                <Search size={14} />
              </button>
              <button type="button" onClick={() => setSearchOpen(false)} className="px-2 py-1.5 text-gray-400 hover:text-gray-700">
                <X size={14} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              style={{ color: '#555' }}
              title={isZh ? '搜尋' : 'Search'}
            >
              <Search size={18} />
            </button>
          )}

          {/* Language switcher */}
          <button
            onClick={switchLanguage}
            className="flex items-center gap-1 px-3 py-1.5 rounded border hover:bg-gray-50 transition-colors text-sm font-medium"
            style={{ color: BRAND, borderColor: BRAND, fontFamily: isZh ? fontChinese : fontBody }}
            title={isZh ? 'Switch to English' : '切換中文'}
          >
            <Globe size={15} />
            <span>{isZh ? 'EN' : '中文'}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 ml-1 rounded hover:bg-gray-100 transition-colors"
            style={{ color: '#444' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Thin accent line between rows */}
      <div style={{ height: '2px', backgroundColor: BRAND, opacity: 0.25 }} />

      {/* ── ROW 2: Desktop Navigation bar ── */}
      <div className="hidden lg:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-0.5 px-4 py-3.5 text-sm font-medium transition-colors duration-150 border-b-2 whitespace-nowrap"
                  style={{
                    color: isActive(item.href) ? BRAND : '#333',
                    borderBottomColor: isActive(item.href) ? BRAND : 'transparent',
                    fontFamily: isZh ? fontChinese : fontBody,
                  }}
                >
                  {item.label}
                  {item.submenu && <ChevronDown size={12} className="ml-0.5 opacity-50" />}
                </Link>

                {/* Dropdown */}
                {item.submenu && (
                  <div className="absolute top-full left-0 min-w-48 bg-white shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50" style={{ marginTop: '-1px' }}>
                    {item.submenu.map((sub) => (
                      <div key={sub.href} className="relative group/sub">
                        <Link
                          href={sub.href}
                          target={'external' in sub && sub.external ? '_blank' : undefined}
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50 whitespace-nowrap transition-colors"
                          style={{
                            fontFamily: isZh ? fontChinese : fontBody,
                            borderLeft: `3px solid transparent`,
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.borderLeftColor = BRAND
                            el.style.color = BRAND
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.borderLeftColor = 'transparent'
                            el.style.color = ''
                          }}
                        >
                          {sub.label}
                          {'submenu' in sub && sub.submenu && <ChevronDown size={11} className="-rotate-90 opacity-40 ml-2" />}
                        </Link>

                        {/* Sub-submenu */}
                        {'submenu' in sub && sub.submenu && (
                          <div className="absolute left-full top-0 min-w-44 bg-white shadow-lg border border-gray-100 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-150 z-50">
                            {sub.submenu.map((subsub) => (
                              <Link
                                key={subsub.href}
                                href={subsub.href}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50 transition-colors"
                                style={{
                                  fontFamily: isZh ? fontChinese : fontBody,
                                  borderLeft: `3px solid transparent`,
                                }}
                                onMouseEnter={e => {
                                  const el = e.currentTarget as HTMLElement
                                  el.style.borderLeftColor = BRAND
                                  el.style.color = BRAND
                                }}
                                onMouseLeave={e => {
                                  const el = e.currentTarget as HTMLElement
                                  el.style.borderLeftColor = 'transparent'
                                  el.style.color = ''
                                }}
                              >
                                {subsub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.href} className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  className="flex-1 px-5 py-3.5 text-sm font-semibold"
                  style={{ color: isActive(item.href) ? BRAND : '#222', fontFamily: isZh ? fontChinese : fontBody }}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <button
                    onClick={() => setExpandedItem(expandedItem === item.href ? null : item.href)}
                    className="px-4 py-3.5 text-gray-400 hover:text-gray-700"
                  >
                    {expandedItem === item.href ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                )}
              </div>

              {item.submenu && expandedItem === item.href && (
                <div className="bg-gray-50">
                  {item.submenu.map((sub) => (
                    <div key={sub.href} className="border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <Link
                          href={sub.href}
                          target={'external' in sub && sub.external ? '_blank' : undefined}
                          className="flex-1 pl-8 pr-4 py-3 text-sm text-gray-600"
                          style={{ fontFamily: isZh ? fontChinese : fontBody }}
                        >
                          {sub.label}
                        </Link>
                        {'submenu' in sub && sub.submenu && (
                          <button
                            onClick={() => setExpandedSubItem(expandedSubItem === sub.href ? null : sub.href)}
                            className="px-4 py-3 text-gray-400"
                          >
                            {expandedSubItem === sub.href ? <Minus size={13} /> : <Plus size={13} />}
                          </button>
                        )}
                      </div>
                      {'submenu' in sub && sub.submenu && expandedSubItem === sub.href && (
                        <div className="bg-gray-100">
                          {sub.submenu.map((subsub) => (
                            <Link
                              key={subsub.href}
                              href={subsub.href}
                              className="block pl-12 pr-4 py-2.5 text-sm text-gray-500 border-t border-gray-200"
                              style={{ fontFamily: isZh ? fontChinese : fontBody }}
                            >
                              {subsub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            onClick={switchLanguage}
            className="w-full flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-gray-600 border-t border-gray-200"
            style={{ fontFamily: isZh ? fontChinese : fontBody }}
          >
            <Globe size={16} />
            {isZh ? 'Switch to English' : '切換中文'}
          </button>
        </div>
      )}
    </header>
  )
}
