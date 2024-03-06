import { default as Ionicons } from '@expo/vector-icons/Ionicons'
import { Text, View } from 'react-native'
import { Ionicon } from '../ionicon'

type IconBadgeProps = {
  label: string
  icon: React.ComponentProps<typeof Ionicons>['name']
  color: string
}

export function IconBadge({ label, icon, color }: IconBadgeProps) {
  return (
    <View className='border-tertiary flex flex-row items-center rounded-lg border px-1.5 py-0.5'>
      <Ionicon size={16} name={icon} color={color} />
      <Text className='text-secondary font-inter-regular ml-1 text-base'>
        {label}
      </Text>
    </View>
  )
}
