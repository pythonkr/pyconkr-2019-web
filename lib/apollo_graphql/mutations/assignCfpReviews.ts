import {
  assignCfpReviews,
  assignCfpReviews_assignCfpReviews,
  assignCfpReviews_assignCfpReviews_reviews as ReviewNode,
  assignCfpReviewsVariables
} from 'lib/apollo_graphql/__generated__/assignCfpReviews'
import { createMutationDefinition, sendMutation } from './__base__'
import * as _assignCfpReviews from './_assignCfpReviews.graphql'

export const assignCfpReviewsMutationDefinition = createMutationDefinition<
  assignCfpReviews_assignCfpReviews,
  assignCfpReviewsVariables
>(_assignCfpReviews)

export const AssignCfpReviews = sendMutation(
  assignCfpReviewsMutationDefinition
)

export {
  assignCfpReviews,
  ReviewNode
}
