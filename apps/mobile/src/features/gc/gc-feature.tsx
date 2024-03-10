import { Card } from '@/components/card/card'
import { CardDivider } from '@/components/card/card-divider'
import { Skeleton } from '@/components/loaders/skeleton'
import { useGcQuery } from '@/graphql/use-gc-query'
import cx from 'classnames'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, Platform, RefreshControl, Text, View } from 'react-native'
import { GcHeader } from './gc-header'
import { GcRiderComponent } from './gc-rider-component'

export function GcFeature() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, loading, error, refetch } = useGcQuery(id)
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
    <FlatList
      data={
        loading
          ? [undefined, undefined, undefined, undefined, undefined]
          : data
            ? data?.gc.gcRiders
            : [undefined]
      }
      contentInsetAdjustmentBehavior='automatic'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            handleRefresh()
          }}
        />
      }
      ItemSeparatorComponent={() => <CardDivider />}
      keyExtractor={(item, index) =>
        loading ? `loading-${index.toString()}` : data ? item.id : 'error'
      }
      renderItem={({ item }) => {
        return loading ? (
          <View
            className={cx('py-8', {
              'px-4': Platform.OS === 'android',
              'px-5': Platform.OS === 'ios'
            })}
          >
            <Skeleton className='h-4' />
          </View>
        ) : data ? (
          <GcRiderComponent key={item.id} gcRider={item} />
        ) : (
          <View>
            <Card>
              <Text className='text-primary px-5 py-6'>
                {JSON.stringify(error, null, 2)}
              </Text>
            </Card>
          </View>
        )
      }}
      ListHeaderComponent={() => <GcHeader />}
      stickyHeaderIndices={[0]}
    />
  )
}
