/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getProfile
// ====================================================

export interface getProfile_profile {
  __typename: "ProfileNode";
  nameKo: string | null;
  nameEn: string | null;
  bioKo: string | null;
  bioEn: string | null;
  email: string;
  phone: string;
  organization: string;
  nationality: string;
}

export interface getProfile {
  profile: getProfile_profile | null;
}
