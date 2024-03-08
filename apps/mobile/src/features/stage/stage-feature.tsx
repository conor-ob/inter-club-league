import { Card } from '@/components/card/card'
import { Skeleton } from '@/components/loaders/skeleton'
import { StageNavigation } from '@/components/navigation/stage-navigation'
import { useStageFeatureQuery } from '@/graphql/use-stage-feature-query'
import cx from 'classnames'
import { useGlobalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Platform, RefreshControl, ScrollView, Text, View } from 'react-native'
import { StageInfo } from './stage-info'
import { StageMap } from './stage-map'

export function StageFeature() {
  const { id } = useGlobalSearchParams<{ id: string }>()
  const { data, loading, error, refetch } = useStageFeatureQuery({
    seasonId: undefined,
    stageId: id
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
      <View
        className={cx('py-8', {
          'px-4': Platform.OS === 'android',
          'px-5': Platform.OS === 'ios'
        })}
      >
        {loading ? (
          <View>
            {/* <Skeleton className='h-56' /> */}
            <StageNavigation baseUrl='/(tabs)/schedule' />
            <View className='h-6' />
            <Skeleton className='h-48' />
          </View>
        ) : data ? (
          <View>
            <StageNavigation baseUrl='/(tabs)/schedule' />
            <View>
              <View className='h-6' />
              <StageInfo stage={data.stage} />
            </View>
            {data?.stage.coordinates && (
              <View>
                <View className='h-6' />
                <StageMap stage={data.stage} />
              </View>
            )}
          </View>
        ) : (
          <View>
            <Card>
              <Text className='text-primary px-5 py-6'>
                {JSON.stringify(error, null, 2)}
              </Text>
            </Card>
          </View>
        )}
      </View>
      {/* <View className='py-8'>
        <StageNavigation baseUrl='/(tabs)/schedule' />
        {stageData?.stage && (
          <View>
            <View className='h-6' />
            <StageInfo stage={stageData.stage} />
          </View>
        )}

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
      </View> */}
    </ScrollView>
  )
}
