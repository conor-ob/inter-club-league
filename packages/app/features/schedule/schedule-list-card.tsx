import { Card } from '../../components/card/card'
import { CardDivider } from '../../components/card/card-divider'
// import { Ionicon } from '@/components/ionicon'
import { default as Ionicons } from '@expo/vector-icons/Ionicons'
import { format, parseISO } from 'date-fns'
// import { Link } from 'expo-router'
import { FlatList, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Link } from 'solito/link'
import { HeroIcon } from '../../components/icon/heroicon'
import { Row } from '../../components/layout/row'
import { colors } from '../../design/colors'
import { Stage } from '../../generated/graphql'
import { StageLayout } from '../stage/stage-layout'

type ScheduleListCardProps = {
  stages: Stage[]
}

export function ScheduleListCard({ stages }: ScheduleListCardProps) {
  const colorScheme = useColorScheme()

  return (
    <Card>
      <FlatList
        data={stages}
        ItemSeparatorComponent={() => <CardDivider />}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.6}>
            <Link href={`/schedule/stage/${item.id}`}>
              <Row className='flex-row items-center justify-between px-4 py-4'>
                <StageLayout stage={item} />
                <View className='w-2' />
                <HeroIcon
                  name='chevron-right'
                  color={colors[colorScheme ?? 'light'].textColorSecondary}
                  size={24}
                />
              </Row>
            </Link>
          </TouchableOpacity>
        )}
      />
    </Card>
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
  return format(date, 'MMMM d')
}
