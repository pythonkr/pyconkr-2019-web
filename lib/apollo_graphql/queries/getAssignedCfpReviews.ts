import {
  getAssignedCfpReviews as getAssignedCfpReviewsType,
  getAssignedCfpReviews_assignedCfpReviews as CFPReviewType
} from 'lib/apollo_graphql/__generated__/getAssignedCfpReviews'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getAssignedCfpReviews from './_getAssignedCfpReviews.graphql'

export const getAssignedCfpReviewsQueryDefinition = createQueryDefinition<
  getAssignedCfpReviewsType,
  {}
>(_getAssignedCfpReviews)

export const getAssignedCfpReviews = sendQuery(
  getAssignedCfpReviewsQueryDefinition,
)

export {
  CFPReviewType
}
