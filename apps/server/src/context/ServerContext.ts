import { GcService } from '../service/GcService'
import { MarshallsService } from '../service/MarshallsService'
import { RedirectService } from '../service/RedirectService'
import { RoutesService } from '../service/RoutesService'
import { StageResultsService } from '../service/StageResultsService'
import { StagesService } from '../service/StagesService'

export interface ServerContext {
  gcService: GcService
  marshallsService: MarshallsService
  routesService: RoutesService
  stageResultsService: StageResultsService
  stagesService: StagesService
  redirectService: RedirectService
}
