/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OauthTypeNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getProfile
// ====================================================

export interface getProfile_profile {
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

export interface getProfile {
  profile: getProfile_profile | null;
}
