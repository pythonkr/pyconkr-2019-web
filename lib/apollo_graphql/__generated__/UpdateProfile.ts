/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateProfile
// ====================================================

export interface UpdateProfile_updateProfile_profile {
  __typename: "ProfileNode";
  nameKo: string | null;
  nameEn: string | null;
  bioKo: string | null;
  bioEn: string | null;
  phone: string;
  email: string;
  organization: string;
  nationality: string;
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
