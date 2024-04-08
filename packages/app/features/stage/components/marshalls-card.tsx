import { Card } from 'app/components/card/card'
import { Column } from 'app/components/layout/column'
import { Row } from 'app/components/layout/row'
import { Text, View } from 'react-native'

export function MarshallsCard({ marshalls }: { marshalls: string[] }) {
  if (marshalls.length === 0) {
    return (
      <Column>
        <Text className='text-primary font-inter-medium ml-4 text-xl'>
          Marshalls
        </Text>
        <View className='h-2' />
        <Card>
          <View className='p-4'>
            <Text className='text-secondary font-inter-regular py-1 text-base'>
              No marshalls for this stage
            </Text>
          </View>
        </Card>
      </Column>
    )
  } else {
    const slice = Math.ceil(marshalls.length / 2)
    return (
      <Column>
        <Text className='text-primary font-inter-medium ml-4 text-xl'>
          Marshalls
        </Text>
        <View className='h-2' />
        <Card>
          <Row className='p-4'>
            <Column className='flex-1'>
              {marshalls.slice(0, slice).map((it) => (
                <Text
                  key={it}
                  className='text-secondary font-inter-regular py-1 text-base'
                >
                  {it}
                </Text>
              ))}
            </Column>
            <Column className='flex-1'>
              {marshalls.slice(slice).map((it) => (
                <Text
                  key={it}
                  className='text-secondary font-inter-regular py-1 text-base'
                >
                  {it}
                </Text>
              ))}
            </Column>
          </Row>
        </Card>
      </Column>
    )
  }
}
