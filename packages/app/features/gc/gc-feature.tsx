import { CardDivider } from 'app/components/card/card-divider'
import { Skeleton } from 'app/components/loaders/skeleton'
import { RefreshScrollView } from 'app/components/views/refresh-scroll-view'
import { useGcQuery } from 'app/graphql/use-gc-query'
import cx from 'classnames'
import { FlatList, Platform, View } from 'react-native'
import { GcRiderComponent } from './gc-rider-component'

export function GcFeature() {
  const { data, loading, error, refetch } = useGcQuery('2023-18')

  return (
    <RefreshScrollView loading={loading} onRefetch={() => refetch()}>
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          ItemSeparatorComponent={() => <CardDivider />}
          keyExtractor={(item, index) => `loading-${index.toString()}`}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View
              className={cx('py-8', {
                'px-4': Platform.OS === 'android',
                'px-5': Platform.OS === 'ios'
              })}
            >
              <Skeleton className='h-4' />
            </View>
          )}
          // ListHeaderComponent={() => <GcHeader />}
          stickyHeaderIndices={[0]}
        />
      ) : (
        <FlatList
          data={data?.gc.gcRiders}
          ItemSeparatorComponent={() => <CardDivider />}
          keyExtractor={(item, index) => item.id}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <GcRiderComponent key={item.id} gcRider={item} />
          )}
          initialNumToRender={12}
          // ListEmptyComponent={() => (
          //   <View
          //     className={cx('py-8', {
          //       'px-4': Platform.OS === 'android',
          //       'px-5': Platform.OS === 'ios'
          //     })}
          //   >
          //     <Card>
          //       <Text className='text-primary font-inter-regular px-4 py-6 text-center text-base'>
          //         {data?.gc.resultsStatus === ResultsStatus.AwaitingResults
          //           ? `Results will be available after Stage ${stageNumberFromStageId(id)}`
          //           : data?.gc.resultsStatus === ResultsStatus.Upcoming
          //             ? `Stage ${stageNumberFromStageId(id)} not yet started`
          //             : `Error`}
          //       </Text>
          //     </Card>
          //   </View>
          // )}
          // ListHeaderComponent={() => <GcHeader />}
          stickyHeaderIndices={[0]}
        />
      )}
    </RefreshScrollView>
  )
}
