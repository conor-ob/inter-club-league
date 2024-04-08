import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { GcBadge } from 'app/components/gc/gc-badge'
import { RefreshScrollView } from 'app/components/view/refresh-scroll-view'
import cx from 'classnames'
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  useColorScheme
} from 'react-native'
import { Skeleton } from '../../components/loading/skeleton'
import { colors } from '../../design/colors'
import { useStagesQuery } from '../../graphql/use-stages-query'
import { ScheduleList } from './schedule-list'
import { buildSchedule } from './schedule-utils'

export function ScheduleFeature() {
  const colorScheme = useColorScheme()
  const { data, loading, error, refetch } = useStagesQuery(undefined)

  const upcomingStages = [
    {
      id: '2024-1.1',
      beautyImage:
        'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/281150653_4737665473006647_4046930424987489172_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ApIImkzmgngAb6c9TNV&_nc_ht=scontent-dub4-1.xx&oh=00_AfBwS0aBvRRVk2qFNqbRcbwu_uxuLXAhbkkj7hjrywG9-g&oe=661A53FD',
      stageDisplay: 'S1.1',
      displayName: 'Corkagh Park (L & SL)',
      displayLocation: 'Dublin',
      display: 'UPCOMING',
      date: 'Apr 10'
    },
    {
      id: '2024-1.2',
      beautyImage:
        'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/286280744_4829624607144066_6654678953190306795_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ECa9nMT5xIEAb4Rz-ow&_nc_ht=scontent-dub4-1.xx&oh=00_AfB0hK5CBlOddm5YrEbnm5fEF12-VD1-ZYlogq8nKg_uOg&oe=661A36BE',
      stageDisplay: 'S1.2',
      displayName: 'Corkagh Park (S & SS)',
      displayLocation: 'Dublin',
      display: 'UPCOMING',
      date: 'Apr 11'
    },
    {
      id: '2024-2',
      beautyImage:
        'https://scontent-dub4-1.xx.fbcdn.net/v/t39.30808-6/290263762_567624374891724_4302042042636820427_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=HxxN0xCPYX4Ab7qmF60&_nc_ht=scontent-dub4-1.xx&oh=00_AfAFpWHyYIeNwzX9bS7uVzf6JANWRj3trTb7I2lLZnv0Sw&oe=661A3DA3',
      stageDisplay: 'S2',
      displayName: 'Lap of the Lakes',
      displayLocation: 'Dublin',
      display: 'UPCOMING',
      date: 'Apr 18'
    },
    {
      id: '4',
      beautyImage:
        'https://www.stickybottle.com/wp-content/uploads/2022/05/Gleeson-Donal-RIP.jpg',
      stageDisplay: 'S4',
      displayName: 'Donal Gleeson Memorial',
      displayLocation: 'Dunboyne',
      display: 'UPCOMING',
      date: 'May 2'
    }
  ]

  return (
    <RefreshScrollView
      contentContainerClassName='py-6'
      loading={loading}
      onRefresh={() => refetch()}
    >
      {loading ? (
        <View>
          <SegmentedControl
            values={['Upcoming', 'Completed']}
            enabled={false}
            fontStyle={{
              fontWeight: '500',
              color: colors[colorScheme ?? 'light'].textColorSecondary
            }}
            activeFontStyle={{
              fontWeight: '600',
              color: colors[colorScheme ?? 'light'].textColorPrimary
            }}
          />
          <View className='h-12' />
          <Skeleton className='mx-3 h-5 w-12 rounded-md' />
          <View className='h-3' />
          <Skeleton className='h-40 rounded-xl' />
          <View className='h-12' />
          <Skeleton className='mx-3 h-5 w-12 rounded-md' />
          <View className='h-3' />
          <Skeleton className='h-80 rounded-xl' />
        </View>
      ) : data ? (
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {upcomingStages?.map((it, index) => (
              <View
                key={it.id}
                className={cx('ml-4', {
                  'mr-4': index === upcomingStages.length - 1
                })}
              >
                <ImageBackground
                  className='rounded-xl bg-black'
                  imageClassName='rounded-xl opacity-80'
                  source={{
                    uri: it.beautyImage!
                  }}
                  alt='beauty-image'
                >
                  <View className='h-80 w-64 justify-between p-4'>
                    <View className='w-fit'>
                      <GcBadge text={it.stageDisplay} />
                    </View>

                    <Text className='font-inter-semibold px-4 text-center text-base tracking-tight text-white'>
                      {it.displayName}
                    </Text>
                  </View>
                </ImageBackground>
                <View className='py-4'>
                  <Text className='text-primary font-inter-semibold text-base'>
                    {it.date}
                  </Text>
                  <Text
                    className={cx(
                      'font-inter-bold text-secondary dark:text-tertiary text-sm uppercase tracking-tighter'
                    )}
                  >
                    {it.display}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <View className='h-8' />
          <View className='px-4'>
            <ScheduleList schedule={buildSchedule(data?.stages ?? [])} />
          </View>
        </View>
      ) : (
        <View />
      )}
    </RefreshScrollView>
  )
}
