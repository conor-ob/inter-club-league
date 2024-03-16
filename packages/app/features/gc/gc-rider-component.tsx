import { memo } from 'react'
import { GcRider } from '../../generated/graphql'
import { GcRiderRow } from './gc-rider-row'

type GcRiderComponentProps = {
  gcRider: GcRider
}

export const GcRiderComponent = memo(({ gcRider }: GcRiderComponentProps) => (
  <GcRiderRow gcRider={gcRider} />
))
