import { Card } from '@/components/card/card'
import { Ionicon } from '@/components/ionicon'
import { colors } from '@/design/color-theme'
import { Stage } from '@/generated/graphql'
import {
  Linking,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native'

type StageInfoProps = {
  stage: Stage
}

export function StageInfo({ stage }: StageInfoProps) {
  const colorScheme = useColorScheme()
  return (
    <Card>
      <View>
        <View className='p-4'>
          <Text className='text-primary font-inter-medium text-xl'>
            Race Info
          </Text>
        </View>
        <View className='flex flex-row'>
          <View className='border-quarternary flex flex-1 items-center border-r border-t py-4'>
            <TouchableOpacity
              className='flex flex-row items-center'
              onPress={() => {
                Linking.openURL(
                  'https://www.facebook.com/groups/248188776093209'
                )
              }}
            >
              <Ionicon
                size={24}
                name='logo-facebook'
                color={colors[colorScheme ?? 'light'].brandBlue}
              />
              <View className='w-1' />
              <Text className='text-brand-blue font-inter-regular text-lg'>
                Facebook
              </Text>
            </TouchableOpacity>
          </View>
          <View className='border-quarternary flex flex-1 items-center border-t py-4'>
            {stage.stravaId ? (
              <TouchableOpacity
                className='flex flex-row items-center'
                onPress={() => {
                  Linking.openURL(
                    `https://www.strava.com/routes/${stage.stravaId}`
                  )
                }}
              >
                <Text className='text-brand-orange font-inter-regular text-lg'>
                  Strava Route
                </Text>
                <Ionicon
                  size={24}
                  name='chevron-forward-outline'
                  color={colors[colorScheme ?? 'light'].brandOrange}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    </Card>
  )
}
