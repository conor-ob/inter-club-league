import { PgaTourLeaderboardService } from '../service/PgaTourLeaderboardService'
import { PgaTourTournamentService } from '../service/PgaTourTournamentService'
import { PuttingPalsScheduleService } from '../service/PuttingPalsScheduleService'
import { RedirectsService } from '../service/RedirectsService'

export interface ServerContext {
  pgaTourLeaderboardService: PgaTourLeaderboardService
  pgaTourTournamentService: PgaTourTournamentService
  puttingPalsScheduleService: PuttingPalsScheduleService
  redirectsService: RedirectsService
}
