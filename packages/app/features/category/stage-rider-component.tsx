import { memo } from 'react'
import { StageRider } from '../../generated/graphql'
import { StageRiderRow } from './stage-rider-row'

type StageRiderComponentProps = {
  stageRider: StageRider
  gcLeaderId?: string
}

export const StageRiderComponent = memo(
  ({ stageRider, gcLeaderId }: StageRiderComponentProps) => (
    <StageRiderRow stageRider={stageRider} gcLeaderId={gcLeaderId} />
  )
)
