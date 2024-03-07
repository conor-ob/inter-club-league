import { StageRider } from '@/generated/graphql'
import { Text, View } from 'react-native'

type StageRiderRowProps = {
  stageRider: StageRider
}

export function StageRiderRow({ stageRider }: StageRiderRowProps) {
  return (
    <View className='flex flex-row justify-between px-2 py-4'>
      <View className='flex flex-row items-center'>
        <Text className='text-primary font-inter-medium w-12 text-center text-lg'>
          {stageRider.position}
        </Text>
        <View className='ml-2'>
          <Text className='text-primary font-inter-regular text-lg'>
            {stageRider.rider.name}
          </Text>
          <View className='h-1' />
          <Text className='text-secondary font-inter-regular text-base'>{`${stageRider.club.code} • ${stageRider.category.name}`}</Text>
        </View>
      </View>
      <View className='flex flex-row items-center'>
        <Text className='text-primary font-inter-medium w-16 text-center text-lg'>
          {stageRider.points}
        </Text>
      </View>
    </View>
  )
}