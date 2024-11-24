import { stageNumberFromStageId } from '@inter-club-league/utils'
import { Card } from 'app/components/card/card'
import { Stage } from 'app/generated/graphql'
import {
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { MapMarker } from '../map-marker'

export function StageMap({ stage }: { stage: Stage }) {
  const colorScheme = useColorScheme()

  return (
    <Card>
      <View className='px-4 py-5'>
        <Text className='text-primary text-xl font-medium'>Location</Text>
      </View>
      <View className='h-64'>
        {stage.coordinates && (
          <MapView
            style={{
              width: '100%',
              height: '100%'
            }}
            scrollEnabled={false}
            provider={PROVIDER_GOOGLE}
            camera={{
              zoom: 14,
              center: {
                latitude: Number(stage.coordinates.split(',')[0]),
                longitude: Number(stage.coordinates.split(',')[1])
              },
              heading: 0,
              pitch: 0
            }}
          >
            <Marker
              key={1}
              coordinate={{
                latitude: Number(stage.coordinates.split(',')[0]),
                longitude: Number(stage.coordinates.split(',')[1])
              }}
            >
              <MapMarker label={`S${stageNumberFromStageId(stage.id)}`} />
            </Marker>
          </MapView>
        )}
      </View>
      <View className='flex flex-row justify-between px-4 py-5'>
        <Text className='text-secondary font-regular text-lg'>
          {stage.location}
        </Text>
        <TouchableOpacity
          className='flex flex-row items-center'
          onPress={() => {
            const scheme = Platform.select({
              ios: 'maps://0,0?q=',
              android: 'geo:0,0?q='
            })
            const latLng = `${stage.coordinates!.split(',')[0]},${stage.coordinates!.split(',')[1]}`
            const label = `Stage ${stageNumberFromStageId(stage.id)}:  ${stage.location}`
            const url = Platform.select({
              ios: `${scheme}${label}@${latLng}`,
              android: `${scheme}${latLng}(${label})`
            })
            Linking.openURL(url!)
          }}
        >
          <Text className='text-brand-blue font-regular text-lg'>
            Directions
          </Text>
          {/* <Ionicon
            size={24}
            name='chevron-forward-outline'
            color={colors[colorScheme ?? 'light'].brandBlue}
          /> */}
        </TouchableOpacity>
      </View>
    </Card>
  )
}
