/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LanguageNode, DurationNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getAssignedCfpReviews
// ====================================================

export interface getAssignedCfpReviews_assignedCfpReviews_presentation_category {
  __typename: "CategoryNode";
  name: string;
  nameKo: string | null;
  nameEn: string | null;
}

export interface getAssignedCfpReviews_assignedCfpReviews_presentation_difficulty {
  __typename: "DifficultyNode";
  name: string;
  nameKo: string | null;
  nameEn: string | null;
}

export interface getAssignedCfpReviews_assignedCfpReviews_presentation {
  __typename: "ProposalForReviewNode";
  name: string | null;
  nameKo: string | null;
  nameEn: string | null;
  language: LanguageNode | null;
  backgroundDesc: string;
  duration: DurationNode | null;
  category: getAssignedCfpReviews_assignedCfpReviews_presentation_category | null;
  difficulty: getAssignedCfpReviews_assignedCfpReviews_presentation_difficulty | null;
  detailDesc: string;
}

export interface getAssignedCfpReviews_assignedCfpReviews {
  __typename: "CFPReviewNode";
  id: string;
  presentation: getAssignedCfpReviews_assignedCfpReviews_presentation | null;
  comment: string;
  createdAt: any;
  updatedAt: any;
}

export interface getAssignedCfpReviews {
  isCfpReviewSubmitted: boolean | null;
  assignedCfpReviews: (getAssignedCfpReviews_assignedCfpReviews | null)[] | null;
}
