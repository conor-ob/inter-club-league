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
  stages: (_, { seasonId }, { redirectService, stagesService }, ____) => {
    try {
      const resolvedSeasonId = seasonId ?? redirectService.getCurrentSeasonId()
      return stagesService.getStages(resolvedSeasonId)
    } catch (e) {
      console.log(`Query 'stages' failed for seasonId=${seasonId}`, e)
      throw e
    }
  },
  redirects: (_, { seasonId }, { redirectService }, ____) => {
    try {
      const resolvedSeasonId = seasonId ?? redirectService.getCurrentSeasonId()
      return redirectService.getRedirects(resolvedSeasonId)
    } catch (e) {
      console.log(`Query 'currentGcStageId' failed for seasonId=${seasonId}`, e)
      throw e
    }
  }
}

export { Query }
