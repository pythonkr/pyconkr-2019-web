/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TicketStatus, TicketTypeNode } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMyTickets
// ====================================================

export interface getMyTickets_myTickets_product_owner_profile {
  __typename: "ProfileNode";
  name: string;
  nameKo: string | null;
  nameEn: string | null;
  email: string;
  image: any | null;
  avatarUrl: string;
}

export interface getMyTickets_myTickets_product_owner {
  __typename: "UserNode";
  profile: getMyTickets_myTickets_product_owner_profile | null;
}

export interface getMyTickets_myTickets_product {
  __typename: "TicketProductNode";
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
  owner: getMyTickets_myTickets_product_owner | null;
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
  /**
   * 로그인 했을 때에는 이 값에 구매한 티켓 개수가 들어갑니다.
   */
  purchaseCount: number | null;
}

export interface getMyTickets_myTickets {
  __typename: "TicketNode";
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
  product: getMyTickets_myTickets_product;
  options: any;
}

export interface getMyTickets {
  myTickets: (getMyTickets_myTickets | null)[] | null;
}
