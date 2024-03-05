import { useScheduleQuery } from '@/graphql/use-schedule-query'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import cx from 'classnames'
import { Skeleton } from 'moti/skeleton'
import { useCallback, useEffect, useState } from 'react'
import {
  Platform,
  RefreshControl,
  ScrollView,
  View,
  useColorScheme
} from 'react-native'
import { ScheduleList } from './schedule-list'

export function ScheduleFeature() {
  const colorScheme = useColorScheme()
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
          refreshing={refreshing}
          onRefresh={() => {
            handleRefresh()
          }}
        />
      }
    >
      <View className='py-8'>
        {data ? (
          <ScheduleList schedule={data.schedule} />
        ) : (
          <View>
            <SegmentedControl
              values={['Upcoming', 'Completed']}
              enabled={false}
            />
            <View className='h-6' />
            <Skeleton colorMode={colorScheme} width={'20%'} height={24} />
            <View className='h-4' />
            <Skeleton colorMode={colorScheme} width={'100%'} height={128} />
            <View className='h-6' />
            <Skeleton colorMode={colorScheme} width={'30%'} height={24} />
            <View className='h-4' />
            <Skeleton colorMode={colorScheme} width={'100%'} height={256} />
          </View>
        )}
      </View>
    </ScrollView>
  )
}
