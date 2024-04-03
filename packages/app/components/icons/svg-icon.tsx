import {
  AcademicCap,
  ArrowDown,
  ArrowLongLeft,
  ArrowLongRight,
  ArrowUp,
  Clock,
  MapPin,
  Trophy
} from '@nandorojo/heroicons/24/outline'
import Icon from './icon'

export function SvgIcon({
  name,
  color,
  size
}: {
  name: string
  color: string
  size: number
}) {
  switch (name) {
    case 'arrow-up-outline':
      return <ArrowUp color={color} width={size} height={size} />
    case 'arrow-down-outline':
      return <ArrowDown color={color} width={size} height={size} />
    case 'bicycle-outline':
      return <Icon name='Bicycle' height={size} width={size} fill={color} />
    case 'chevron-left':
      return <ArrowLongLeft color={color} width={size} height={size} />
    case 'chevron-right':
      return <ArrowLongRight color={color} width={size} height={size} />
    case 'location-outline':
      return <MapPin color={color} width={size} height={size} />
    case 'time-outline':
      return <Clock color={color} width={size} height={size} />
    case 'trophy-outline':
      return <Trophy color={color} width={size} height={size} />
  }
  return <AcademicCap color={color} />
}
