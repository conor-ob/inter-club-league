import { colors } from 'app/design/colors'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, useColorScheme } from 'react-native'
import { RefreshControl } from './RefreshControl'

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
  const colorScheme = useColorScheme()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    onRefresh()
  }, [onRefresh])

  useEffect(() => {
    if (!loading) {
      setRefreshing(false)
    }
  }, [loading])

  return (
    <ScrollView
      contentContainerClassName={contentContainerClassName}
      contentInsetAdjustmentBehavior='automatic'
      refreshControl={
        <RefreshControl
          tintColor={colors[colorScheme ?? 'light'].brandGc}
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
