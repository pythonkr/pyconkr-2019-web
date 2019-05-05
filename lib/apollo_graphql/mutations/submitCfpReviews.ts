import {
  submitCfpReviews,
  submitCfpReviews_submitCfpReviews,
  submitCfpReviewsVariables
} from 'lib/apollo_graphql/__generated__/submitCfpReviews'
import { createMutationDefinition, sendMutation } from './__base__'
import * as _submitCfpReviews from './_submitCfpReviews.graphql'

export const submitCfpReviewsMutationDefinition = createMutationDefinition<
  submitCfpReviews_submitCfpReviews,
  submitCfpReviewsVariables
>(_submitCfpReviews)

export const AssignCfpReviews = sendMutation(
  submitCfpReviewsMutationDefinition
)

export {
  submitCfpReviews
}
