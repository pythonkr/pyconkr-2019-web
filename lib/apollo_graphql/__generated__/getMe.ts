/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OauthTypeNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMe
// ====================================================

export interface getMe_me_profile {
  __typename: "ProfileNode";
  id: string;
  oauthType: OauthTypeNode | null;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  bio: string;
  bioKo: string | null;
  bioEn: string | null;
  email: string;
  phone: string;
  organization: string;
  nationality: string;
  image: any | null;
  avatarUrl: string;
}

export interface getMe_me {
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
  profile: getMe_me_profile | null;
}

export interface getMe {
  me: getMe_me | null;
}
