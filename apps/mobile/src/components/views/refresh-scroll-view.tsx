import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'

type RefreshScrollViewProps = {
  loading: boolean
  onRefetch: () => void
  children: React.ReactNode
}

export function RefreshScrollView({
  loading,
  onRefetch,
  children
}: RefreshScrollViewProps) {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    onRefetch()
  }, [onRefetch])

  useEffect(() => {
    if (!loading) {
      setRefreshing(false)
    }
  }, [loading])

  return (
    <ScrollView
      contentInsetAdjustmentBehavior='automatic'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            handleRefresh()
          }}
        />
      }
    >
      {children}
    </ScrollView>
  )
}
