import { TouchableOpacity, View, useColorScheme } from 'react-native'
import { Link } from 'solito/link'
import { Card } from '../../components/card/card'
import { HeroIcon } from '../../components/icon/heroicon'
import { Row } from '../../components/layout/row'
import { colors } from '../../design/colors'
import { Stage } from '../../generated/graphql'
import { StageLayout } from './stage-layout'

export function StageCard({ stage, href }: { stage: Stage; href?: string }) {
  const colorScheme = useColorScheme()

  return href ? (
    <Card>
      <TouchableOpacity activeOpacity={0.6}>
        <Link href={href}>
          <Row className='flex-row items-center justify-between p-4'>
            <StageLayout stage={stage} />
            <View className='w-2' />
            <HeroIcon
              name='chevron-right'
              color={colors[colorScheme ?? 'light'].textColorSecondary}
              size={24}
            />
          </Row>
        </Link>
      </TouchableOpacity>
    </Card>
  ) : (
    <Card>
      <View className='p-4'>
        <StageLayout stage={stage} />
      </View>
    </Card>
  )
}
