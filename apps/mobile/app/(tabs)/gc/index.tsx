import { useRedirectQuery } from 'app/graphql/use-redirect-query'
import { Redirect } from 'expo-router'

export default function Index() {
  const { loading, data, error, refetch } = useRedirectQuery({
    seasonId: undefined
  })

  if (data?.redirects.currentStageId) {
    return <Redirect href={`/gc/${data.redirects.currentStageId}`} />
  }
  return null
  // return <GcRedirect />
}
