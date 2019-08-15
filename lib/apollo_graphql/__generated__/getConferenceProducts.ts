/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TicketTypeNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getConferenceProducts
// ====================================================

export interface getConferenceProducts_conferenceProducts_owner_profile {
  __typename: "ProfileNode";
  name: string;
  email: string | null;
  image: string | null;
  avatarUrl: string;
}

export interface getConferenceProducts_conferenceProducts_owner {
  __typename: "UserNode";
  profile: getConferenceProducts_conferenceProducts_owner_profile | null;
}

export interface getConferenceProducts_conferenceProducts {
  __typename: "TicketProductNode";
  id: string;
  type: TicketTypeNode | null;
  name: string;
  desc: string;
  warning: string;
  /**
   * 행사가 시작되는 일시입니다.
   */
  startAt: any | null;
  /**
   * 행사가 종료되는 일시입니다.
   */
  finishAt: any | null;
  /**
   * 판매할 티켓의 총 개수입니다.
   */
  total: number;
  /**
   * 해당 제품에 남아있는 티켓 개수입니다.
   */
  remainingCount: number | null;
  /**
   * True면 매진, False면 판매중 입니다.
   */
  isSoldOut: boolean | null;
  owner: getConferenceProducts_conferenceProducts_owner | null;
  price: number;
  /**
   * 개인후원과 같이 가격을 상향조정할 수 있는지 여부를 나타냅니다.
   */
  isEditablePrice: boolean;
  /**
   * 같은 타입간에 하나만 구매가 가능한지 여부를 나타냅니다. 대표적으로 컨퍼런스티켓이 이에 해당합니다.
   */
  isUniqueInType: boolean;
  /**
   * 해당 티켓 판매가 활성화되었는지를 저장합니다. True이면 사용자에게 노출됩니다.
   */
  active: boolean;
  /**
   * 결제 취소가 가능한 기한입니다. 이 일시 이후에는 취소가 불가합니다.
   */
  cancelableDate: any | null;
  /**
   * 티켓 판매 시작 일시입니다.
   */
  ticketOpenAt: any | null;
  /**
   * 티켓 판매 종료 일시입니다.
   */
  ticketCloseAt: any | null;
  createdAt: any;
  updatedAt: any;
  /**
   * 로그인 했을 때에는 이 값에 구매한 티켓 개수가 들어갑니다.
   */
  purchaseCount: number | null;
  /**
   * True면 유저가 티켓을 구매할 수 있습니다. 컨퍼런스와 같이 티켓이 여러 종류로 판매되는 경우 하나라도 구매했으면 False가 반환됩니다.아이돌봄이나 영코더는 참가자 1인당 하루 2매까지만 구매가 가능합니다
   */
  available: boolean | null;
}

export interface getConferenceProducts {
  conferenceProducts: (getConferenceProducts_conferenceProducts | null)[] | null;
}
