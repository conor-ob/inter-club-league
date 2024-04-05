import { colors } from 'app/design/colors'
import { useCallback, useEffect, useState } from 'react'
import { ScrollView, useColorScheme } from 'react-native'
import { RefreshControl } from 'react-native-web-refresh-control'

export function CustomRefreshScrollView({
  contentContainerClassName,
  loading,
  onRefresh,
  children
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
        />
      }
    >
      {children}
    </ScrollView>
  )
}
