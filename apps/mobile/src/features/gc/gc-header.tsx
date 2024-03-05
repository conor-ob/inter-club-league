import { Ionicon } from '@/components/ionicon'
import { colors } from '@/design/color-theme'
import { Text, View, useColorScheme } from 'react-native'

export function GcHeader() {
  const colorScheme = useColorScheme()

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
        <View className='w-12 items-center'>
          <Ionicon
            size={20}
            name='swap-vertical-outline'
            color={colors[colorScheme ?? 'light'].textColorPrimary}
          />
        </View>
        <Text className='text-primary font-inter-medium w-12 text-center text-base'>
          GC
        </Text>
        <Text className='text-primary font-inter-medium w-12 text-center text-base'>
          TOT
        </Text>
      </View>
    </View>
  )
}
