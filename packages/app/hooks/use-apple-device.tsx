const useAppleDevice = () => {
  return Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i))
}

export default useAppleDevice
