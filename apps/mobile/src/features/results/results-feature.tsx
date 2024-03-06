import { Card } from '@/components/card/card'
import { CardDivider } from '@/components/card/card-divider'
import { StageNavigation } from '@/components/navigation/stage-navigation'
import { useStageResultsQuery } from '@/graphql/use-stage-results-query'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, ScrollView, View, useColorScheme } from 'react-native'
import { CategoryResultsListItem } from './category-results-list-item'

export function ResultsFeature() {
  const { stageId } = useLocalSearchParams<{ stageId: string }>()
  const { data, loading, error, refetch } = useStageResultsQuery(stageId)
  const [refreshing, setRefreshing] = useState(false)
  const colorScheme = useColorScheme()

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
    // <View style={{ flex: 1 }}>
    <ScrollView
      className='px-5 py-6'
      contentInsetAdjustmentBehavior='automatic'
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <StageNavigation
        baseUrl='/(tabs)/results'
        stageId={stageId ?? data?.stageResults.id}
      />

      <View className='h-6' />
      <Card>
        <FlatList
          data={data?.stageResults.categoryResults}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <CardDivider />}
          renderItem={({ item }) => (
            <CategoryResultsListItem categoryResults={item} />
          )}
        />
      </Card>
    </ScrollView>
    // </View>
  )
}

// export function ResultsFeature() {
//   const { data, loading, error, refetch } = useStageResultsQuery()
//   const [refreshing, setRefreshing] = useState(false)

//   const handleRefresh = useCallback(() => {
//     setRefreshing(true)
//     refetch()
//   }, [refetch])

//   useEffect(() => {
//     if (!loading) {
//       setRefreshing(false)
//     }
//   }, [loading])

//   return (
//     <ScrollView
//       className={cx({
//         'px-4': Platform.OS === 'android',
//         'px-5': Platform.OS === 'ios'
//       })}
//       contentInsetAdjustmentBehavior='automatic'
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={() => {
//             handleRefresh()
//           }}
//         />
//       }
//     >
//       <View className='py-8'>
//         {data?.stageResults.categoryResults.map((it) => (
//           <View key={it.id}>
//             <CardListHeader
//               className='mb-2 ml-4 mt-6'
//               title={it.categoryGroup.categories.map((it) => it.name).join(' ')}
//             />
//             <Card>
//               <FlatList
//                 data={it.stageRiders}
//                 scrollEnabled={false}
//                 ItemSeparatorComponent={() => <CardDivider />}
//                 renderItem={({ item }) => (
//                   <View className='px-4 py-6'>
//                     <Text className='text-primary'>{item.rider.name}</Text>
//                   </View>
//                 )}
//               />
//             </Card>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   )
// }
