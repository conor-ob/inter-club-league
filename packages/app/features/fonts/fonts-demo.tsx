import { Text, View } from 'react-native'

export function FontsDemo() {
  return (
    <View className='flex-1 items-center justify-center'>
      <View className='flex-row'>
        <Text className='text-primary font-regular text-xl'>
          Default-Regular
        </Text>
        <View className='w-2' />
        <Text className='text-primary font-regular font-inter-regular font-sans text-xl'>
          Inter-Regular
        </Text>
      </View>

      <View className='flex-row'>
        <Text className='text-primary text-xl font-medium'>Default-Medium</Text>
        <View className='w-2' />
        <Text className='text-primary font-inter-medium text-xl'>
          Inter-Medium
        </Text>
      </View>

      <View className='flex-row'>
        <Text className='text-primary text-xl font-semibold'>
          Default-Semibold
        </Text>
        <View className='w-2' />
        <Text className='text-primary font-inter-semibold text-xl'>
          Inter-Semibold
        </Text>
      </View>

      <View className='flex-row'>
        <Text className='text-primary text-xl font-bold'>Default-Bold</Text>
        <View className='w-2' />
        <Text className='text-primary font-inter-bold text-xl'>Inter-Bold</Text>
      </View>

      <View>
        <Text className='text-primary text-xl font-bold'>Default-Bold</Text>
        <Text className='text-primary font-inter-bold text-xl'>
          Default-Bold
        </Text>
        <Text
          className='text-primary text-xl'
          style={{ fontFamily: 'inter-bold' }}
        >
          Font Weight 440 with opsz 14
        </Text>
        <Text className='text-primary text-xl font-bold'>
          Font Weight 440 with opsz 14
        </Text>
        <Text
          className='text-primary font-inter-bold text-xl'
          // style={{ fontFamily: 'Inter-Bold' }}
        >
          Font Weight 440 with opsz 14
        </Text>
      </View>
    </View>
  )
}
