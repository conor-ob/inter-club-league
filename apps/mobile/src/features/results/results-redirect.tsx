import { Skeleton } from '@/components/loaders/skeleton'
import { useRedirectQuery } from '@/graphql/use-redirect-query'
import { Redirect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'

export function ResultsRedirect() {
  const { data, loading, error, refetch } = useRedirectQuery({
    seasonId: undefined
  })
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
  }, [refetch])

  useEffect(() => {
    if (!loading) {
      setRefreshing(false)
    }
  }, [loading])

  if (data?.redirects.currentStageId) {
    return (
      <Redirect href={`/(tabs)/results/${data.redirects.currentStageId}`} />
    )
  }

  return (
    <ScrollView
      className='px-5 py-8'
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
      {loading ? (
        <View>
          <Skeleton className='h-56' />
          <View className='h-6' />
          <Skeleton className='h-72' />
        </View>
      ) : (
        <View />
      )}
    </ScrollView>
  )
}
