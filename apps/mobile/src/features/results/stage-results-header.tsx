import { Text, View } from 'react-native'

export function StageResultsHeader() {
  return (
    <View className='bg-card flex flex-row justify-between px-2 py-4'>
      <View className='flex flex-row items-center'>
        <Text className='text-primary font-inter-medium w-12 text-center text-base'>
          POS
        </Text>
        <View className='ml-2'>
          <Text className='text-primary font-inter-medium text-base'>
            RIDER
          </Text>
        </View>
      </View>
      <View className='flex flex-row items-center'>
        <Text className='text-primary font-inter-medium w-16 text-center text-base'>
          POINTS
        </Text>
      </View>
    </View>
  )
}
