import { Text, View } from 'react-native'
import { Ionicon } from '../icon/ionicon'

type IconBadgeProps = {
  label: string
  icon: string
  color: string
}

export function IconBadge({ label, icon, color }: IconBadgeProps) {
  return (
    <View className='border-quarternary flex flex-row items-center rounded-lg border px-1.5 py-0.5'>
      <Ionicon size={16} name={icon} color={color} />
      <Text className='text-secondary font-inter-regular ml-1 text-sm'>
        {label}
      </Text>
    </View>
  )
}
