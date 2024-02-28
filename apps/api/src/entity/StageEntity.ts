export interface StageEntity {
  id: string
  season: number
  number: number
  name: string
  club: string
  location: string
  county: string
  startTime: string
  type: string
  mandatory: boolean
  categoryGroups: string
  coordinates?: string
  stravaId?: string
}
