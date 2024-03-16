import { RoundStatusColor } from '@turbostack/app/generated/graphql'
import cx from 'classnames'
import { Text, View } from 'react-native'

type RoundStatusBadgeProps = {
  roundDisplay: string
  roundStatusColor: RoundStatusColor
}

export function RoundStatusBadge({
  roundDisplay,
  roundStatusColor
}: RoundStatusBadgeProps) {
  return (
    <View
      className={cx('items-center rounded-sm px-2 py-0.5', {
        'bg-brand-blue': roundStatusColor === RoundStatusColor.Blue,
        'bg-brand-gray': roundStatusColor === RoundStatusColor.Gray,
        'bg-brand-green': roundStatusColor === RoundStatusColor.Green,
        'bg-brand-red': roundStatusColor === RoundStatusColor.Red,
        'bg-brand-yellow text-black':
          roundStatusColor === RoundStatusColor.Yellow
      })}
    >
      <Text
        className={cx('font-inter-bold text-xs tracking-tight', {
          'text-white':
            roundStatusColor === RoundStatusColor.Blue ||
            roundStatusColor === RoundStatusColor.Gray ||
            roundStatusColor === RoundStatusColor.Green ||
            roundStatusColor === RoundStatusColor.Red,
          'text-black': roundStatusColor === RoundStatusColor.Yellow
        })}
      >
        {roundDisplay}
      </Text>
    </View>
  )
}
