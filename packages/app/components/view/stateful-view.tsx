import { ReactNode } from 'react'
import { View } from 'react-native'

export function StatefulView({
  displayLoading,
  displayError,
  displayData,
  loadingView,
  errorView,
  dataView
}: {
  displayLoading: boolean
  displayError: boolean
  displayData: boolean
  loadingView: ReactNode
  errorView: ReactNode
  dataView: ReactNode
}) {
  return displayLoading ? (
    loadingView
  ) : displayError ? (
    errorView
  ) : displayData ? (
    dataView
  ) : (
    <View />
  )
}
