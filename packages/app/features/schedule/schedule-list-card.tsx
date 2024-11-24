import { Card } from '../../components/card/card'
import { CardDivider } from '../../components/card/card-divider'
// import { Ionicon } from '@/components/ionicon'
// import { Link } from 'expo-router'
import { Column } from 'app/components/layout/column'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native'
import { Link } from 'solito/link'
import { HeroIcon } from '../../components/icon/heroicon'
import { Row } from '../../components/layout/row'
import { colors } from '../../design/colors'
import { Stage } from '../../generated/graphql'
import { StageLayout } from '../stage/stage-layout'

export function ScheduleListCard({
  stages,
  showInfo
}: {
  stages: Stage[]
  showInfo?: boolean
}) {
  const colorScheme = useColorScheme()

  return (
    <Card>
      <FlatList
        data={stages}
        ItemSeparatorComponent={() => <CardDivider />}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.6}>
            <Link href={`/schedule/stage/${item.id}`}>
              <Column className='px-4 py-4'>
                <Row className='flex-row items-center justify-between'>
                  <StageLayout stage={item} />
                  <View className='w-2' />
                  <HeroIcon
                    name='chevron-right'
                    color={colors[colorScheme ?? 'light'].textColorSecondary}
                    size={24}
                  />
                </Row>
                {showInfo && item.info.length > 0 && (
                  <Column>
                    <View className='h-4' />
                    <FlatList
                      data={item.info}
                      // scrollEnabled={false}
                      ItemSeparatorComponent={() => <View className='h-2' />}
                      renderItem={({ item }) => (
                        <Text className='text-primary font-regular text-base'>
                          {item}
                        </Text>
                      )}
                    />
                  </Column>
                )}
              </Column>
            </Link>
          </TouchableOpacity>
        )}
      />
    </Card>
  )
}
