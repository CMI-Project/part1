'use client'
import React from 'react'
import { useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC = () => {
  const data = useRowLabel<any>()

  const item = data?.data as any
  const label = item?.link?.label || item?.labelEn || item?.labelZh || `Row ${(data?.rowNumber ?? 0) + 1}`

  return <div>{label}</div>
}
