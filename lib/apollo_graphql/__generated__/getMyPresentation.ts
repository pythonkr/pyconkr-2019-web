/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LanguageNode, DurationNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMyPresentation
// ====================================================

export interface getMyPresentation_myPresentation_owner_profile {
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

export interface getMyPresentation_myPresentation_owner {
  __typename: "UserNode";
  profile: getMyPresentation_myPresentation_owner_profile | null;
}

export interface getMyPresentation_myPresentation_place {
  __typename: "PlaceNode";
  name: string;
}

export interface getMyPresentation_myPresentation_category {
  __typename: "CategoryNode";
  id: string;
}

export interface getMyPresentation_myPresentation_difficulty {
  __typename: "DifficultyNode";
  id: string;
}

export interface getMyPresentation_myPresentation {
  __typename: "PresentationNode";
  id: string;
  owner: getMyPresentation_myPresentation_owner;
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
  place: getMyPresentation_myPresentation_place | null;
  duration: DurationNode | null;
  startedAt: any | null;
  finishedAt: any | null;
  category: getMyPresentation_myPresentation_category | null;
  difficulty: getMyPresentation_myPresentation_difficulty | null;
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

export interface getMyPresentation {
  myPresentation: getMyPresentation_myPresentation | null;
}
