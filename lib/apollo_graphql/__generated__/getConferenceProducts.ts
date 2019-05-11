/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TicketTypeNode, OptionDescTypeNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getConferenceProducts
// ====================================================

export interface getConferenceProducts_conferenceProducts_optiondescSet {
  __typename: "OptionDescNode";
  id: string;
  type: OptionDescTypeNode | null;
  /**
   * ticket 판매시 노출되는 이름입니다
   */
  name: string;
  /**
   * ticket 판매시 노출되는 이름입니다
   */
  nameKo: string | null;
  /**
   * ticket 판매시 노출되는 이름입니다
   */
  nameEn: string | null;
  /**
   * ticket 판매시 노출되는 설명입니다
   */
  desc: string;
  /**
   * ticket 판매시 노출되는 설명입니다
   */
  descKo: string | null;
  /**
   * ticket 판매시 노출되는 설명입니다
   */
  descEn: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface getConferenceProducts_conferenceProducts {
  __typename: "TicketProductNode";
  /**
   * The ID of the object.
   */
  id: string;
  type: TicketTypeNode | null;
  name: string | null;
  nameKo: string | null;
  nameEn: string | null;
  desc: string;
  descKo: string | null;
  descEn: string | null;
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
   * 결재 취소가 가능한 기한입니다. 이 일시 이후에는 취소가 불가합니다.
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
  optiondescSet: (getConferenceProducts_conferenceProducts_optiondescSet | null)[] | null;
  /**
   * 로그인 했을 때에는 이 값에 구매한 티켓 개수가 들어갑니다.
   */
  purchaseCount: number | null;
}

export interface getConferenceProducts {
  conferenceProducts: (getConferenceProducts_conferenceProducts | null)[] | null;
}
