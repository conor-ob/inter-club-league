import { Text } from 'react-native'
import { Row } from '../../components/layout/row'

export function GcHeader() {
  return (
    <Row className='justify-between px-2'>
      <Row>
        <Text className='text-primary font-inter-semibold w-10 text-center text-sm tracking-tight'>
          POS
        </Text>
        <Text className='text-primary font-inter-semibold px-2 text-center text-sm tracking-tight'>
          RIDER
        </Text>
      </Row>
      <Row>
        <Text className='text-primary font-inter-semibold w-10 text-center text-sm tracking-tight'>
          MV
        </Text>
        <Text className='text-primary font-inter-semibold w-10 text-center text-sm tracking-tight'>
          GC
        </Text>
        <Text className='text-primary font-inter-semibold w-10 text-center text-sm tracking-tight'>
          TOT
        </Text>
      </Row>
    </Row>
  )
}
