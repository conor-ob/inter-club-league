import { usePuttingPalsTournamentsQuery } from '@inter-club-league/app/graphql/use-putting-pals-tournaments-query'
import { Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'solito/router'

export function TournamentNavigation({
  tournamentId
}: {
  tournamentId: string
}) {
  const { push, replace, back, parseNextPath } = useRouter()
  const { data, loading, error } = usePuttingPalsTournamentsQuery()

  // console.log('tournamentId=' + tournamentId)
  // console.log('data=' + data)
  // console.log('loading=' + loading)

  let previousTournamentId: string | null | undefined = undefined
  let nextTournamentId: string | null | undefined = undefined
  if (data?.puttingPalsTournaments) {
    const tournamentIds = data.puttingPalsTournaments.map((it) => it.id)

    const currentTournamentIndex = tournamentIds.indexOf(tournamentId)

    previousTournamentId =
      currentTournamentIndex > 0
        ? tournamentIds[currentTournamentIndex - 1]
        : null
    nextTournamentId =
      currentTournamentIndex >= 0 &&
      currentTournamentIndex < tournamentIds.length - 1
        ? tournamentIds[currentTournamentIndex + 1]
        : null
  }

  return (
    <View className='bg-card flex-row rounded-xl'>
      <TouchableOpacity
        className='flex-1 items-center py-2'
        disabled={previousTournamentId === undefined}
        onPress={() => {
          if (previousTournamentId) {
            push(`/putting-pals/${previousTournamentId}`)
          }
        }}
      >
        <Text className='font-inter-regular text-base text-blue-500'>
          {previousTournamentId ? 'Back' : ''}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='flex-1 items-center py-2'
        disabled={nextTournamentId === undefined}
        onPress={() => {
          if (nextTournamentId) {
            push(`/putting-pals/${nextTournamentId}`)
          }
        }}
      >
        <Text className='font-inter-regular text-base text-blue-500'>
          {nextTournamentId ? 'Next' : ''}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
