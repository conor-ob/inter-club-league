import {
  ArrowDown,
  ArrowLongLeft,
  ArrowLongRight,
  ArrowUp,
  ArrowsUpDown,
  ChevronRight,
  Trophy
} from '@nandorojo/heroicons/24/outline'

export function HeroIcon({
  name,
  color,
  size
}: {
  name: string
  color: string
  size: number
}) {
  switch (name) {
    case 'arrow-long-left':
      return <ArrowLongLeft color={color} width={size} height={size} />
    case 'arrow-long-right':
      return <ArrowLongRight color={color} width={size} height={size} />
    case 'arrow-down':
      return <ArrowDown color={color} width={size} height={size} />
    case 'arrow-up':
      return <ArrowUp color={color} width={size} height={size} />
    case 'arrows-up-down':
      return <ArrowsUpDown color={color} width={size} height={size} />
    case 'chevron-right':
      return <ChevronRight color={color} width={size} height={size} />
    case 'trophy':
      return <Trophy color={color} width={size} height={size} />
    default:
      throw new Error(`Icon '${name}' not found`)
  }
}
