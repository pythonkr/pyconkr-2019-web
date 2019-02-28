/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSponsors
// ====================================================

export interface getSponsors_sponsors {
  __typename: "SponsorNode";
  id: string;
  name: string | null;
  nameKo: string | null;
  desc: string | null;
}

export interface getSponsors {
  sponsors: (getSponsors_sponsors | null)[] | null;
}
