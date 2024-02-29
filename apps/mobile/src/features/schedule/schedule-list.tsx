import { IconBadge } from '@/components/badge/icon-badge'
import { Card } from '@/components/card/card'
import { CardDivider } from '@/components/card/card-divider'
import { CardListHeader } from '@/components/card/card-list-header'
import { Ionicon } from '@/components/ionicon'
import { colors } from '@/design/color-theme'
import { Schedule } from '@/generated/graphql'
import { default as Ionicons } from '@expo/vector-icons/Ionicons'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { Link } from 'expo-router'
import { useState } from 'react'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native'

type ScheduleListProps = {
  schedule: Schedule
}

export function ScheduleList({ schedule }: ScheduleListProps) {
  const colorScheme = useColorScheme()
  const [selectedIndex, setSelectedIndex] = useState(
    schedule.upcoming.length > 0 ? 0 : 1
  )
  const scheduleMonths =
    selectedIndex === 0 ? schedule.upcoming : schedule.completed
  return (
    <View>
      <SegmentedControl
        values={['Upcoming', 'Completed']}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
        }}
      />
      {scheduleMonths.map((scheduleMonth) => (
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
                            colors[colorScheme ?? 'light'].textColorPrimary
                          }
                        />
                      </View>
                    </View>
                    <Text className='font-inter-semibold text-primary mb-4 text-2xl'>{`Stage ${item.number}`}</Text>
                    <View className='-mx-1 flex flex-row flex-wrap'>
                      {/* <GcBadge /> */}
                      {/* <View className='w-2' /> */}
                      <View className='px-1 py-1'>
                        <IconBadge
                          label={item.location}
                          icon='location'
                          color={colors[colorScheme ?? 'light'].brandBlue}
                        />
                      </View>

                      <View className='px-1 py-1'>
                        <IconBadge
                          label={item.startTime.substring(
                            item.startTime.indexOf('T') + 1,
                            item.startTime.lastIndexOf(':')
                          )}
                          icon='time'
                          color={colors[colorScheme ?? 'light'].brandPurple}
                        />
                      </View>
                      <View className='px-1 py-1'>
                        <IconBadge
                          label={getRaceType(item.type)}
                          icon={getRaceIcon(item.type)}
                          color={colors[colorScheme ?? 'light'].brandRed}
                        />
                      </View>
                      {item.mandatory && (
                        <View className='px-1 py-1'>
                          <IconBadge
                            label='GC Points'
                            icon='trophy'
                            color={colors[colorScheme ?? 'light'].brandDefault}
                          />
                        </View>
                      )}
                    </View>
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
    </View>
  )
}

function getRaceIcon(
  type: string
): React.ComponentProps<typeof Ionicons>['name'] {
  switch (type) {
    case 'CRITERIUM':
      return 'flag'
    case 'HILL_CLIMB':
      return 'trending-up'
    case 'TIME_TRIAL':
      return 'stopwatch'
    default:
      return 'bicycle'
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
