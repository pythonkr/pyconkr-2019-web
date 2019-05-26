/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TicketStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: cancelTicket
// ====================================================

export interface cancelTicket_cancelTicket_ticket {
  __typename: "TicketNode";
  /**
   * The ID of the object.
   */
  id: string;
  cancelledAt: any | null;
  status: TicketStatus;
  /**
   * 결재 취소 영수증 URL입니다. 이 값은 카드 결제 취소 내역을 보여줄 때에 사용됩니다.
   */
  cancelReceiptUrl: string;
}

export interface cancelTicket_cancelTicket {
  __typename: "CancelTicket";
  ticket: cancelTicket_cancelTicket_ticket | null;
}

export interface cancelTicket {
  cancelTicket: cancelTicket_cancelTicket | null;
}

export interface cancelTicketVariables {
  ticketId: string;
}
