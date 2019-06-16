/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LanguageNode, DurationNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMyPresentationProposal
// ====================================================

export interface getMyPresentationProposal_myPresentationProposal_owner {
  __typename: "UserNode";
  /**
   * 150자 이하 문자, 숫자 그리고 @/./+/-/_만 가능합니다.
   */
  username: string;
}

export interface getMyPresentationProposal_myPresentationProposal_category {
  __typename: "CategoryNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  slug: string;
  visible: boolean;
}

export interface getMyPresentationProposal_myPresentationProposal_difficulty {
  __typename: "DifficultyNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
}

export interface getMyPresentationProposal_myPresentationProposal {
  __typename: "PresentationProposalNode";
  name: string | null;
  desc: string;
  owner: getMyPresentationProposal_myPresentationProposal_owner | null;
  backgroundDesc: string;
  detailDesc: string;
  language: LanguageNode | null;
  duration: DurationNode | null;
  category: getMyPresentationProposal_myPresentationProposal_category | null;
  difficulty: getMyPresentationProposal_myPresentationProposal_difficulty | null;
  isPresentedBefore: boolean;
  placePresentedBefore: string;
  presentedSlideUrlBefore: string;
  recordable: boolean;
  submitted: boolean;
  accepted: boolean;
}

export interface getMyPresentationProposal {
  myPresentationProposal: getMyPresentationProposal_myPresentationProposal | null;
}
