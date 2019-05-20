/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSponsorLevels
// ====================================================

export interface getSponsorLevels_sponsorLevels {
  __typename: "SponsorLevelNode";
  id: string;
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  visible: boolean;
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
   * 열린 점심 정보, 제공되지 않을 경우 공백
   */
  openLunch: string;
  /**
   * 로고가 노출되는 위치에 대한 설명입니다.
   */
  logoLocations: string | null;
  /**
   * 후원사 채용 공고를 할 수 있는지 여부
   */
  canRecruit: boolean;
  currentRemainingNumber: number | null;
  paidCount: number | null;
  acceptedCount: number | null;
}

export interface getSponsorLevels {
  sponsorLevels: (getSponsorLevels_sponsorLevels | null)[] | null;
}
