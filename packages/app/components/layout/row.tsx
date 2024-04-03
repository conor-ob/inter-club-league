import cx from 'classnames'
import { View } from 'react-native'

export function Row({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  return <View className={cx('flex-row', className)}>{children}</View>
}
