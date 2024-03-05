import { GcService } from '../service/GcService'
import { MarshallsService } from '../service/MarshallsService'
import { StageResultsService } from '../service/StageResultsService'
import { StagesService } from '../service/StagesService'

export interface ServerContext {
  gcService: GcService
  marshallsService: MarshallsService
  stageResultsService: StageResultsService
  stagesService: StagesService
}
