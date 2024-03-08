import { YellowJersey } from '@/components/image/yellow-jersey'
import { Ionicon } from '@/components/ionicon'
import { colors } from '@/design/color-theme'
import { GcRider } from '@/generated/graphql'
import React from 'react'
import { Text, View, useColorScheme } from 'react-native'

type GcRiderRowProps = {
  gcRider: GcRider
}

export function GcRiderRow({ gcRider }: GcRiderRowProps) {
  return (
    <View className='flex flex-row justify-between px-2 py-4'>
      <View className='flex flex-1 flex-row items-center'>
        <GcRiderPosition rank={gcRider.rank} position={gcRider.position} />
        <View className='ml-2'>
          <Text className='text-primary font-inter-regular text-lg'>
            {gcRider.rider.name}
          </Text>
          <View className='h-1' />
          <Text className='text-secondary font-inter-regular text-base'>{`${gcRider.club.code} • ${gcRider.category.name}`}</Text>
        </View>
      </View>
      <View className='flex flex-row items-center'>
        {/* This is needed for long names for some reason */}
        <View className='w-12' />
        <View className='w-12'>
          <GcRiderMovement movement={gcRider.movement} />
        </View>
        <Text className='text-primary font-inter-medium w-12 text-center text-lg'>
          {gcRider.gcPoints}
        </Text>
        <Text className='text-secondary font-inter-regular w-12 text-center text-lg'>
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
      <View className='w-12 items-center'>
        <YellowJersey />
      </View>
    )
  }
  return (
    <Text className='text-primary font-inter-medium w-12 text-center text-lg'>
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
        <Text className='text-secondary font-inter-regular text-lg'>
          {movement}
        </Text>
        <View className='w-1' />
        <Ionicon
          size={20}
          name='arrow-up-outline'
          color={colors[colorScheme ?? 'light'].brandGreen}
        />
      </View>
    )
  } else {
    return (
      <View className='flex flex-row items-center justify-center'>
        <Text className='text-secondary font-inter-regular text-lg'>
          {movement * -1}
        </Text>
        <View className='w-1' />
        <Ionicon
          size={20}
          name='arrow-down-outline'
          color={colors[colorScheme ?? 'light'].brandRed}
        />
      </View>
    )
  }
}
