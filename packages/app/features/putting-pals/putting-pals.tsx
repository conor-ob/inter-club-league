import { Skeleton } from '@turbostack/app/components/loading/skeleton'
import { Tournament } from '@turbostack/app/generated/graphql'
import { useTournamentsQuery } from '@turbostack/app/graphql/use-tournament-query'
import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { Platform, RefreshControl, ScrollView, View } from 'react-native'
import { createParam } from 'solito'
import { TournamentHeader } from '../../components/tournament/tournament-header'
import { TournamentNavigation } from './tournament-navigation'

const { useParams } = createParam<{
  id: string
}>()

export function PuttingPals() {
  const { params } = useParams()
  const { loading, data, error, refetch } = useTournamentsQuery([params.id])
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
  }, [refetch])

  useEffect(() => {
    if (!loading) {
      setRefreshing(false)
    }
  }, [loading])

  return (
    <ScrollView
      className='bg-background'
      contentContainerClassName={cx('py-8', {
        'px-4': Platform.OS === 'android' || Platform.OS === 'web',
        'px-5': Platform.OS === 'ios'
      })}
      contentInsetAdjustmentBehavior='automatic'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            handleRefresh()
          }}
        />
      }
    >
      {loading ? (
        <View>
          <Skeleton className='h-28' />
          <View className='h-6' />
          <TournamentNavigation tournamentId={params.id} />
        </View>
      ) : data?.tournaments ? (
        <View>
          <TournamentHeader tournament={data.tournaments[0] as Tournament} />
          <View className='h-6' />
          <TournamentNavigation tournamentId={params.id} />
        </View>
      ) : (
        <View></View>
      )}
    </ScrollView>
  )
}
