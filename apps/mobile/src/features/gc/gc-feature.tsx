import { useGcQuery } from '@/graphql/use-gc-query'
import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { Platform, RefreshControl, ScrollView, Text, View } from 'react-native'

export function GcFeature() {
  const { data, loading, error, refetch } = useGcQuery()
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
        {data && (
          <Text className='text-primary'>
            {JSON.stringify(data.gc.id, null, 2)}
          </Text>
        )}
      </View>
    </ScrollView>
  )
}
