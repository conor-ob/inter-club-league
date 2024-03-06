import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

export function CategoryResultsFeature() {
  const local = useLocalSearchParams()
  const global = useGlobalSearchParams()

  return (
    <View>
      <Text className='text-primary'>Category</Text>
    </View>
  )
}
