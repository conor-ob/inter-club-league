import { Skeleton } from '@/components/loaders/skeleton'
import { StageNavigation } from '@/components/navigation/stage-navigation'
import { useMarshallsQuery } from '@/graphql/use-marshalls-query'
import { useStageQuery } from '@/graphql/use-stage-query'
import { useGlobalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { StageMap } from './stage-map'
import { StageMarshalls } from './stage-marshalls'

export function StageFeature() {
  const { id } = useGlobalSearchParams<{ id: string }>()
  const {
    data: stageData,
    loading: stageLoading,
    error: stageError,
    refetch: stageRefetch
  } = useStageQuery(id)
  const {
    data: marshallsData,
    loading: marshallsLoading,
    error: marshallsError,
    refetch: marshallsRefetch
  } = useMarshallsQuery(id)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    stageRefetch()
    marshallsRefetch()
  }, [stageRefetch])

  useEffect(() => {
    if (!stageLoading) {
      setRefreshing(false)
    }
  }, [stageLoading])

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
      <StageNavigation baseUrl='/(tabs)/schedule' />
      {stageData?.stage.coordinates && (
        <View>
          <View className='h-6' />
          <StageMap stage={stageData.stage} />
        </View>
      )}
      {marshallsLoading ? (
        <View>
          <View className='h-6' />
          <Skeleton className='h-64' />
        </View>
      ) : (
        marshallsData?.marshalls.marshalls.length > 0 && (
          <View>
            <View className='h-6' />
            <StageMarshalls marshalls={marshallsData.marshalls.marshalls} />
          </View>
        )
      )}
    </ScrollView>
  )
}
