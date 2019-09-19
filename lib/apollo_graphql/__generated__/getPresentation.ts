/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LanguageNode, DurationNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPresentation
// ====================================================

export interface getPresentation_presentation_owner_profile {
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

export interface getPresentation_presentation_owner {
  __typename: "UserNode";
  /**
   * 150자 이하 문자, 숫자 그리고 @/./+/-/_만 가능합니다.
   */
  username: string;
  profile: getPresentation_presentation_owner_profile | null;
}

export interface getPresentation_presentation_secondaryOwner_profile {
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

export interface getPresentation_presentation_secondaryOwner {
  __typename: "UserNode";
  /**
   * 150자 이하 문자, 숫자 그리고 @/./+/-/_만 가능합니다.
   */
  username: string;
  profile: getPresentation_presentation_secondaryOwner_profile | null;
}

export interface getPresentation_presentation_category {
  __typename: "CategoryNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  slug: string;
  visible: boolean;
}

export interface getPresentation_presentation_difficulty {
  __typename: "DifficultyNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
}

export interface getPresentation_presentation_cfpReviewSet_presentation {
  __typename: "ProposalForReviewNode";
  detailDesc: string;
}

export interface getPresentation_presentation_cfpReviewSet {
  __typename: "CFPReviewNode";
  presentation: getPresentation_presentation_cfpReviewSet_presentation | null;
}

export interface getPresentation_presentation {
  __typename: "PublicPresentationNode";
  id: string;
  /**
   * 키노트 스피커인 경우 TRUE로 설정합니다.
   */
  isKeynote: boolean;
  /**
   * 쉬는 시간일 경우 TRUE로 설정합니다.
   */
  isBreaktime: boolean;
  name: string | null;
  desc: string | null;
  owner: getPresentation_presentation_owner | null;
  secondaryOwner: getPresentation_presentation_secondaryOwner | null;
  backgroundDesc: string;
  language: LanguageNode | null;
  duration: DurationNode | null;
  category: getPresentation_presentation_category | null;
  difficulty: getPresentation_presentation_difficulty | null;
  recordable: boolean;
  submitted: boolean;
  accepted: boolean;
  slideUrl: string | null;
  videoUrl: string;
  startedAt: any | null;
  finishedAt: any | null;
  cfpReviewSet: (getPresentation_presentation_cfpReviewSet | null)[] | null;
}

export interface getPresentation {
  presentation: getPresentation_presentation | null;
}

export interface getPresentationVariables {
  id: number;
}
