import { default as Ionicons } from '@expo/vector-icons/Ionicons'
import { format, parseISO } from 'date-fns'
import { Text, View, useColorScheme } from 'react-native'
import { IconBadge } from '../../components/badge/icon-badge'
import { Column } from '../../components/layout/column'
import { colors } from '../../design/colors'
import { Stage } from '../../generated/graphql'

export function StageLayout({ stage }: { stage: Stage }) {
  const colorScheme = useColorScheme()

  return (
    <Column className='flex-1'>
      {/* <Row className='items-center justify-between'> */}
      {/** TODO handle long names */}
      <Text className='font-inter-medium text-secondary flex flex-1 text-base'>
        {stage.name}
      </Text>
      {/* <View className='flex flex-row items-center'>
          <Text className='font-inter-medium text-secondary mr-2 text-sm'>
            {getisplayDate(stage.startTime)}
          </Text>
          <Ionicon
            size={18}
            name='calendar-outline'
            color={colors[colorScheme ?? 'light'].textColorPrimary}
          />
        </View> */}
      {/* </Row> */}
      <View className='h-1.5' />
      <Text className='font-inter-medium text-primary text-xl'>{`Stage ${stage.id.split('-')[1]}`}</Text>
      <View className='h-1.5' />
      <View className='-mx-1 flex flex-row flex-wrap'>
        <View className='px-1 py-1'>
          <IconBadge
            label={stage.location}
            icon='location-outline'
            color={colors[colorScheme ?? 'light'].brandGreen}
          />
        </View>
        <View className='px-1 py-1'>
          <IconBadge
            label={getisplayDate(stage.startTime)}
            icon='calendar-outline'
            color={colors[colorScheme ?? 'light'].brandBlue}
          />
        </View>
        <View className='px-1 py-1'>
          <IconBadge
            label={stage.startTime.substring(
              stage.startTime.indexOf('T') + 1,
              stage.startTime.lastIndexOf(':')
            )}
            icon='time-outline'
            color={colors[colorScheme ?? 'light'].brandPurple}
          />
        </View>
        <View className='px-1 py-1'>
          <IconBadge
            label={getRaceType(stage.type)}
            icon={getRaceIcon(stage.type)}
            color={colors[colorScheme ?? 'light'].brandRed}
          />
        </View>
        {stage.mandatory && (
          <View className='px-1 py-1'>
            <IconBadge
              label='GC Points'
              icon='trophy-outline'
              color={colors[colorScheme ?? 'light'].brandDefault}
            />
          </View>
        )}
      </View>
    </Column>
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

function getisplayDate(startTime: string): string {
  const date = parseISO(startTime)
  return format(date, 'MMM d')
}
