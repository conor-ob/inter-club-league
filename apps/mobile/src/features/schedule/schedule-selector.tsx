import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { useState } from 'react'

type ScheduleSelectorProps = {
  initialIndex: number
}

export function ScheduleSelector({ initialIndex }: ScheduleSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  return (
    <SegmentedControl
      values={['Upcoming', 'Completed']}
      selectedIndex={selectedIndex}
      onChange={(event) => {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
      }}
    />
  )
}
