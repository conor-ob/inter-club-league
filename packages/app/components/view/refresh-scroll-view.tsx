import { colors } from 'app/design/colors'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
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
          tintColor={colors[colorScheme ?? 'light'].textColorSecondary}
          refreshing={refreshing}
          onRefresh={() => {
            handleRefresh()
          }}
          enabled={useWindowPosition() === 0}
        />
      }
    >
      {children}
    </ScrollView>
  )
}

function useWindowPosition() {
  const [scrollPosition, setPosition] = useState(0)
  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset)
    }
    window.addEventListener('scroll', updatePosition)
    updatePosition()
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])
  return scrollPosition
}
