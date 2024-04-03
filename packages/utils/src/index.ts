export function seasonIdFromStageId(stageId: string): string {
  const parts = stageId.split('-')
  if (parts.length < 2) {
    throw new Error(`Invalid format for stageId=${stageId}`)
  }
  return parts[0]!
}

export function stageNumberFromStageId(stageId: string): string {
  const parts = stageId.split('-')
  if (parts.length < 2) {
    throw new Error(`Invalid format for stageId=${stageId}`)
  }
  return parts[1]!
}

export function idFromPath(path: string): string {
  return path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
}
