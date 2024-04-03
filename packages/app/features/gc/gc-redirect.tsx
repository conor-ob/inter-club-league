import { useEffect } from 'react'
import { useRouter } from 'solito/router'
import { useRedirectQuery } from '../../graphql/use-redirect-query'

export function GcRedirect() {
  const { loading, data, error, refetch } = useRedirectQuery({
    seasonId: undefined
  })
  const { push, replace, back, parseNextPath } = useRouter()

  useEffect(() => {
    if (data?.redirects.currentStageId) {
      replace(`/gc/${data.redirects.currentStageId}`, undefined, {
        experimental: {
          nativeBehavior: 'stack-replace',
          isNestedNavigator: false
        }
      })
    }
  }, [data, replace])

  return null
}
