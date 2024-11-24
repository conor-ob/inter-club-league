import { Text, View } from 'react-native'

type MapMarkerProps = {
  label: string
}

export function MapMarker({ label }: MapMarkerProps) {
  return (
    <View className='bg-brand-gc items-center rounded-lg px-2 py-0.5'>
      <Text className='text-base font-bold text-black'>{label}</Text>
    </View>
  )
}
