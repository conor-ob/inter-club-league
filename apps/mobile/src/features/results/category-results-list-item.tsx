import { IconBadge } from '@/components/badge/icon-badge'
import { colors } from '@/design/color-theme'
import { CategoryResults } from '@/generated/graphql'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'

type CategoryResultsListItemProps = {
  categoryResults: CategoryResults
}

export function CategoryResultsListItem({
  categoryResults
}: CategoryResultsListItemProps) {
  const colorScheme = useColorScheme()
  return (
    <Link
      href={{
        pathname: '/(tabs)/results/category',
        params: {
          category: categoryResults.categoryGroup.categories
            .map((category) => category.name)
            .join(' & ')
        }
      }}
      asChild
    >
      <TouchableOpacity activeOpacity={0.6}>
        <View className='flex flex-row items-center justify-between px-4 py-3'>
          <View>
            <Text className='text-primary font-inter-medium text-xl'>
              {categoryResults.categoryGroup.categories
                .map((category) => category.name)
                .join(' & ')}
            </Text>
            <View className='h-1' />
            <View className='flex flex-row flex-wrap'>
              <IconBadge
                label={`${categoryResults.stageRiders.filter((it) => it.points >= 5).length} riders`}
                icon='bicycle-outline'
                color={colors[colorScheme ?? 'light'].brandDefault}
              />
            </View>
          </View>
          <Ionicons
            name='chevron-forward'
            size={20}
            color={colors[colorScheme ?? 'light'].textColorSecondary}
          />
        </View>

        {/* <View className='px-4 py-2'>
          <View className='flex flex-row items-center justify-between'>
            <View className='flex flex-row items-center'>
              <Text className='text-primary font-inter-medium text-xl'>
                {categoryResults.categoryGroup.categories
                  .map((category) => category.name)
                  .join(' & ')}
              </Text>
              <View className='w-2' />
              <IconBadge
                label={`${categoryResults.stageRiders.filter((it) => it.points >= 5).length} riders`}
                icon='bicycle-outline'
                color={colors[colorScheme ?? 'light'].brandDefault}
              />
            </View>
            <Ionicons
              name='chevron-forward'
              size={20}
              color={colors[colorScheme ?? 'light'].textColorSecondary}
            />
          </View>
        </View> */}
        {/* <View className='px-4 py-2'>
          <View className='flex flex-row justify-between'>
            <Text className='text-primary font-inter-medium text-lg'>
              {categoryResults.categoryGroup.categories
                .map((category) => category.name)
                .join(' & ')}
            </Text>
            <Ionicons
              name='chevron-forward'
              size={20}
              color={colors[colorScheme ?? 'light'].textColorSecondary}
            />
          </View>
          <View className='-mx-1 flex flex-row flex-wrap'>
            <View className='px-1 py-1'>
              <IconBadge
                label={`${categoryResults.stageRiders.filter((it) => it.points >= 5).length} riders`}
                icon='bicycle-outline'
                color={colors[colorScheme ?? 'light'].brandDefault}
              />
            </View>
          </View>
        </View> */}
      </TouchableOpacity>
    </Link>
  )
}
