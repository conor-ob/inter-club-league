import { Card } from '@/components/card/card'
import { CardDivider } from '@/components/card/card-divider'
import { Skeleton } from '@/components/loaders/skeleton'
import { useRedirectQuery } from '@/graphql/use-redirect-query'
import cx from 'classnames'
import { Redirect } from 'expo-router'
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

export function GcRedirect() {
  const { data, loading, error, refetch } = useRedirectQuery()
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

  if (data?.currentGcStageId) {
    return <Redirect href={`/(tabs)/gc/${data.currentGcStageId}`} />
  }

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
        <FlatList
          data={[1]}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <CardDivider />}
          renderItem={({ item }) => (
            <View className='px-5 py-8'>
              <Card>
                <Text className='text-primary font-inter-regular px-4 py-6 text-center text-base'>
                  GC will be available after Stage 1
                </Text>
              </Card>
            </View>
          )}
          ListHeaderComponent={() => <GcHeader />}
          stickyHeaderIndices={[0]}
        />
      )}
    </ScrollView>
  )
}
