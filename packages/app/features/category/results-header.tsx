import { Text, useColorScheme } from 'react-native'
import { Row } from '../../components/layout/row'

export function ResultsHeader() {
  const colorScheme = useColorScheme()
  return (
    <Row className='justify-between px-2'>
      <Row>
        <Text className='text-primary font-inter-semibold w-12 text-center text-sm tracking-tight'>
          POS
        </Text>
        <Text className='text-primary font-inter-semibold px-2 text-center text-sm tracking-tight'>
          RIDER
        </Text>
      </Row>
      <Text className='text-primary font-inter-semibold w-16 text-center text-sm tracking-tight'>
        POINTS
      </Text>
    </Row>
  )
}
