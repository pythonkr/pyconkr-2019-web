/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PresentationProposalInput, LanguageNode, DurationNode } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createOrUpdatePresentationProposal
// ====================================================

export interface createOrUpdatePresentationProposal_createOrUpdatePresentationProposal_proposal_category {
  __typename: "CategoryNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  slug: string;
  visible: boolean;
}

export interface createOrUpdatePresentationProposal_createOrUpdatePresentationProposal_proposal_difficulty {
  __typename: "DifficultyNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
}

export interface createOrUpdatePresentationProposal_createOrUpdatePresentationProposal_proposal {
  __typename: "PresentationProposalNode";
  name: string | null;
  backgroundDesc: string | null;
  detailDesc: string;
  language: LanguageNode | null;
  duration: DurationNode | null;
  isPresentedBefore: boolean;
  placePresentedBefore: string;
  presentedSlideUrlBefore: string;
  submitted: boolean;
  category: createOrUpdatePresentationProposal_createOrUpdatePresentationProposal_proposal_category | null;
  difficulty: createOrUpdatePresentationProposal_createOrUpdatePresentationProposal_proposal_difficulty | null;
}

export interface createOrUpdatePresentationProposal_createOrUpdatePresentationProposal {
  __typename: "CreateOrUpdatePresentationProposal";
  proposal: createOrUpdatePresentationProposal_createOrUpdatePresentationProposal_proposal | null;
}

export interface createOrUpdatePresentationProposal {
  createOrUpdatePresentationProposal: createOrUpdatePresentationProposal_createOrUpdatePresentationProposal | null;
}

export interface createOrUpdatePresentationProposalVariables {
  data: PresentationProposalInput;
}
