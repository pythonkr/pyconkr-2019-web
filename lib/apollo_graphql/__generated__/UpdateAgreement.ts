/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OauthTypeNode } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateAgreement
// ====================================================

export interface UpdateAgreement_updateAgreement_user_profile {
  __typename: "ProfileNode";
  id: string;
  oauthType: OauthTypeNode | null;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  bio: string;
  bioKo: string | null;
  bioEn: string | null;
  email: string | null;
  phone: string | null;
  organization: string | null;
  nationality: string;
  image: string | null;
  avatarUrl: string;
}

export interface UpdateAgreement_updateAgreement_user {
  __typename: "UserNode";
  /**
   * 150자 이하 문자, 숫자 그리고 @/./+/-/_만 가능합니다.
   */
  username: string;
  /**
   * 사용자가 관리사이트에 로그인이 가능한지를 나타냅니다.
   */
  isStaff: boolean;
  /**
   * 해당 사용자에게 모든 권한을 허가합니다.
   */
  isSuperuser: boolean;
  isAgreed: boolean | null;
  profile: UpdateAgreement_updateAgreement_user_profile | null;
}

export interface UpdateAgreement_updateAgreement {
  __typename: "UpdateAgreement";
  isAgreedAll: boolean | null;
  user: UpdateAgreement_updateAgreement_user | null;
}

export interface UpdateAgreement {
  updateAgreement: UpdateAgreement_updateAgreement | null;
}

export interface UpdateAgreementVariables {
  isPrivacyPolicy?: boolean | null;
  isTermsOfService?: boolean | null;
}
