import { TournamentStatusBadge } from '@inter-club-league/app/components/tournament/tournament-status-badge'
import { Tournament } from '@inter-club-league/app/generated/graphql'
import { Image, Text, View } from 'react-native'

type TournamentHeaderProps = {
  tournament: Tournament
}

export function TournamentHeader({ tournament }: TournamentHeaderProps) {
  return (
    <View className='bg-card rounded-xl px-4 py-4'>
      <View className='flex-row items-center'>
        <Image
          className='h-20 w-20 rounded-full border border-gray-300 dark:border-none'
          source={{
            uri: tournament.tournamentLogo[0]
          }}
          alt='tournamentLogo'
        />
        <View className='w-4' />
        <View className='flex-1'>
          <View className='w-fit flex-wrap'>
            <TournamentStatusBadge tournament={tournament} />
          </View>

          <View className='h-1' />
          <Text
            ellipsizeMode='tail'
            numberOfLines={2}
            className='text-primary font-inter-semibold text-xl'
          >
            {tournament.tournamentName}
          </Text>
          <View className='h-1' />
          <Text
            ellipsizeMode='tail'
            numberOfLines={2}
            className='font-inter-semibold text-secondary text-xs uppercase'
          >
            {tournament.courses[0]?.courseName}
          </Text>
        </View>
      </View>
    </View>
  )
}
