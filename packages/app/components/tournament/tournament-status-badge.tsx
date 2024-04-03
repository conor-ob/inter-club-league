import {
  Tournament,
  TournamentStatus
} from '@inter-club-league/app/generated/graphql'
import { Text, View } from 'react-native'
import { RoundStatusBadge } from './round-status-badge'

type TournamentStatusBadgeProps = {
  tournament: Tournament
}

export function TournamentStatusBadge({
  tournament
}: TournamentStatusBadgeProps) {
  if (tournament.tournamentStatus === TournamentStatus.InProgress) {
    return (
      <View className='bg-brand-green items-center rounded-sm px-2 py-0.5'>
        <Text className='font-inter-bold text-xs tracking-tight text-white'>
          {tournament.roundStatus}
        </Text>
      </View>
    )
  } else {
    return (
      <RoundStatusBadge
        roundDisplay={tournament.roundStatusDisplay.toUpperCase()}
        roundStatusColor={tournament.roundStatusColor}
      />
    )
  }
}
