'use client'
import React from 'react'
import { useRowLabel } from '@payloadcms/ui'
import type { Header } from '@/payload-types'

export const RowLabel: React.FC = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const item = data?.data as any
  const label = item?.labelEn || item?.labelZh || `Nav item ${(data?.rowNumber ?? 0) + 1}`

  return <div>{label}</div>
}
