/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum DurationNode {
  LONG = "LONG",
  SHORT = "SHORT",
}

export enum LanguageNode {
  ENGLISH = "ENGLISH",
  KOREAN = "KOREAN",
}

export enum OauthTypeNode {
  FACEBOOK = "FACEBOOK",
  GITHUB = "GITHUB",
  GOOGLE = "GOOGLE",
  NAVER = "NAVER",
}

export interface PresentationInput {
  id?: string | null;
  name: string;
  nameKo?: string | null;
  nameEn?: string | null;
  desc?: string | null;
  descKo?: string | null;
  descEn?: string | null;
  shortDesc?: string | null;
  shortDescKo?: string | null;
  shortDescEn?: string | null;
  backgroundDesc?: string | null;
  backgroundDescKo?: string | null;
  backgroundDescEn?: string | null;
  language?: LanguageNode | null;
  submitted?: boolean | null;
  duration?: DurationNode | null;
  categoryId?: number | null;
  difficultyId?: number | null;
  slideUrl?: string | null;
  pdfUrl?: string | null;
  videoUrl?: string | null;
  recordable?: boolean | null;
  isPresentedBefore?: boolean | null;
  placePresentedBefore?: string | null;
  presentedSlideUrlBefore?: string | null;
  question?: string | null;
}

export interface ProfileInput {
  name?: string | null;
  nameKo?: string | null;
  nameEn?: string | null;
  bio?: string | null;
  bioKo?: string | null;
  bioEn?: string | null;
  phone?: string | null;
  email?: any | null;
  organization?: string | null;
  nationality?: string | null;
  signature?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
