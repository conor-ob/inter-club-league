// import { StageResultRepository } from '../database/StageResultRepository'
// import { Gc, GcStatus, RiderStats, StageRider } from '../generated/graphql'
// import { GcService } from './GcService'
// import { StageResultsService } from './StageResultsService'
// import { StagesService } from './StagesService'

// export class RiderStatsService {
//   private gcService: GcService
//   private stageResultRepository: StageResultRepository
//   private stageResultsService: StageResultsService
//   private stagesService: StagesService

//   constructor(
//     gcService: GcService,
//     stageResultRepository: StageResultRepository,
//     stageResultsService: StageResultsService,
//     stagesService: StagesService
//   ) {
//     this.gcService = gcService
//     this.stageResultRepository = stageResultRepository
//     this.stageResultsService = stageResultsService
//     this.stagesService = stagesService
//   }

//   getRiderStats(riderId: string): RiderStats {
//     const stageResults = this.stageResultRepository
//       .getStageIds()
//       .flatMap((stageId) =>
//         this.stageResultsService
//           .getStageResults(stageId)
//           .categoryResults.flatMap((c) => c.stageRiders)
//           .filter((r) => r.rider.id === riderId)
//       )

//     const gcResults = this.stageResultRepository
//       .getStageIds()
//       .map((stageId) => this.gcService.getGc(stageId))

//     if (stageResults.length === 0) {
//       throw Error('TODO')
//     } else {
//       const latestResult = stageResults[stageResults.length - 1]! // TODO !
//       return {
//         id: riderId,
//         rider: latestResult.rider,
//         club: latestResult.club,
//         category: latestResult.category,
//         isGcWinner: this.isGcWinner(riderId, gcResults),
//         gcLeaderStages: this.gcLeaderStages(riderId, gcResults),
//         firstPlaces: this.firstPlaces(riderId, stageResults),
//         secondPlaces: this.secondPlaces(riderId, stageResults),
//         thirdPlaces: this.thirdPlaces(riderId, stageResults),
//         stagesPlaced: 0,
//         stagesRaced: 0,
//         gcPoints: 0,
//         totalPoints: 0
//       }
//     }
//   }

//   private isGcWinner(riderId: string, gcResults: Gc[]): boolean {
//     const finalGc = gcResults.filter((gc) => gc.gcStatus === GcStatus.Completed)
//     if (finalGc.length === 0) {
//       return false
//     } else {
//       const gc = finalGc[0]!
//       const gcWinners = gc.gcRiders.filter(
//         (r) => r.position === '1' || r.position === 'T1'
//       )
//       return gcWinners.map((r) => r.rider.id).includes(riderId)
//     }
//   }

//   private gcLeaderStages(riderId: string, gcResults: Gc[]): number {
//     return gcResults
//       .flatMap((it) =>
//         it.gcRiders.filter((it) => it.position === '1' || it.position === 'T1')
//       )
//       .filter((it) => it.rider.id === riderId).length
//   }

//   private firstPlaces(riderId: string, stageResults: StageRider[]): number {
//     return stageResults.filter((it) => it.points === 11).length
//   }

//   private secondPlaces(riderId: string, stageResults: StageRider[]): number {
//     return stageResults.filter((it) => it.points === 10).length
//   }

//   private thirdPlaces(riderId: string, stageResults: StageRider[]): number {
//     return stageResults.filter((it) => it.points === 9).length
//   }
// }
