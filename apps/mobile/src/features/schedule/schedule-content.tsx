import { Card } from '@/components/card/card'
import { CardDivider } from '@/components/card/card-divider'
import { CardListHeader } from '@/components/card/card-list-header'
import { Ionicon } from '@/components/ionicon'
import { colors } from '@/design/color-theme'
import { useQuery } from '@apollo/client'
import { default as Ionicons } from '@expo/vector-icons/Ionicons'
import { graphql } from '@inter-club-league/graphql/src/graphql'
import cx from 'classnames'
import { Link } from 'expo-router'
import {
  FlatList,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native'

export const ScheduleQuery = graphql(`
  query Schedule($seasonId: ID) {
    schedule(seasonId: $seasonId) {
      id
      completed {
        displayName
        id
        stages {
          id
          number
          season
          name
          startTime
          displayDate
          location
          county
          type
          status
          mandatory
          club {
            id
            code
            name
          }
          categoryGroups {
            id
            categories {
              id
              code
              name
              rank
            }
          }
          coordinates
          stravaId
        }
      }
      upcoming {
        displayName
        id
        stages {
          id
          number
          season
          name
          startTime
          displayDate
          location
          county
          type
          status
          mandatory
          club {
            id
            code
            name
          }
          categoryGroups {
            id
            categories {
              id
              code
              name
              rank
            }
          }
          coordinates
          stravaId
        }
      }
    }
  }
`)

export function ScheduleContent() {
  const colorScheme = useColorScheme()
  const { data, loading, error } = useQuery(ScheduleQuery)

  return (
    <ScrollView
      className={cx({
        'mb-8': true,
        'mx-4': Platform.OS === 'android',
        'mx-5': Platform.OS === 'ios'
      })}
    >
      {data?.schedule.completed.map((scheduleMonth) => (
        <View key={scheduleMonth.id}>
          <CardListHeader
            className='mb-2 ml-4 mt-6'
            title={scheduleMonth.displayName.toUpperCase()}
          />

          <Card>
            <FlatList
              data={scheduleMonth.stages}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <CardDivider />}
              renderItem={({ item }) => (
                <Link href={`/(tabs)/schedule/${item.id}`} asChild>
                  <TouchableOpacity className='px-4 py-6' activeOpacity={0.6}>
                    <View className='mb-2 flex flex-row items-center justify-between'>
                      <Text className='font-inter-medium text-secondary text-base'>
                        {item.name}
                      </Text>
                      <View className='flex flex-row items-center'>
                        <Text className='font-inter-medium text-secondary mr-2 text-base'>
                          {item.displayDate}
                        </Text>
                        <Ionicon
                          size={16}
                          name='calendar-outline'
                          color={
                            colors[colorScheme ?? 'light'].textColorSecondary
                          }
                        />
                      </View>
                    </View>
                    <Text className='font-inter-semibold text-primary mb-6 text-2xl'>{`Stage ${item.number}`}</Text>
                    <View className='mb-2 flex flex-row items-center'>
                      <Ionicon
                        size={16}
                        name='time-outline'
                        color={
                          colors[colorScheme ?? 'light'].textColorSecondary
                        }
                      />
                      <Text className='font-inter-medium text-secondary ml-2 text-base'>
                        {item.startTime.substring(
                          item.startTime.indexOf('T') + 1,
                          item.startTime.lastIndexOf(':')
                        )}
                      </Text>
                    </View>
                    <View className='mb-2 flex flex-row items-center'>
                      <Ionicon
                        size={16}
                        name='location-outline'
                        color={
                          colors[colorScheme ?? 'light'].textColorSecondary
                        }
                      />
                      <Text className='font-inter-medium text-secondary ml-2 text-base'>
                        {item.location}
                        {', '}
                        {item.county}
                      </Text>
                    </View>
                    <View className='flex flex-row items-center'>
                      <Ionicon
                        size={16}
                        name={getRaceIcon(item.type)}
                        color={
                          colors[colorScheme ?? 'light'].textColorSecondary
                        }
                      />
                      <Text className='font-inter-medium text-secondary ml-2 text-base'>
                        {getRaceType(item.type)}
                      </Text>
                    </View>
                    {item.mandatory && (
                      <View className='mt-2 flex flex-row items-center'>
                        <Ionicon
                          size={16}
                          name='trophy-outline'
                          color={colors[colorScheme ?? 'light'].brand}
                        />
                        <Text className='font-inter-medium text-brand ml-2 text-base'>
                          GC Points
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  {/* <TouchableHighlight
                    className='px-4'
                    activeOpacity={0.8}
                    underlayColor={'#d8d8d8'}
                  >
                    <View>
                      <Text className='text-primary'>{item.name}</Text>
                    </View>
                  </TouchableHighlight> */}
                </Link>
              )}
            />
          </Card>
        </View>
      ))}
    </ScrollView>
  )
}

function getRaceIcon(
  type: string
): React.ComponentProps<typeof Ionicons>['name'] {
  switch (type) {
    case 'CRITERIUM':
      return 'flag-outline'
    case 'HILL_CLIMB':
      return 'trending-up-outline'
    case 'TIME_TRIAL':
      return 'stopwatch-outline'
    default:
      return 'bicycle-outline'
  }
}

function getRaceType(type: string): string {
  switch (type) {
    case 'CRITERIUM':
      return 'Criterium'
    case 'HILL_CLIMB':
      return 'Hill Climb'
    case 'TIME_TRIAL':
      return 'Time Trial'
    default:
      return 'Road Race'
  }
}
