import { useQuery } from '@apollo/client'
import { graphql } from '@inter-club-league/graphql/src/graphql'
import cx from 'classnames'
import { Link } from 'expo-router'
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
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
  const { data, loading, error } = useQuery(ScheduleQuery)

  return (
    <ScrollView
      className={cx({
        'p-4': Platform.OS === 'android',
        'p-5': Platform.OS === 'ios'
      })}
    >
      {data?.schedule.completed.map((scheduleMonth) => (
        <View key={scheduleMonth.id}>
          <Text className='text-brand ml-4 text-xl font-semibold'>
            {scheduleMonth.displayName.charAt(0).toUpperCase() +
              scheduleMonth.displayName.slice(1)}
          </Text>

          <View className='bg-card rounded-lg'>
            <FlatList
              data={scheduleMonth.stages}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: '#333333'
                  }}
                />
              )}
              renderItem={({ item }) => (
                <Link href={`/(tabs)/schedule/${item.id}`} asChild>
                  <TouchableHighlight className='px-4' activeOpacity={0.8}>
                    <View>
                      {/* <Row className='justify-between'>
                        <P>{item.name}</P>
                        <P>{item.displayDate}</P>
                      </Row> */}
                      <Text className='text-primary'>{item.name}</Text>
                    </View>
                  </TouchableHighlight>
                </Link>
              )}
            />
          </View>

          {/* <View className='rounded-lg bg-white dark:bg-[#121212]'>
            {scheduleMonth.stages.map((stage) => (
              <Link
                key={stage.id}
                href={`/(tabs)/schedule/${stage.id}`}
                asChild
              >
                <TouchableHighlight className='border-b-2 border-gray-600'>
                  <View className='px-4'>
                    <Row className='justify-between'>
                      <P>{stage.name}</P>
                      <P>{stage.displayDate}</P>
                    </Row>
                    <Row>
                      <P className='text-2xl'>{`Stage ${stage.number}`}</P>
                    </Row>
                  </View>
                </TouchableHighlight>
              </Link>
            ))}
          </View> */}
        </View>
      ))}
      {/* <View>
        <P className='ml-4'>Users</P>
        <View className='rounded-lg bg-white px-4 dark:bg-[#121212]'>
          {data?.schedule.completed.map((stages) => (
            <Link key={stage.id} href={`/(tabs)/schedule/${stage.id}`} asChild>
              <P>{`${stage.number} ${stage.name}`}</P>
            </Link>
          ))}
        </View>
      </View> */}
    </ScrollView>
  )
}
