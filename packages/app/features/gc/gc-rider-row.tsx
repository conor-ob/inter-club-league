import { YellowJersey } from '../../components/image/yellow-jersey'
// import { Ionicon } from '../components/ionicon'
import { Text, View, useColorScheme } from 'react-native'
import { HeroIcon } from '../../components/icon/heroicon'
import { colors } from '../../design/colors'
import { GcRider } from '../../generated/graphql'

type GcRiderRowProps = {
  gcRider: GcRider
}

export function GcRiderRow({ gcRider }: GcRiderRowProps) {
  return (
    <View className='flex flex-row justify-between px-2 py-3'>
      <View className='flex-1 flex-row items-center'>
        <GcRiderPosition rank={gcRider.rank} position={gcRider.position} />
        <View className='flex-1 px-2'>
          <Text className='text-primary font-regular text-base'>
            {gcRider.rider.name}
          </Text>
          <View className='h-1' />
          <Text className='text-secondary font-regular text-sm tracking-tight'>{`${gcRider.club.code} • ${gcRider.category.name}`}</Text>
        </View>
      </View>
      <View className='flex flex-row items-center'>
        {/* This is needed for long names for some reason */}
        {/* <View className='w-12' /> */}
        <View className='w-10'>
          <GcRiderMovement movement={gcRider.movement} />
        </View>
        <Text className='text-primary w-10 text-center text-base font-medium'>
          {gcRider.gcPoints}
        </Text>
        <Text className='text-secondary font-regular w-10 text-center text-base'>
          {gcRider.totalPoints}
        </Text>
      </View>
    </View>
  )
}

type GcRiderPositionProps = {
  rank: number
  position: string
}

function GcRiderPosition({ rank, position }: GcRiderPositionProps) {
  if (rank === 1) {
    return (
      <View className='w-10 items-center'>
        <YellowJersey />
      </View>
    )
  }
  return (
    <Text className='text-secondary font-regular w-10 text-center text-base'>
      {position}
    </Text>
  )
}

type GcRiderMovementProps = {
  movement: number
}

function GcRiderMovement({ movement }: GcRiderMovementProps) {
  const colorScheme = useColorScheme()

  if (movement === 0) {
    return <View />
  } else if (movement > 0) {
    return (
      <View className='flex flex-row items-center justify-center'>
        <Text className='text-secondary font-regular text-base'>
          {movement}
        </Text>
        <View className='w-1' />
        <HeroIcon
          size={18}
          name='arrow-up'
          color={colors[colorScheme ?? 'light'].brandGreen}
        />
      </View>
    )
  } else {
    return (
      <View className='flex flex-row items-center justify-center'>
        <Text className='text-secondary font-regular text-sm'>
          {movement * -1}
        </Text>
        <View className='w-1' />
        <HeroIcon
          size={18}
          name='arrow-down'
          color={colors[colorScheme ?? 'light'].brandRed}
        />
      </View>
    )
  }
}
