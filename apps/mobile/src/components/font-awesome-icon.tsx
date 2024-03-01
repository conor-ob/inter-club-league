import {
  default as FontAwesome,
  default as FontAwesomeIcons
} from '@expo/vector-icons/FontAwesome'

type FontAwesomeIconProps = {
  name: React.ComponentProps<typeof FontAwesomeIcons>['name']
  color: string
}

export function FontAwesomeIcon({ name, color }: FontAwesomeIconProps) {
  return <FontAwesome size={28} name={name} color={color} />
}
