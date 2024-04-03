import { default as Ionicons } from '@expo/vector-icons/Ionicons'

type IoniconProps = {
  size?: number
  name: React.ComponentProps<typeof Ionicons>['name']
  color: string
}

export function Ionicon({ size, name, color }: IoniconProps) {
  return <Ionicons size={size ?? 28} name={name} color={color} />
}
