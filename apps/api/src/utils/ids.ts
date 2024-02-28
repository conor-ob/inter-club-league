export function idFromPath(path: string): string {
  return path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
}

export function stageNumberFromStageId(stageId: string): string {
  return stageId.split('-')[1]! // TODO !
}

export function seasonIdFromStageId(stageId: string): string {
  return stageId.split('-')[0]! // TODO !
}
