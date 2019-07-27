/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LanguageNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getSprints
// ====================================================

export interface getSprints_sprints_owner_profile {
  __typename: "ProfileNode";
  name: string;
  nameKo: string | null;
  nameEn: string | null;
}

export interface getSprints_sprints_owner {
  __typename: "UserNode";
  profile: getSprints_sprints_owner_profile | null;
}

export interface getSprints_sprints_place {
  __typename: "PlaceNode";
  name: string;
  nameEn: string | null;
  nameKo: string | null;
}

export interface getSprints_sprints {
  __typename: "SprintNode";
  id: string;
  /**
   * 쉬는 시간일 경우 TRUE로 설정합니다.
   */
  isBreaktime: boolean;
  owner: getSprints_sprints_owner | null;
  name: string | null;
  nameKo: string | null;
  nameEn: string | null;
  place: getSprints_sprints_place | null;
  startedAt: any | null;
  finishedAt: any | null;
  desc: string;
  descKo: string | null;
  descEn: string | null;
  language: LanguageNode | null;
}

export interface getSprints {
  sprints: (getSprints_sprints | null)[] | null;
}
