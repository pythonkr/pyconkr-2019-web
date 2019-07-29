/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TicketStatus, TicketTypeNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMyTickets
// ====================================================

export interface getMyTickets_myTickets_product {
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

export interface getMyTickets_myTickets {
  __typename: "TicketNode";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * 아이엠포트를 통해 결제한 가격입니다.
   */
  amount: number;
  paidAt: any | null;
  cancelledAt: any | null;
  status: TicketStatus;
  product: getMyTickets_myTickets_product;
  createdAt: any;
  updatedAt: any;
  options: any;
}

export interface getMyTickets {
  myTickets: (getMyTickets_myTickets | null)[] | null;
}
