import { Card } from 'app/components/card/card'
import { HeroIcon } from 'app/components/icon/heroicon'
import { Column } from 'app/components/layout/column'
import { Row } from 'app/components/layout/row'
import { colors } from 'app/design/colors'
import { Stage } from 'app/generated/graphql'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Link } from 'solito/link'

export function StageMap({ stage }: { stage: Stage }) {
  const colorScheme = useColorScheme()

  const apiKey = 'AIzaSyAcdXzRjKbuTL6DCbjR9r74lAmZhppaW_M'
  const zoom = 14

  return (
    <Column>
      <Text className='text-primary font-inter-medium ml-4 text-xl'>
        Location
      </Text>
      <View className='h-2' />
      <Card>
        <Column>
          <iframe
            className='h-80 rounded-t-xl focus:border-0'
            style={{ border: '0' }}
            loading='lazy'
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${stage.coordinates}&center=${stage.coordinates}&zoom=${zoom}`}
          />
          <Row className='items-center justify-between px-4 py-4'>
            <Text className='text-secondary font-inter-regular text-base'>
              {stage.location}
            </Text>
            <TouchableOpacity>
              <Link
                href={
                  isAppleMobile()
                    ? `maps://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
                    : `https://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
                }
              >
                <Row>
                  <Text className='text-brand-blue font-inter-regular text-base'>
                    Directions
                  </Text>
                  <View className='w-2' />
                  <HeroIcon
                    name={'chevron-right'}
                    color={colors[colorScheme ?? 'light'].brandBlue}
                    size={24}
                  />
                </Row>
              </Link>
            </TouchableOpacity>
          </Row>
        </Column>
      </Card>
    </Column>
  )
}

function isAppleMobile(): boolean {
  if (
    (['iPhone', 'iPad', 'iPod'].includes(navigator.platform) ||
      (navigator.userAgent.match(/Mac/) &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2)) &&
    'serviceWorker' in navigator
  )
    return true
  return false
}
