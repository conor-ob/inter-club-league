import { CardDivider } from '@/components/card/card-divider'
import { useGcQuery } from '@/graphql/use-gc-query'
import { useGlobalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, Platform, RefreshControl, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GcHeader } from './gc-header'
import { GcRiderRow } from './gc-rider-row'

export function GcFeature() {
  const { id, search } = useGlobalSearchParams<{ id: string; search: string }>()
  const { data, loading, error, refetch } = useGcQuery(id)
  const [refreshing, setRefreshing] = useState(false)

  const insets = useSafeAreaInsets()
  console.log(insets)

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
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 98 : 0 }}>
        <FlatList
          data={data.gc.gcRiders}
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
          renderItem={({ item }) => <GcRiderRow gcRider={item} />}
          ListHeaderComponent={() => <GcHeader />}
          stickyHeaderIndices={[0]}
        />
      </View>
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
