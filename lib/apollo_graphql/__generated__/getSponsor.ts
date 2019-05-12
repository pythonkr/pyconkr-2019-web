/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSponsor
// ====================================================

export interface getSponsor_sponsor_level {
  __typename: "SponsorLevelNode";
  id: string;
  name: string;
}

export interface getSponsor_sponsor {
  __typename: "PublicSponsorNode";
  /**
   * The ID of the object.
   */
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
   * 후원사 이름입니다. 서비스나 회사 이름이 될 수 있습니다.
   */
  nameEn: string | null;
  level: getSponsor_sponsor_level | null;
  /**
   * 후원사 설명입니다. 이 설명은 홈페이지에 게시됩니다.
   */
  desc: string | null;
  /**
   * 후원사 설명입니다. 이 설명은 홈페이지에 게시됩니다.
   */
  descKo: string | null;
  /**
   * 후원사 설명입니다. 이 설명은 홈페이지에 게시됩니다.
   */
  descEn: string | null;
  /**
   * 후원사 홈페이지 주소입니다. 파이콘 홈페이지에 공개됩니다.
   */
  url: string | null;
  logoImage: any | null;
  logoVector: any | null;
}

export interface getSponsor {
  /**
   * The ID of the object
   */
  sponsor: getSponsor_sponsor | null;
}

export interface getSponsorVariables {
  id: string;
}
