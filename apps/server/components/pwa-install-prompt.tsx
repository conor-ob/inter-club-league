import PWAInstallComponent from './pwa-install-component.jsx'

export function PWAInstallPrompt() {
  return (
    <PWAInstallComponent
      install-description='Install the app for the best experience'
      disable-screenshots='true'
      onInstallSuccess={undefined}
      onInstallFail={undefined}
      onUserChoiceResult={undefined}
      onInstallAvailable={undefined}
      onInstallHowTo={undefined}
      onInstallGallery={undefined}
    />
  )
}
