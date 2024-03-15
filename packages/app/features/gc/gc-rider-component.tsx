import { GcRider } from 'app/generated/graphql'
import { memo } from 'react'
import { GcRiderRow } from './gc-rider-row'

type GcRiderComponentProps = {
  gcRider: GcRider
}

export const GcRiderComponent = memo(({ gcRider }: GcRiderComponentProps) => (
  <GcRiderRow gcRider={gcRider} />
))
