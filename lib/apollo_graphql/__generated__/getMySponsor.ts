/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMySponsor
// ====================================================

export interface getMySponsor_mySponsor_creator_profile {
  __typename: "ProfileNode";
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  email: string;
}

export interface getMySponsor_mySponsor_creator {
  __typename: "UserNode";
  profile: getMySponsor_mySponsor_creator_profile | null;
}

export interface getMySponsor_mySponsor_level {
  __typename: "SponsorLevelNode";
  id: string;
  name: string;
  price: number;
  /**
   * 후원사 등급 별 구좌수
   */
  limit: number;
  /**
   * 후원사에게 제공되는 티켓 수
   */
  ticketCount: number;
  /**
   * 후원사에게 제공되는 스폰서 발표 수
   */
  presentationCount: number;
  /**
   * 후원사에게 제공되는 부스 정보
   */
  boothInfo: string;
  /**
   * 프로그램 가이드에 후원사 소개가 수록되는 것에 대한 정보
   */
  programGuide: string;
  /**
   * 후원사 증정품을 파이콘 참가자에게 제공할 수 있는지 여부
   */
  canProvideGoods: boolean;
  /**
   * 로고가 노출되는 위치에 대한 설명입니다.
   */
  logoLocations: string | null;
  /**
   * 후원사 채용 공고를 할 수 있는지 여부
   */
  canRecruit: boolean;
}

export interface getMySponsor_mySponsor {
  __typename: "SponsorNode";
  id: string;
  creator: getMySponsor_mySponsor_creator | null;
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
  level: getMySponsor_mySponsor_level | null;
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
   * 후원사 담당자의 이름입니다.
   */
  managerName: string;
  /**
   * 후원사 담당자의 이메일 주소입니다.
   */
  managerEmail: string;
  /**
   * 후원사 사업자 등록번호입니다.
   */
  businessRegistrationNumber: string;
  businessRegistrationFile: any | null;
  /**
   * 후원사 홈페이지 주소입니다. 파이콘 홈페이지에 공개됩니다.
   */
  url: string | null;
  logoImage: any | null;
  logoVector: any | null;
  paidAt: any | null;
  /**
   * 사용자가 제출했는지 여부를 저장합니다..
   */
  submitted: boolean;
  /**
   * 파이콘 준비위원회의 검토 후 후원사의 후원을 받을지 여부를 결정합니다.
   */
  accepted: boolean;
}

export interface getMySponsor {
  mySponsor: getMySponsor_mySponsor | null;
}
