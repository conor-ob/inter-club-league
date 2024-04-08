import { Card } from 'app/components/card/card'
import { HeroIcon } from 'app/components/icon/heroicon'
import { Column } from 'app/components/layout/column'
import { Row } from 'app/components/layout/row'
import { colors } from 'app/design/colors'
import { Stage } from 'app/generated/graphql'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'

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
            allowFullScreen
            referrerPolicy='no-referrer-when-downgrade'
            loading='lazy'
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${stage.coordinates}&center=${stage.coordinates}&zoom=${zoom}`}
          />
          {/* <iframe
            src='https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d19102.522016500658!2d-6.450787!3d53.239088!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTPCsDE0JzExLjciTiA2wrAyNycxNS44Ilc!5e0!3m2!1sen!2sus!4v1712605085671!5m2!1sen!2sus'
            width='400'
            height='300'
            // style='border:0;'
            // allowfullscreen=''
            loading='lazy'
            // referrerpolicy='no-referrer-when-downgrade'
          ></iframe> */}
          <Row className='items-center justify-between px-4 py-4'>
            <Text className='text-secondary font-inter-regular text-base'>
              {stage.location}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (isAppleMobile()) {
                  window.open(
                    `maps://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
                  )
                  // window.open(
                  //   'maps://?daddr=' + stage.coordinates + '(' + label + ')',
                  //   '_system'
                  // )
                } else {
                  window.open(
                    `https://maps.google.com/maps?daddr=${stage.coordinates}&amp;ll=`
                  )
                  // window.open(
                  //   'geo:0,0?daddr=' + stage.coordinates + '(' + label + ')',
                  //   '_system'
                  // )
                }
              }}
            >
              {/* <a href='geo:124.028582,-29.201930'> */}
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
              {/* </a> */}
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
