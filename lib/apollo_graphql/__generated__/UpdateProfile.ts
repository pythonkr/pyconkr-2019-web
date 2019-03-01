/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateProfile
// ====================================================

export interface UpdateProfile_updateProfile_profile_user {
  __typename: "UserNode";
  /**
   * 150자 이하 문자, 숫자 그리고 @/./+/-/_만 가능합니다.
   */
  username: string;
  email: string;
}

export interface UpdateProfile_updateProfile_profile {
  __typename: "ProfileNode";
  user: UpdateProfile_updateProfile_profile_user;
  name: string;
  bio: string | null;
  phone: string | null;
  organization: string | null;
  nationality: string | null;
}

export interface UpdateProfile_updateProfile {
  __typename: "UpdateProfile";
  profile: UpdateProfile_updateProfile_profile | null;
}

export interface UpdateProfile {
  updateProfile: UpdateProfile_updateProfile | null;
}

export interface UpdateProfileVariables {
  profileInput: ProfileInput;
}
