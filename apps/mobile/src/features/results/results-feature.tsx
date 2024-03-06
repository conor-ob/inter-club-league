import { Card } from '@/components/card/card'
import { CardDivider } from '@/components/card/card-divider'
import { StageNavigation } from '@/components/navigation/stage-navigation'
import { colors } from '@/design/color-theme'
import { useStageResultsQuery } from '@/graphql/use-stage-results-query'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

export function ResultsFeature() {
  const { stageId } = useLocalSearchParams<{ stageId: string }>()
  const { data, loading, error, refetch } = useStageResultsQuery(stageId)
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
    // <View style={{ flex: 1 }}>
    <ScrollView
      className='px-5 py-8'
      contentInsetAdjustmentBehavior='automatic'
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <StageNavigation
        baseUrl='/(tabs)/results'
        stageId={stageId ?? data?.stageResults.id}
      />

      <View className='h-8' />
      <Card>
        <FlatList
          data={data?.stageResults.categoryResults}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <CardDivider />}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: '/(tabs)/results/category',
                params: {
                  category: item.categoryGroup.categories
                    .map((category) => category.name)
                    .join(' & ')
                }
              }}
              asChild
            >
              <TouchableOpacity activeOpacity={0.6}>
                <View style={defaultStyles.item}>
                  <Text
                    className='text-primary'
                    style={{ fontSize: 18, flex: 1 }}
                  >
                    {item.categoryGroup.categories
                      .map((category) => category.name)
                      .join(' & ')}
                  </Text>
                  <Ionicons
                    name='chevron-forward'
                    size={20}
                    color={Colors.gray}
                  />
                </View>
              </TouchableOpacity>
            </Link>
          )}
        />
      </Card>
    </ScrollView>
    // </View>
  )
}

type BoxedIconProps = {
  name: typeof Ionicons.defaultProps
  backgroundColor: string
}

const BoxedIcon = ({ name, backgroundColor }: BoxedIconProps) => {
  return (
    <View style={{ backgroundColor, padding: 4, borderRadius: 6 }}>
      <Ionicons name={name} size={22} color={'#fff'} />
    </View>
  )
}

const Colors = {
  primary: '#1063FD',
  muted: '#3A5A92',
  background: '#EFEEF6',
  gray: '#6E6E73',
  lightGray: '#DCDCE2',
  green: '#4FEE57',
  lightGreen: '#DBFFCB',
  red: '#EF0827',
  yellow: '#FCC70B'
}

const devices = [
  {
    name: 'Scratch',
    icon: 'megaphone',
    backgroundColor: colors.dark.brandRed
  },
  {
    name: 'Semi Scratch',
    icon: 'star',
    backgroundColor: colors.dark.brandBlue
  },
  {
    name: 'Semi Limit',
    icon: 'laptop-outline',
    backgroundColor: colors.dark.brandGreen
  },
  {
    name: 'Limit',
    icon: 'star',
    backgroundColor: colors.dark.brandDefault
  }
]

const defaultStyles = StyleSheet.create({
  block: {
    backgroundColor: colors.dark.card,
    borderRadius: 10,
    marginHorizontal: 14,
    marginTop: 20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightGray,
    marginLeft: 50
  }
})

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
