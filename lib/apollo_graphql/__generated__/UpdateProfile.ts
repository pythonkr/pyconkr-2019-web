/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProfileInput, OauthTypeNode } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateProfile
// ====================================================

export interface UpdateProfile_updateProfile_profile {
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

export interface UpdateProfile_updateProfile {
  __typename: "UpdateProfile";
  profile: UpdateProfile_updateProfile_profile | null;
}

export interface UpdateProfile {
  updateProfile: UpdateProfile_updateProfile | null;
}

export interface UpdateProfileVariables {
  data: ProfileInput;
}
