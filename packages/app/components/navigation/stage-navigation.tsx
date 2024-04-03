import cx from 'classnames'
import { Text, useColorScheme } from 'react-native'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { useStagesQuery } from '../../graphql/use-stages-query'
import { Card } from '../card/card'
import { Row } from '../layout/row'

const { useParams } = createParam<{
  id: string
}>()

export function StageNavigation1({ disabled }: { disabled: boolean }) {
  const { params } = useParams()
  const colorScheme = useColorScheme()
  const { data, loading, error } = useStagesQuery()
  const { push } = useRouter()

  const stageId = params.id

  return (
    <Card>
      <Row className='px-4 py-3'>
        <Text
          className={cx('font-inter-medium text-primary text-base', {
            'text-quarternary': disabled
          })}
        >
          Stage 1
        </Text>
      </Row>
    </Card>
  )
}
