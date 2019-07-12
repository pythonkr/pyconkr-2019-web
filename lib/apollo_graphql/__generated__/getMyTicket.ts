/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TicketStatus, TicketTypeNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMyTicket
// ====================================================

export interface getMyTicket_myTicket_product {
  __typename: "TicketProductNode";
  id: string;
  type: TicketTypeNode | null;
  name: string | null;
  desc: string;
  warning: string;
  /**
   * 같은 타입간에 하나만 구매가 가능한지 여부를 나타냅니다. 대표적으로 컨퍼런스티켓이 이에 해당합니다.
   */
  isUniqueInType: boolean;
  /**
   * 결제 취소가 가능한 기한입니다. 이 일시 이후에는 취소가 불가합니다.
   */
  cancelableDate: any | null;
  /**
   * 행사가 시작되는 일시입니다.
   */
  startAt: any | null;
  /**
   * 행사가 종료되는 일시입니다.
   */
  finishAt: any | null;
}

export interface getMyTicket_myTicket {
  __typename: "TicketNode";
  /**
   * The ID of the object.
   */
  id: string;
  isDomesticCard: boolean;
  /**
   * 아이엠포트를 통해 결제한 가격입니다.
   */
  amount: number;
  /**
   * 파이콘 한국에서 발행하는 주문번호입니다. 영수증에 출력됩니다.
   */
  merchantUid: string;
  /**
   * 아이엠포트 uid입니다. 이 값은 환불 시에 사용됩니다.
   */
  impUid: string | null;
  /**
   * PG사 Transaction ID입니다.
   */
  pgTid: string | null;
  /**
   * 결제 영수증 URL입니다. 이 값은 카드 결제 내역을 보여줄 때에 사용됩니다.
   */
  receiptUrl: string | null;
  paidAt: any | null;
  /**
   * 결제 취소 영수증 URL입니다. 이 값은 카드 결제 취소 내역을 보여줄 때에 사용됩니다.
   */
  cancelReceiptUrl: string;
  cancelledAt: any | null;
  status: TicketStatus;
  product: getMyTicket_myTicket_product;
  options: any;
  createdAt: any;
  updatedAt: any;
}

export interface getMyTicket {
  /**
   * The ID of the object
   */
  myTicket: getMyTicket_myTicket | null;
}

export interface getMyTicketVariables {
  id: string;
}
