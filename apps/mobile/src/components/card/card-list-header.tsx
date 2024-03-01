import cx from 'classnames'
import { Text } from 'react-native'

type CardListHeaderProps = {
  className?: string
  textColor?: string
  title: string
}

export function CardListHeader({
  title,
  className,
  textColor
}: CardListHeaderProps) {
  return (
    <Text
      className={cx(
        'font-inter-regular text-xl',
        className,
        textColor ?? 'text-secondary'
      )}
    >
      {title}
    </Text>
  )
}
