import { Card } from 'app/components/card/card'
import { CardDivider } from 'app/components/card/card-divider'
import { HeroIcon } from 'app/components/icon/heroicon'
import { Column } from 'app/components/layout/column'
import { Row } from 'app/components/layout/row'
import { colors } from 'app/design/colors'
import { Route, RouteType } from 'app/generated/graphql'
import cx from 'classnames'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native'
import { Link } from 'solito/link'

export function StageRoutes({ routes }: { routes: Route[] }) {
  const colorScheme = useColorScheme()

  return (
    <Column>
      <Text className='text-primary font-inter-medium ml-4 text-xl'>
        Routes
      </Text>
      <View className='h-2' />
      <Card>
        <FlatList
          data={routes}
          // scrollEnabled={false}
          ItemSeparatorComponent={() => <CardDivider />}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Link href={`https://www.strava.com/routes/${item.id}`}>
                <Row className='justify-between p-4'>
                  <Text className='text-primary font-inter-medium text-base'>
                    {item.label}
                  </Text>
                  <Row>
                    <Text
                      className={cx(
                        'font-inter-regular text-base',
                        getTextClassName({ type: item.type })
                      )}
                    >
                      Route
                    </Text>
                    <View className='w-2' />
                    <HeroIcon
                      name={'chevron-right'}
                      color={
                        item.type === RouteType.Strava
                          ? colors[colorScheme ?? 'light'].brandStrava
                          : colors[colorScheme ?? 'light'].textColorSecondary
                      }
                      size={24}
                    />
                  </Row>
                </Row>
              </Link>
            </TouchableOpacity>
          )}
        />
      </Card>
    </Column>
  )
}

function getTextClassName({ type }: { type: RouteType }): string {
  if (type === RouteType.Strava) {
    return 'text-brand-strava'
  } else {
    return 'text-secondary'
  }
}
