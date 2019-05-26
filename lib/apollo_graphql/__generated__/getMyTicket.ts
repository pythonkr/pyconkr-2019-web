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
  nameKo: string | null;
  nameEn: string | null;
}

export interface getMyTicket_myTicket {
  __typename: "TicketNode";
  /**
   * The ID of the object.
   */
  id: string;
  isDomesticCard: boolean;
  /**
   * 아이엠포트를 통해 결재한 가격입니다.
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
   * 결재 영수증 URL입니다. 이 값은 카드 결제 내역을 보여줄 때에 사용됩니다.
   */
  receiptUrl: string | null;
  paidAt: any | null;
  /**
   * 결재 취소 영수증 URL입니다. 이 값은 카드 결제 취소 내역을 보여줄 때에 사용됩니다.
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
