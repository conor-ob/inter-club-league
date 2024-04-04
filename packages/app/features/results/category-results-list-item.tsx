import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Link } from 'solito/link'
import { IconBadge } from '../../components/badge/icon-badge'
import { HeroIcon } from '../../components/icon/heroicon'
import { YellowJersey } from '../../components/image/yellow-jersey'
import { colors } from '../../design/colors'
import { CategoryResults } from '../../generated/graphql'

// TODO nullable stageId
type CategoryResultsListItemProps = {
  stageId?: string
  categoryResults: CategoryResults
  gcLeaderId?: string
}

export function CategoryResultsListItem({
  stageId,
  categoryResults,
  gcLeaderId
}: CategoryResultsListItemProps) {
  const colorScheme = useColorScheme()
  return (
    <TouchableOpacity activeOpacity={0.6}>
      <Link
        href={{
          pathname: `/results/category/${stageId}`,
          query: {
            group: categoryResults.categoryGroup.id
          }
        }}
      >
        <View className='flex flex-row items-center justify-between px-4 py-3'>
          <View className='flex flex-1'>
            <Text className='text-primary font-inter-medium text-base'>
              {categoryResults.categoryGroup.categories
                .map((category) => category.name)
                .join(' & ')}
            </Text>
            <View className='h-2' />
            <View className='flex flex-row flex-wrap'>
              <IconBadge
                label={`${categoryResults.stageRiders.filter((it) => it.points >= 5).length} riders`}
                icon='bicycle'
                color={colors[colorScheme ?? 'light'].brandDefault}
              />
            </View>
          </View>
          <View className='flex flex-row items-center'>
            {categoryResults.stageRiders
              .map((it) => it.rider.id)
              .includes(gcLeaderId ?? '') && (
              <View className='flex flex-row'>
                <YellowJersey />
                <View className='w-2' />
              </View>
            )}
            <HeroIcon
              name='chevron-right'
              size={20}
              color={colors[colorScheme ?? 'light'].textColorSecondary}
            />
          </View>
        </View>
      </Link>
    </TouchableOpacity>
  )
}
