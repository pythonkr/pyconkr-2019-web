/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PaymentInput, TicketStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: buyTicket
// ====================================================

export interface buyTicket_buyTicket_ticket_owner {
  __typename: "UserNode";
  email: string;
  /**
   * 150자 이하 문자, 숫자 그리고 @/./+/-/_만 가능합니다.
   */
  username: string;
}

export interface buyTicket_buyTicket_ticket_product {
  __typename: "TicketProductNode";
  nameKo: string | null;
  nameEn: string | null;
}

export interface buyTicket_buyTicket_ticket {
  __typename: "TicketNode";
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
  owner: buyTicket_buyTicket_ticket_owner;
  product: buyTicket_buyTicket_ticket_product;
  options: any;
  createdAt: any;
  updatedAt: any;
}

export interface buyTicket_buyTicket {
  __typename: "BuyTicket";
  ticket: buyTicket_buyTicket_ticket | null;
}

export interface buyTicket {
  buyTicket: buyTicket_buyTicket | null;
}

export interface buyTicketVariables {
  options?: any | null;
  payment: PaymentInput;
  productId: string;
}
