import { Card } from '@/components/card/card'
import { Ionicon } from '@/components/ionicon'
import { StageNavigation } from '@/components/navigation/stage-navigation'
import { colors } from '@/design/color-theme'
import { useStageQuery } from '@/graphql/use-stage-query'
import { default as Ionicons } from '@expo/vector-icons/Ionicons'
import { stageNumberFromStageId } from '@inter-club-league/utils'
import { useGlobalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import {
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { MapMarker } from './map-marker'

export function StageFeature() {
  const { id } = useGlobalSearchParams<{ id: string }>()
  const colorScheme = useColorScheme()
  const { data, loading, error, refetch } = useStageQuery(id)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
  }, [refetch])

  useEffect(() => {
    if (!loading) {
      setRefreshing(false)
    }
  }, [loading])

  const item = data?.stage

  return (
    <ScrollView
      className='px-5 py-8'
      contentInsetAdjustmentBehavior='automatic'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            handleRefresh()
          }}
        />
      }
    >
      <StageNavigation baseUrl='/(tabs)/schedule' />
      <View className='h-6' />
      <Card>
        <View className='px-4 py-5'>
          <Text className='text-primary font-inter-medium text-xl'>
            Location
          </Text>
        </View>
        <View className='h-72'>
          {data?.stage.coordinates && (
            <MapView
              style={{
                width: '100%',
                height: '100%'
              }}
              provider={PROVIDER_GOOGLE}
              camera={{
                zoom: 14,
                center: {
                  latitude: Number(data?.stage.coordinates.split(',')[0]),
                  longitude: Number(data?.stage.coordinates.split(',')[1])
                },
                heading: 0,
                pitch: 0
              }}
            >
              <Marker
                key={1}
                coordinate={{
                  latitude: Number(data?.stage.coordinates.split(',')[0]),
                  longitude: Number(data?.stage.coordinates.split(',')[1])
                }}
              >
                <MapMarker
                  label={`S${stageNumberFromStageId(data?.stage.id)}`}
                />
              </Marker>
            </MapView>
          )}
        </View>
        <View className='flex flex-row justify-between px-4 py-5'>
          <Text className='text-secondary font-inter-regular text-lg'>
            {data?.stage.location}
          </Text>
          <TouchableOpacity
            className='flex flex-row items-center'
            onPress={() => {
              const scheme = Platform.select({
                ios: 'maps://0,0?q=',
                android: 'geo:0,0?q='
              })
              const latLng = `${data.stage.coordinates.split(',')[0]},${data?.stage.coordinates.split(',')[1]}`
              const label = `Stage ${stageNumberFromStageId(data.stage.id)}:  ${data?.stage.location}`
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
    </ScrollView>
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
      return 'bicycle-outline'
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
