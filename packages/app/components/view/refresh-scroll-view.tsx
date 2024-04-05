import React from 'react'
import { CustomRefreshScrollView } from './custom-refresh-scroll-view'

export function RefreshScrollView({
  contentContainerClassName,
  loading,
  onRefresh,
  children
}: {
  contentContainerClassName?: string
  loading: boolean
  onRefresh: () => void
  children: React.ReactNode
}) {
  return (
    <CustomRefreshScrollView
      contentContainerClassName={contentContainerClassName}
      loading={loading}
      onRefresh={onRefresh}
    >
      {children}
    </CustomRefreshScrollView>
  )
}
