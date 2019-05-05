/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LanguageNode, DurationNode } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: assignCfpReviews
// ====================================================

export interface assignCfpReviews_assignCfpReviews_reviews_presentation_category {
  __typename: "CategoryNode";
  name: string;
  nameKo: string | null;
  nameEn: string | null;
}

export interface assignCfpReviews_assignCfpReviews_reviews_presentation_difficulty {
  __typename: "DifficultyNode";
  name: string;
  nameKo: string | null;
  nameEn: string | null;
}

export interface assignCfpReviews_assignCfpReviews_reviews_presentation {
  __typename: "ProposalForReviewNode";
  name: string | null;
  nameKo: string | null;
  nameEn: string | null;
  language: LanguageNode | null;
  backgroundDesc: string;
  duration: DurationNode | null;
  category: assignCfpReviews_assignCfpReviews_reviews_presentation_category | null;
  difficulty: assignCfpReviews_assignCfpReviews_reviews_presentation_difficulty | null;
  detailDesc: string;
}

export interface assignCfpReviews_assignCfpReviews_reviews {
  __typename: "CFPReviewNode";
  id: string;
  presentation: assignCfpReviews_assignCfpReviews_reviews_presentation | null;
  comment: string;
  createdAt: any;
  updatedAt: any;
}

export interface assignCfpReviews_assignCfpReviews {
  __typename: "AssignCFPReviews";
  reviews: (assignCfpReviews_assignCfpReviews_reviews | null)[] | null;
}

export interface assignCfpReviews {
  assignCfpReviews: assignCfpReviews_assignCfpReviews | null;
}

export interface assignCfpReviewsVariables {
  categoryIds: (string | null)[];
  languages: (LanguageNode | null)[];
}
