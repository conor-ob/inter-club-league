import cx from 'classnames'
import { View } from 'react-native'

type SkeletonProps = {
  className: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <View className={cx('bg-skeleton animate-pulse rounded-xl', className)} />
  )
}
