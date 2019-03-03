/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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
  nameKo: string;
  nameEn?: string | null;
  descKo?: string | null;
  descEn?: string | null;
  language?: LanguageNode | null;
  submitted?: boolean | null;
  slideUrl?: string | null;
  pdfUrl?: string | null;
  videoUrl?: string | null;
  recordable?: boolean | null;
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
