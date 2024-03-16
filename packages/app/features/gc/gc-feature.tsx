import cx from 'classnames'
import { FlatList, Platform, Text, View } from 'react-native'
import { createParam } from 'solito'
import { CardDivider } from '../../components/card/card-divider'
import { Skeleton } from '../../components/loading/skeleton'
import { SimpleStageNavigation } from '../../components/navigation/simple-stage-navigation'
import { useGcQuery } from '../../graphql/use-gc-query'
import { GcRiderComponent } from './gc-rider-component'

const { useParams } = createParam<{
  id: string
}>()

export function GcFeature() {
  const { params } = useParams()
  const { loading, data, error, refetch } = useGcQuery({
    stageId: params.id
  })

  return loading ? (
    <FlatList
      className='bg-background'
      data={[1, 2, 3, 4, 5]}
      ItemSeparatorComponent={() => <CardDivider />}
      keyExtractor={(item, index) => `loading-${index.toString()}`}
      renderItem={({ item }) => (
        <View
          className={cx('py-8', {
            'px-4': Platform.OS === 'android' || Platform.OS === 'web',
            'px-5': Platform.OS === 'ios'
          })}
        >
          <Skeleton className='h-4' />
        </View>
      )}
      ListHeaderComponent={() => (
        <View>
          <SimpleStageNavigation baseUrl='/gc' />
          <View className='bg-card flex flex-row justify-between px-2 py-4'>
            <View className='flex flex-row items-center'>
              <Text className='text-primary font-inter-medium w-12 text-center text-base'>
                POS
              </Text>
              <View className='ml-2'>
                <Text className='text-primary font-inter-medium text-base'>
                  RIDER
                </Text>
              </View>
            </View>
            <View className='flex flex-row items-center'>
              <View className='w-12 items-center'>
                {/* <Ionicon
                size={20}
                name='swap-vertical-outline'
                color={colors[colorScheme ?? 'light'].textColorPrimary}
              /> */}
              </View>
              <Text className='text-primary font-inter-medium w-12 text-center text-base'>
                GC
              </Text>
              <Text className='text-primary font-inter-medium w-12 text-center text-base'>
                TOT
              </Text>
            </View>
          </View>
        </View>
      )}
      stickyHeaderIndices={[0]}
    />
  ) : (
    <FlatList
      className='bg-background'
      data={data?.gc.gcRiders}
      ItemSeparatorComponent={() => <CardDivider />}
      keyExtractor={(item, index) => item.id}
      renderItem={({ item }) => <GcRiderComponent gcRider={item} />}
      ListHeaderComponent={() => (
        <View>
          <SimpleStageNavigation baseUrl='/gc' />
          <View className='bg-card flex flex-row justify-between px-2 py-4'>
            <View className='flex flex-row items-center'>
              <Text className='text-primary font-inter-medium w-12 text-center text-base'>
                POS
              </Text>
              <View className='ml-2'>
                <Text className='text-primary font-inter-medium text-base'>
                  RIDER
                </Text>
              </View>
            </View>
            <View className='flex flex-row items-center'>
              <View className='w-12 items-center'>
                {/* <Ionicon
              size={20}
              name='swap-vertical-outline'
              color={colors[colorScheme ?? 'light'].textColorPrimary}
            /> */}
              </View>
              <Text className='text-primary font-inter-medium w-12 text-center text-base'>
                GC
              </Text>
              <Text className='text-primary font-inter-medium w-12 text-center text-base'>
                TOT
              </Text>
            </View>
          </View>
        </View>
      )}
      stickyHeaderIndices={[0]}
    />
  )

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
