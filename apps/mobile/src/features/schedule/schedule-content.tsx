import { useScheduleQuery } from '@/graphql/use-schedule-query'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import cx from 'classnames'
import { Skeleton } from 'moti/skeleton'
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
        'px-4': Platform.OS === 'android',
        'px-5': Platform.OS === 'ios'
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
        {false && !loading ? (
          <ScheduleList schedule={data.schedule} />
        ) : (
          <View>
            <SegmentedControl
              values={['Upcoming', 'Completed']}
              enabled={false}
            />
            <View className='h-6' />
            <Skeleton colorMode='dark' width={'20%'} height={24} />
            <View className='h-4' />
            <Skeleton colorMode='dark' width={'100%'} height={128} />
            <View className='h-6' />
            <Skeleton colorMode='dark' width={'30%'} height={24} />
            <View className='h-4' />
            <Skeleton colorMode='dark' width={'100%'} height={256} />
          </View>
        )}
      </View>
    </ScrollView>
  )
}
