/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PresentationProposalInput, LanguageNode, DurationNode } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateOrUpdatePresentationProposal
// ====================================================

export interface CreateOrUpdatePresentationProposal_createOrUpdatePresentationProposal_proposal {
  __typename: "PresentationProposalNode";
  name: string | null;
  backgroundDesc: string | null;
  detailDesc: string;
  language: LanguageNode | null;
  duration: DurationNode | null;
  isPresentedBefore: boolean;
  placePresentedBefore: string;
  presentedSlideUrlBefore: string;
  comment: string;
  submitted: boolean;
}

export interface CreateOrUpdatePresentationProposal_createOrUpdatePresentationProposal {
  __typename: "CreateOrUpdatePresentationProposal";
  proposal: CreateOrUpdatePresentationProposal_createOrUpdatePresentationProposal_proposal | null;
  success: boolean | null;
}

export interface CreateOrUpdatePresentationProposal {
  createOrUpdatePresentationProposal: CreateOrUpdatePresentationProposal_createOrUpdatePresentationProposal | null;
}

export interface CreateOrUpdatePresentationProposalVariables {
  data: PresentationProposalInput;
}
