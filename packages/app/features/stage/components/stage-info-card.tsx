import { Card } from 'app/components/card/card'
import { HeroIcon } from 'app/components/icon/heroicon'
import { Column } from 'app/components/layout/column'
import { Row } from 'app/components/layout/row'
import { colors } from 'app/design/colors'
import { Stage } from 'app/generated/graphql'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native'

export function StageInfoCard({ stage }: { stage: Stage }) {
  const colorScheme = useColorScheme()

  return (
    <Column>
      <Text className='text-primary font-inter-medium ml-4 text-xl'>
        Stage Info
      </Text>
      <View className='h-2' />
      <Card>
        <Column className='p-4'>
          <FlatList
            data={stage.info}
            // scrollEnabled={false}
            ItemSeparatorComponent={() => <View className='h-2' />}
            renderItem={({ item }) => (
              <Text className='text-primary font-inter-regular text-base'>
                {item}
              </Text>
            )}
          />
          {stage.stravaId && (
            <View>
              <View className='h-6' />
              <View className='items-end'>
                <TouchableOpacity
                  onPress={() => {
                    window.open(
                      `https://www.strava.com/routes/${stage.stravaId}`
                    )
                  }}
                >
                  <Row>
                    <Text className='text-brand-strava font-inter-regular text-base'>
                      Strava Route
                    </Text>
                    <View className='w-2' />
                    <HeroIcon
                      name={'chevron-right'}
                      color={colors[colorScheme ?? 'light'].brandStrava}
                      size={24}
                    />
                  </Row>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Column>
      </Card>
    </Column>
  )
}
