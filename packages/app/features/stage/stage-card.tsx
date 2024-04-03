import { TouchableOpacity, View, useColorScheme } from 'react-native'
import { Link } from 'solito/link'
import { Card } from '../../components/card/card'
import { HeroIcon } from '../../components/icons/heroicon'
import { colors } from '../../design/colors'
import { Stage } from '../../generated/graphql'
import { StageLayout } from './stage-layout'

export function StageCard({ stage, href }: { stage: Stage; href?: string }) {
  const colorScheme = useColorScheme()

  return href ? (
    <Card>
      <Link href={href}>
        <TouchableOpacity
          className='flex-row items-center justify-between px-4 py-4'
          activeOpacity={0.6}
        >
          <StageLayout stage={stage} />
          <View className='w-2' />
          <HeroIcon
            name='chevron-right'
            color={colors[colorScheme ?? 'light'].textColorSecondary}
            size={24}
          />
        </TouchableOpacity>
      </Link>
    </Card>
  ) : (
    <Card>
      <StageLayout stage={stage} />
    </Card>
  )
}
