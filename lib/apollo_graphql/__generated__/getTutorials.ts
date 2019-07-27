/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LanguageNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getTutorials
// ====================================================

export interface getTutorials_tutorials_owner_profile {
  __typename: "ProfileNode";
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  image: string | null;
  avatarUrl: string;
  bio: string;
  bioKo: string | null;
  bioEn: string | null;
  blogUrl: string;
  githubUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedInUrl: string;
  instagramUrl: string;
}

export interface getTutorials_tutorials_owner {
  __typename: "UserNode";
  profile: getTutorials_tutorials_owner_profile | null;
}

export interface getTutorials_tutorials_place {
  __typename: "PlaceNode";
  name: string;
  nameEn: string | null;
  nameKo: string | null;
}

export interface getTutorials_tutorials_difficulty {
  __typename: "DifficultyNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
}

export interface getTutorials_tutorials {
  __typename: "TutorialNode";
  id: string;
  /**
   * 쉬는 시간일 경우 TRUE로 설정합니다.
   */
  isBreaktime: boolean;
  owner: getTutorials_tutorials_owner | null;
  name: string | null;
  nameKo: string | null;
  nameEn: string | null;
  place: getTutorials_tutorials_place | null;
  startedAt: any | null;
  finishedAt: any | null;
  desc: string;
  descKo: string | null;
  descEn: string | null;
  language: LanguageNode | null;
  difficulty: getTutorials_tutorials_difficulty | null;
}

export interface getTutorials {
  tutorials: (getTutorials_tutorials | null)[] | null;
}
