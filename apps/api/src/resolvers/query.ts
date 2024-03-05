import { QueryResolvers } from '../generated/graphql'

const Query: QueryResolvers = {
  gc: (_, { stageId }, { gcService }, ____) => {
    try {
      return gcService.getGc(stageId)
    } catch (e) {
      console.log(`Query 'gc' failed for stageId=${stageId}`, e)
      throw e
    }
  },
  marshalls: (_, { stageId }, { marshallsService }, ____) => {
    try {
      return marshallsService.getMarshalls(stageId)
    } catch (e) {
      console.log(`Query 'marshalls' failed for stageId=${stageId}`, e)
      throw e
    }
  },
  stageResults: (_, { stageId }, { stageResultsService }, ____) => {
    try {
      return stageResultsService.getStageResults(stageId)
    } catch (e) {
      console.log(`Query 'stageResults' failed for stageId=${stageId}`, e)
      throw e
    }
  },
  stage: (_, { stageId }, { stagesService }, ____) => {
    try {
      return stagesService.getStage(stageId)
    } catch (e) {
      console.log(`Query 'stage' failed for stageId=${stageId}`, e)
      throw e
    }
  },
  stages: (_, { seasonId }, { stagesService }, ____) => {
    try {
      return stagesService.getStages(seasonId)
    } catch (e) {
      console.log(`Query 'stages' failed for seasonId=${seasonId}`, e)
      throw e
    }
  },
  // riderStats: (_, { riderId }, { riderStatsService }, ____) => {
  //   try {
  //     return riderStatsService.getRiderStats(riderId)
  //   } catch (e) {
  //     console.log(`Query 'riderStats' failed for seasonId=${riderId}`, e)
  //     throw e
  //   }
  // }
  riderStats: (_, { riderId }, context, ____) => {
    throw new Error('Not yet implemented')
  }
}

export { Query }
