import { Card } from '@/components/card/card'
import { Text, View } from 'react-native'

type StageMarshallsProps = {
  marshalls: string[]
}

export function StageMarshalls({ marshalls }: StageMarshallsProps) {
  const slice = Math.ceil(marshalls.length / 2)

  return (
    <Card>
      <View className='p-4'>
        <Text className='text-primary font-inter-medium mb-4 text-xl'>
          Marshalls
        </Text>
        <View className='flex flex-row'>
          <View className='flex flex-1'>
            {marshalls.slice(0, slice).map((it) => (
              <Text
                key={it}
                className='text-secondary font-inter-regular py-1 text-base'
              >
                {it}
              </Text>
            ))}
          </View>
          <View className='flex flex-1'>
            {marshalls.slice(slice).map((it) => (
              <Text
                key={it}
                className='text-secondary font-inter-regular py-1 text-base'
              >
                {it}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Card>
  )
}
