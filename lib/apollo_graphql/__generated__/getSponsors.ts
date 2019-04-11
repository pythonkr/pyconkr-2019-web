/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSponsors
// ====================================================

export interface getSponsors_sponsors {
  __typename: "SponsorNode";
  id: string;
  /**
   * 후원사 이름입니다. 서비스나 회사 이름이 될 수 있습니다.
   */
  name: string | null;
  /**
   * 후원사 이름입니다. 서비스나 회사 이름이 될 수 있습니다.
   */
  nameKo: string | null;
  /**
   * 후원사 설명입니다. 이 설명은 홈페이지에 게시됩니다.
   */
  desc: string | null;
}

export interface getSponsors {
  sponsors: (getSponsors_sponsors | null)[] | null;
}
