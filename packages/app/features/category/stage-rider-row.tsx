import cx from 'classnames'
import { Text, View } from 'react-native'
import { YellowJersey } from '../../components/image/yellow-jersey'
import { StageRider } from '../../generated/graphql'

type StageRiderRowProps = {
  stageRider: StageRider
  gcLeaderId?: string
}

export function StageRiderRow({ stageRider, gcLeaderId }: StageRiderRowProps) {
  return (
    <View className='flex flex-row justify-between px-2 py-3'>
      <View className='flex flex-1 flex-row items-center'>
        <Text
          className={cx(
            'text-primary font-inter-regular w-12 text-center text-base',
            { 'text-secondary': stageRider.position === '-' }
          )}
        >
          {stageRider.position}
        </Text>
        <View className='ml-2'>
          <Text className='text-primary font-inter-regular text-base'>
            {stageRider.rider.name}
          </Text>
          <View className='h-1' />
          <Text className='text-secondary font-inter-regular text-sm'>{`${stageRider.club.code} • ${stageRider.category.name}`}</Text>
        </View>
      </View>
      <View className='flex flex-row items-center'>
        {stageRider.rider.id === gcLeaderId && (
          <View className='w-12 items-center'>
            <YellowJersey />
          </View>
        )}
        <Text className='text-primary font-inter-medium w-16 text-center text-base'>
          {stageRider.points}
        </Text>
      </View>
    </View>
  )
}
