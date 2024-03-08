import { IconBadge } from '@/components/badge/icon-badge'
import { YellowJersey } from '@/components/image/yellow-jersey'
import { colors } from '@/design/color-theme'
import { CategoryResults } from '@/generated/graphql'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'

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
    <Link
      href={{
        pathname: '/(tabs)/results/category',
        params: {
          stageId: stageId,
          categoryGroupId: categoryResults.categoryGroup.id
        }
      }}
      asChild
    >
      <TouchableOpacity activeOpacity={0.6}>
        <View className='flex flex-row items-center justify-between px-4 py-3'>
          <View className='flex flex-1'>
            <Text className='text-primary font-inter-medium text-xl'>
              {categoryResults.categoryGroup.categories
                .map((category) => category.name)
                .join(' & ')}
            </Text>
            <View className='h-2' />
            <View className='flex flex-row flex-wrap'>
              <IconBadge
                label={`${categoryResults.stageRiders.filter((it) => it.points >= 5).length} riders`}
                icon='bicycle-outline'
                color={colors[colorScheme ?? 'light'].brandDefault}
              />
            </View>
          </View>
          <View className='flex flex-row items-center'>
            {categoryResults.stageRiders
              .map((it) => it.rider.id)
              .includes(gcLeaderId) && (
              <View className='flex flex-row'>
                <YellowJersey />
                <View className='w-2' />
              </View>
            )}
            <Ionicons
              name='chevron-forward'
              size={20}
              color={colors[colorScheme ?? 'light'].textColorSecondary}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
}
