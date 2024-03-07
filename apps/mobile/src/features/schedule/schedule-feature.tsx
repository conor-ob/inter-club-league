import { Skeleton } from '@/components/loaders/skeleton'
import { useStagesQuery } from '@/graphql/use-stages-query'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import {
  Platform,
  RefreshControl,
  ScrollView,
  View,
  useColorScheme
} from 'react-native'
import { ScheduleList } from './schedule-list'
import { buildSchedule } from './schedule-utils'

export function ScheduleFeature() {
  const colorScheme = useColorScheme()
  const { data, loading, error, refetch } = useStagesQuery()
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
      className={cx({
        'px-4': Platform.OS === 'android',
        'px-5': Platform.OS === 'ios'
      })}
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
      <View className='py-8'>
        {loading ? (
          <View>
            <SegmentedControl
              values={['Upcoming', 'Completed']}
              enabled={false}
            />
            <View className='h-6' />
            <Skeleton className='h-6 w-24' />
            <View className='h-4' />
            <Skeleton className='h-48' />
            <View className='h-6' />
            <Skeleton className='h-6 w-32' />
            <View className='h-4' />
            <Skeleton className='h-64' />
          </View>
        ) : (
          <ScheduleList schedule={buildSchedule(data.stages)} />
        )}
      </View>
    </ScrollView>
  )
}
