import { Card } from '@/components/card/card'
import { CardDivider } from '@/components/card/card-divider'
import { Skeleton } from '@/components/loaders/skeleton'
import { ResultsStatus } from '@/generated/graphql'
import { useGcQuery } from '@/graphql/use-gc-query'
import cx from 'classnames'
import { useGlobalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native'
import { GcHeader } from './gc-header'
import { GcRiderRow } from './gc-rider-row'

export function GcFeature() {
  const { id, search } = useGlobalSearchParams<{ id: string; search: string }>()
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
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <CardDivider />}
          renderItem={({ item }) => (
            <View
              className={cx({
                'py-8': true,
                'px-4': Platform.OS === 'android',
                'px-5': Platform.OS === 'ios'
              })}
            >
              <Skeleton className='h-6' />
            </View>
          )}
          ListHeaderComponent={() => <GcHeader />}
          stickyHeaderIndices={[0]}
        />
      ) : (
        <View>
          {data?.gc.resultsStatus === ResultsStatus.Completed && (
            <FlatList
              data={data?.gc.gcRiders}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <CardDivider />}
              renderItem={({ item }) => {
                // if (
                //   data.gc.gcStatus === GcStatus.Completed &&
                //   item.rank === 1
                // ) {
                //   return (
                //     <View className='border-brand rounded-lg border'>
                //       <GcRiderRow gcRider={item} />
                //     </View>
                //   )
                // } else {
                //   return <GcRiderRow gcRider={item} />
                // }
                return <GcRiderRow gcRider={item} />
              }}
              ListHeaderComponent={() => <GcHeader />}
              stickyHeaderIndices={[0]}
            />
          )}
          {data?.gc.resultsStatus !== ResultsStatus.Completed && (
            <View className='px-5 py-8'>
              <Card>
                <Text className='text-primary font-inter-regular px-4 py-6 text-center text-base'>
                  GC not yet started
                </Text>
              </Card>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  )
}
