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

/**
 * An enumeration.
 */
export enum TicketStatus {
  CANCELLED = "CANCELLED",
  ERROR = "ERROR",
  PAID = "PAID",
  READY = "READY",
}

export enum TicketTypeNode {
  BABY_CARE = "BABY_CARE",
  CONFERENCE = "CONFERENCE",
  HEALTH_CARE = "HEALTH_CARE",
  SPRINT = "SPRINT",
  TUTORIAL = "TUTORIAL",
  YOUNG_CODER = "YOUNG_CODER",
}

export interface PaymentInput {
  isDomesticCard: boolean;
  amount?: number | null;
  cardNumber: string;
  expiry: string;
  birth?: string | null;
  pwd2digit?: string | null;
  buyerEmail?: string | null;
  buyerName?: string | null;
  buyerTel?: string | null;
}

export interface PresentationProposalInput {
  name?: string | null;
  desc?: string | null;
  categoryId?: string | null;
  difficultyId?: string | null;
  backgroundDesc?: string | null;
  language?: LanguageNode | null;
  duration?: DurationNode | null;
  submitted?: boolean | null;
  detailDesc?: string | null;
  isPresentedBefore?: boolean | null;
  placePresentedBefore?: string | null;
  presentedSlideUrlBefore?: string | null;
  comment?: string | null;
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

export interface ReviewInput {
  id?: string | null;
  comment?: string | null;
}

export interface SponsorInput {
  nameKo?: string | null;
  nameEn?: string | null;
  managerName?: string | null;
  managerEmail?: string | null;
  levelId?: number | null;
  businessRegistrationNumber?: string | null;
  url?: string | null;
  descKo?: string | null;
  descEn?: string | null;
  submitted?: boolean | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
