import { Card } from '@/components/card/card'
import { Ionicon } from '@/components/ionicon'
import { colors } from '@/design/color-theme'
import { Stage } from '@/generated/graphql'
import { stageNumberFromStageId } from '@inter-club-league/utils'
import React from 'react'
import {
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { MapMarker } from './map-marker'

type StageMapProps = {
  stage: Stage
}

export function StageMap({ stage }: StageMapProps) {
  const colorScheme = useColorScheme()
  return (
    <Card>
      <View className='px-4 py-5'>
        <Text className='text-primary font-inter-medium text-xl'>Location</Text>
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
        <Text className='text-secondary font-inter-regular text-lg'>
          {stage.location}
        </Text>
        <TouchableOpacity
          className='flex flex-row items-center'
          onPress={() => {
            const scheme = Platform.select({
              ios: 'maps://0,0?q=',
              android: 'geo:0,0?q='
            })
            const latLng = `${stage.coordinates.split(',')[0]},${stage.coordinates.split(',')[1]}`
            const label = `Stage ${stageNumberFromStageId(stage.id)}:  ${stage.location}`
            const url = Platform.select({
              ios: `${scheme}${label}@${latLng}`,
              android: `${scheme}${latLng}(${label})`
            })
            Linking.openURL(url)
          }}
        >
          <Text className='text-brand-blue font-inter-regular text-lg'>
            Directions
          </Text>
          <Ionicon
            size={24}
            name='chevron-forward-outline'
            color={colors[colorScheme ?? 'light'].brandBlue}
          />
        </TouchableOpacity>
      </View>
    </Card>
  )
}
