import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  View,
  useColorScheme
} from 'react-native'
import { createParam } from 'solito'
import { CardDivider } from '../../components/card/card-divider'
import { useGcQuery } from '../../graphql/use-gc-query'
import { StageCard } from '../stage/stage-card'
import { GcRiderComponent } from './gc-rider-component'

const { useParams } = createParam<{
  id: string
}>()

export function GcFeature() {
  const { params } = useParams()
  const colorScheme = useColorScheme()

  const { loading, data, error, refetch } = useGcQuery({
    stageId: params.id
  })

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
      contentContainerClassName={cx({
        'px-2 pt-2 pb-6': Platform.OS === 'web',
        'px-3 py-6': Platform.OS !== 'web'
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
      {data ? (
        <View>
          <StageCard stage={data.stage} href={`/schedule/${data.stage.id}`} />
          <View className='h-8' />
          <FlatList
            contentContainerClassName={cx({
              'bg-card rounded-xl': colorScheme === 'light'
            })}
            data={data.gc.gcRiders}
            renderItem={({ item }) => <GcRiderComponent gcRider={item} />}
            ItemSeparatorComponent={() => <CardDivider />}
          />
        </View>
      ) : error ? (
        <View></View>
      ) : (
        <View></View>
      )}
    </ScrollView>
  )

  // return loading ? (
  //   <FlatList
  //     className='bg-background'
  //     data={[1, 2, 3, 4, 5]}
  //     ItemSeparatorComponent={() => <CardDivider />}
  //     keyExtractor={(item, index) => `loading-${index.toString()}`}
  //     renderItem={({ item }) => (
  //       <View
  //         className={cx('py-8', {
  //           'px-4': Platform.OS === 'android' || Platform.OS === 'web',
  //           'px-5': Platform.OS === 'ios'
  //         })}
  //       >
  //         <Skeleton className='h-4' />
  //       </View>
  //     )}
  //     ListHeaderComponent={() => (
  //       <View>
  //         <SimpleStageNavigation baseUrl='/gc' />
  //         <View className='bg-card flex flex-row justify-between px-2 py-4'>
  //           <View className='flex flex-row items-center'>
  //             <Text className='text-primary font-inter-medium text-md w-12 text-center'>
  //               POS
  //             </Text>
  //             <View className='ml-2'>
  //               <Text className='text-primary font-inter-medium text-md'>
  //                 RIDER
  //               </Text>
  //             </View>
  //           </View>
  //           <View className='flex flex-row items-center'>
  //             <View className='w-12 items-center'>
  //               {/* <Ionicon
  //               size={20}
  //               name='swap-vertical-outline'
  //               color={colors[colorScheme ?? 'light'].textColorPrimary}
  //             /> */}
  //             </View>
  //             <Text className='text-primary font-inter-medium text-md w-12 text-center'>
  //               GC
  //             </Text>
  //             <Text className='text-primary font-inter-medium text-md w-12 text-center'>
  //               TOT
  //             </Text>
  //           </View>
  //         </View>
  //       </View>
  //     )}
  //     stickyHeaderIndices={[0]}
  //   />
  // ) : (
  //   <FlatList
  //     className='bg-background'
  //     data={data?.gc.gcRiders}
  //     ItemSeparatorComponent={() => <CardDivider />}
  //     keyExtractor={(item, index) => item.id}
  //     renderItem={({ item }) => <GcRiderComponent gcRider={item} />}
  //     ListHeaderComponent={() => (
  //       <View>
  //         <SimpleStageNavigation baseUrl='/gc' />
  //         <View className='bg-card flex flex-row justify-between px-2 py-4'>
  //           <View className='flex flex-row items-center'>
  //             <Text className='text-primary font-inter-medium text-md w-12 text-center'>
  //               POS
  //             </Text>
  //             <View className='ml-2'>
  //               <Text className='text-primary font-inter-medium text-md'>
  //                 RIDER
  //               </Text>
  //             </View>
  //           </View>
  //           <View className='flex flex-row items-center'>
  //             <View className='w-12 items-center'>
  //               {/* <Ionicon
  //             size={20}
  //             name='swap-vertical-outline'
  //             color={colors[colorScheme ?? 'light'].textColorPrimary}
  //           /> */}
  //             </View>
  //             <Text className='text-primary font-inter-medium text-md w-12 text-center'>
  //               GC
  //             </Text>
  //             <Text className='text-primary font-inter-medium text-md w-12 text-center'>
  //               TOT
  //             </Text>
  //           </View>
  //         </View>
  //       </View>
  //     )}
  //     stickyHeaderIndices={[0]}
  //   />
  // )

  // return loading ? (
  //   <View className='bg-background flex-1'>
  //     <View>
  //       <SimpleStageNavigation baseUrl='/gc' />
  //       <View className='bg-card flex flex-row justify-between px-2 py-4'>
  //         <View className='flex flex-row items-center'>
  //           <Text className='text-primary font-inter-medium w-12 text-center text-base'>
  //             POS
  //           </Text>
  //           <View className='ml-2'>
  //             <Text className='text-primary font-inter-medium text-base'>
  //               RIDER
  //             </Text>
  //           </View>
  //         </View>
  //         <View className='flex flex-row items-center'>
  //           <View className='w-12 items-center'>
  //             {/* <Ionicon
  //               size={20}
  //               name='swap-vertical-outline'
  //               color={colors[colorScheme ?? 'light'].textColorPrimary}
  //             /> */}
  //           </View>
  //           <Text className='text-primary font-inter-medium w-12 text-center text-base'>
  //             GC
  //           </Text>
  //           <Text className='text-primary font-inter-medium w-12 text-center text-base'>
  //             TOT
  //           </Text>
  //         </View>
  //       </View>
  //     </View>
  //     <View className='bg-card flex-1 items-center justify-center'>
  //       <Text className='text-brand'>{data?.gc.id}</Text>
  //     </View>
  //   </View>
  // ) : (
  //   <FlatList
  //     contentContainerClassName='bg-background'
  //     data={data?.gc.gcRiders}
  //     renderItem={(item) => (
  //       <View>
  //         <Text className='text-primary'>{item.item.rider.name}</Text>
  //       </View>
  //     )}
  //     ListHeaderComponent={() => (
  //       <View>
  //         <SimpleStageNavigation baseUrl='/gc' />
  //         <View className='bg-card flex flex-row justify-between px-2 py-4'>
  //           <View className='flex flex-row items-center'>
  //             <Text className='text-primary font-inter-medium w-12 text-center text-base'>
  //               POS
  //             </Text>
  //             <View className='ml-2'>
  //               <Text className='text-primary font-inter-medium text-base'>
  //                 RIDER
  //               </Text>
  //             </View>
  //           </View>
  //           <View className='flex flex-row items-center'>
  //             <View className='w-12 items-center'>
  //               {/* <Ionicon
  //               size={20}
  //               name='swap-vertical-outline'
  //               color={colors[colorScheme ?? 'light'].textColorPrimary}
  //             /> */}
  //             </View>
  //             <Text className='text-primary font-inter-medium w-12 text-center text-base'>
  //               GC
  //             </Text>
  //             <Text className='text-primary font-inter-medium w-12 text-center text-base'>
  //               TOT
  //             </Text>
  //           </View>
  //         </View>
  //       </View>
  //     )}
  //     stickyHeaderIndices={[0]}
  //   />
  // )
}
