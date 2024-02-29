import { View } from 'react-native'

type CardProps = {
  children: React.ReactNode
}

export function Card({ children }: CardProps) {
  return <View className='bg-card rounded-xl'>{children}</View>
}
