import cx from 'classnames'
import { View } from 'react-native'

type SkeletonProps = {
  className: string
}

// TODO animate-pulse only works on "react-native-reanimated": "3.3.0",
export function Skeleton({ className }: SkeletonProps) {
  return <View className={cx('bg-skeleton animate-pulse', className)} />
}
