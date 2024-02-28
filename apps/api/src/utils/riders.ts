export function createRiderInitials(riderId: string): string {
  return riderId
    .split('-')
    .map((it) => it.substring(0, 1).toUpperCase())
    .join('')
}
