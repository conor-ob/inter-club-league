import {
  AcademicCap,
  Clock,
  MapPin,
  Trophy
} from '@nandorojo/heroicons/24/outline'

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
    case 'location-outline':
      return <MapPin color={color} width={size} height={size} />
    case 'time-outline':
      return <Clock color={color} width={size} height={size} />
    case 'trophy-outline':
      return <Trophy color={color} width={size} height={size} />
  }
  return <AcademicCap color={color} />
}
