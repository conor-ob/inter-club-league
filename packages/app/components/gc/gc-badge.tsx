import { Text, View } from 'react-native'

export function GcBadge({ text }: { text?: string }) {
  return (
    <View className='bg-brand-gc items-center rounded-md px-1.5 py-0'>
      <Text className='font-inter-bold text-sm uppercase tracking-tight text-black'>
        {text ?? 'GC'}
      </Text>
    </View>
  )
}
