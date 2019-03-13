/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PresentationInput, LanguageNode, DurationNode } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateOrUpdatePresentation
// ====================================================

export interface CreateOrUpdatePresentation_createOrUpdatePresentation_presentation_owner_profile {
  __typename: "ProfileNode";
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  bio: string;
  bioKo: string | null;
  bioEn: string | null;
  email: string;
  organization: string;
  nationality: string;
  image: any | null;
  avatarUrl: string;
}

export interface CreateOrUpdatePresentation_createOrUpdatePresentation_presentation_owner {
  __typename: "UserNode";
  profile: CreateOrUpdatePresentation_createOrUpdatePresentation_presentation_owner_profile | null;
}

export interface CreateOrUpdatePresentation_createOrUpdatePresentation_presentation_place {
  __typename: "PlaceNode";
  name: string;
}

export interface CreateOrUpdatePresentation_createOrUpdatePresentation_presentation_category {
  __typename: "CategoryNode";
  id: string;
}

export interface CreateOrUpdatePresentation_createOrUpdatePresentation_presentation_difficulty {
  __typename: "DifficultyNode";
  id: string;
}

export interface CreateOrUpdatePresentation_createOrUpdatePresentation_presentation {
  __typename: "PresentationNode";
  id: string;
  owner: CreateOrUpdatePresentation_createOrUpdatePresentation_presentation_owner;
  name: string | null;
  nameKo: string | null;
  nameEn: string | null;
  desc: string;
  descKo: string | null;
  descEn: string | null;
  shortDesc: string;
  shortDescKo: string | null;
  shortDescEn: string | null;
  visible: boolean;
  backgroundDesc: string;
  backgroundDescKo: string | null;
  backgroundDescEn: string | null;
  language: LanguageNode | null;
  submitted: boolean;
  accepted: boolean;
  place: CreateOrUpdatePresentation_createOrUpdatePresentation_presentation_place | null;
  duration: DurationNode | null;
  startedAt: any | null;
  finishedAt: any | null;
  category: CreateOrUpdatePresentation_createOrUpdatePresentation_presentation_category | null;
  difficulty: CreateOrUpdatePresentation_createOrUpdatePresentation_presentation_difficulty | null;
  slideUrl: string;
  pdfUrl: string;
  videoUrl: string;
  recordable: boolean;
  isPresentedBefore: boolean;
  placePresentedBefore: string;
  presentedSlideUrlBefore: string;
  question: string;
  createdAt: any;
  updatedAt: any;
}

export interface CreateOrUpdatePresentation_createOrUpdatePresentation {
  __typename: "CreateOrUpdatePresentation";
  presentation: CreateOrUpdatePresentation_createOrUpdatePresentation_presentation | null;
}

export interface CreateOrUpdatePresentation {
  createOrUpdatePresentation: CreateOrUpdatePresentation_createOrUpdatePresentation | null;
}

export interface CreateOrUpdatePresentationVariables {
  presentationInput: PresentationInput;
}
