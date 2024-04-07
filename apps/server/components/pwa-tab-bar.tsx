import {
  CalendarDaysIcon,
  ChartBarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import { Row } from 'app/components/layout/row'

export function PwaTabBar() {
  return (
    <Row className='h-12 items-center justify-between px-20'>
      <TrophyIcon className='block h-8 w-8' />
      <ChartBarIcon className='block h-8 w-8' />
      <CalendarDaysIcon className='block h-8 w-8' />
    </Row>
  )
}
