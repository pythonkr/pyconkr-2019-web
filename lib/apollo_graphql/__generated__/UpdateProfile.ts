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
  email: string | null;
  phone: string | null;
  organization: string | null;
  nationality: string;
  image: string | null;
  avatarUrl: string;
  blogUrl: string;
  githubUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedInUrl: string;
  instagramUrl: string;
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
