/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PresentationInput, LanguageNode } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePresentation
// ====================================================

export interface CreatePresentation_createPresentation_presentation_category {
  __typename: "CategoryNode";
  id: string;
}

export interface CreatePresentation_createPresentation_presentation_difficulty {
  __typename: "DifficultyNode";
  id: string;
}

export interface CreatePresentation_createPresentation_presentation {
  __typename: "PresentationNode";
  id: string;
  nameKo: string | null;
  nameEn: string | null;
  descKo: string | null;
  descEn: string | null;
  language: LanguageNode | null;
  submitted: boolean;
  slideUrl: string | null;
  pdfUrl: string | null;
  videoUrl: string | null;
  recordable: boolean;
  category: CreatePresentation_createPresentation_presentation_category | null;
  difficulty: CreatePresentation_createPresentation_presentation_difficulty | null;
}

export interface CreatePresentation_createPresentation {
  __typename: "CreatePresentation";
  presentation: CreatePresentation_createPresentation_presentation | null;
}

export interface CreatePresentation {
  createPresentation: CreatePresentation_createPresentation | null;
}

export interface CreatePresentationVariables {
  presentationInput: PresentationInput;
  categoryId?: number | null;
  difficultyId?: number | null;
}
