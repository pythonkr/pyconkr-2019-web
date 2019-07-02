/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPatrons
// ====================================================

export interface getPatrons_patrons {
  __typename: "PatronNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  bio: string;
  bioKo: string | null;
  bioEn: string | null;
  organization: string;
  image: string | null;
  avatarUrl: string;
}

export interface getPatrons {
  patrons: (getPatrons_patrons | null)[] | null;
}
