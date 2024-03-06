import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

export function CategoryResultsFeature() {
  const local = useLocalSearchParams()
  const global = useGlobalSearchParams()

  console.log('local=' + JSON.stringify(local, null, 2))
  console.log('global=' + JSON.stringify(local, null, 2))

  return (
    <View>
      <Text className='text-primary'>Category</Text>
    </View>
  )
}
