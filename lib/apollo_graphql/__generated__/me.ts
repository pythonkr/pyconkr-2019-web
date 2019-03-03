/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me_profile {
  __typename: "ProfileNode";
  name: string | null;
  avatarUrl: string | null;
}

export interface me_me {
  __typename: "UserNode";
  /**
   * 150자 이하 문자, 숫자 그리고 @/./+/-/_만 가능합니다.
   */
  username: string;
  email: string;
  profile: me_me_profile | null;
}

export interface me {
  me: me_me | null;
}
