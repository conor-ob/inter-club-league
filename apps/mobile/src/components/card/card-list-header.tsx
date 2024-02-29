import cx from 'classnames'
import { Text } from 'react-native'

type CardListHeaderProps = {
  className?: string
  title: string
}

export function CardListHeader({ title, className }: CardListHeaderProps) {
  return (
    <Text
      className={cx('text-secondary font-inter-semibold text-xl', className)}
    >
      {title}
    </Text>
  )
}
