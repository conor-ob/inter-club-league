import { Text, View } from 'react-native'

export function GcBadge() {
  return (
    <View className='bg-gc w-10 items-center rounded-lg px-1 py-0.5'>
      <Text className='font-inter-bold text-md text-black'>GC</Text>
    </View>
  )
}
