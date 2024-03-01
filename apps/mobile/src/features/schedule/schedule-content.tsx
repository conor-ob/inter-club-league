import { Skeleton } from '@/components/loaders/skeleton'
import { useScheduleQuery } from '@/graphql/use-schedule-query'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { Platform, RefreshControl, ScrollView, View } from 'react-native'
import { ScheduleList } from './schedule-list'

export function ScheduleContent() {
  const { data, loading, error, refetch } = useScheduleQuery()
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
        'mx-4': Platform.OS === 'android',
        'mx-5': Platform.OS === 'ios'
      })}
      contentInsetAdjustmentBehavior='automatic'
      refreshControl={
        <RefreshControl
          refreshing={refreshing === true}
          onRefresh={() => {
            handleRefresh()
          }}
        />
      }
    >
      <View className='my-8'>
        <View />
        {data && !loading ? (
          <ScheduleList schedule={data.schedule} />
        ) : (
          <View>
            <SegmentedControl
              values={['Upcoming', 'Completed']}
              enabled={false}
            />
            <Skeleton className='mb-2 mt-6 h-6 w-20' />
            <Skeleton className='mb-2 mt-1 h-36 w-full rounded-xl' />
            <Skeleton className='mb-2 mt-6 h-6 w-24' />
            <Skeleton className='mb-2 mt-1 h-72 w-full rounded-xl' />
          </View>
        )}
      </View>
    </ScrollView>
  )
}
