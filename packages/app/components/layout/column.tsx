import cx from 'classnames'
import { View } from 'react-native'

export function Column({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  return <View className={cx(className)}>{children}</View>
}
