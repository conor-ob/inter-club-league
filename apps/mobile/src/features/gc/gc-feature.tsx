import { CardDivider } from '@/components/card/card-divider'
import { useGcQuery } from '@/graphql/use-gc-query'
import { useGlobalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
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
    data && (
      <FlatList
        data={data.gc.gcRiders}
        contentInsetAdjustmentBehavior='automatic'
        ItemSeparatorComponent={() => <CardDivider />}
        renderItem={({ item }) => <GcRiderRow gcRider={item} />}
        stickyHeaderIndices={[0]}
      />
    )
  )

  // return (
  //   <ScrollView
  //     // className={cx({
  //     //   'px-4': Platform.OS === 'android',
  //     //   'px-5': Platform.OS === 'ios'
  //     // })}
  //     contentInsetAdjustmentBehavior='automatic'
  //     refreshControl={
  //       <RefreshControl
  //         refreshing={refreshing}
  //         onRefresh={() => {
  //           handleRefresh()
  //         }}
  //       />
  //     }
  //   >
  //     {/* <View className='py-8'> */}
  //     {data && (
  //       <FlatList
  //         data={data.gc.gcRiders}
  //         // scrollEnabled={false}
  //         ItemSeparatorComponent={() => <CardDivider />}
  //         renderItem={({ item }) => <GcRiderRow gcRider={item} />}
  //         stickyHeaderIndices={[1]}
  //       />
  //     )}
  //     {/* </View> */}
  //   </ScrollView>
  // )
}
