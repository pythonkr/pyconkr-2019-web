/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ReviewInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: submitCfpReviews
// ====================================================

export interface submitCfpReviews_submitCfpReviews {
  __typename: "SubmitCFPReviews";
  success: boolean | null;
}

export interface submitCfpReviews {
  submitCfpReviews: submitCfpReviews_submitCfpReviews | null;
}

export interface submitCfpReviewsVariables {
  reviews: (ReviewInput | null)[];
}
