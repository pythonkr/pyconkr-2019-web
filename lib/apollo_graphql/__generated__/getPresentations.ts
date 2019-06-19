/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { DurationNode, LanguageNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPresentations
// ====================================================

export interface getPresentations_presentations_owner {
  __typename: "UserNode";
  /**
   * 150자 이하 문자, 숫자 그리고 @/./+/-/_만 가능합니다.
   */
  username: string;
}

export interface getPresentations_presentations_place {
  __typename: "PlaceNode";
  name: string;
  nameEn: string | null;
  nameKo: string | null;
}

export interface getPresentations_presentations_category {
  __typename: "CategoryNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  slug: string;
  visible: boolean;
}

export interface getPresentations_presentations_difficulty {
  __typename: "DifficultyNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
}

export interface getPresentations_presentations {
  __typename: "PresentationProposalNode";
  owner: getPresentations_presentations_owner | null;
  name: string | null;
  nameKo: string | null;
  nameEn: string | null;
  place: getPresentations_presentations_place | null;
  duration: DurationNode | null;
  startedAt: any | null;
  finishedAt: any | null;
  desc: string;
  descKo: string | null;
  descEn: string | null;
  language: LanguageNode | null;
  backgroundDesc: string;
  slideUrl: string;
  pdfUrl: string;
  videoUrl: string;
  category: getPresentations_presentations_category | null;
  difficulty: getPresentations_presentations_difficulty | null;
  recordable: boolean;
}

export interface getPresentations {
  presentations: (getPresentations_presentations | null)[] | null;
}
