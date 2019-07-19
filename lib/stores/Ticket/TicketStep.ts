import { TicketTypeNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import _ from 'lodash'
import { action, configure, observable } from 'mobx'

export enum VALIDATION_ERROR_TYPE {
  NONE = 'NONE',
  NOT_AGREED_TO_OPTIONS = 'NOT_AGREED_TO_OPTIONS',
  NOT_AGREED_TO_TERMS = 'NOT_AGREED_TO_TERMS',
  NO_OPTION_SELECTED = 'NO_OPTIONS_SELECTED'
}

export enum TICKET_STEP {
  AGREE_TERMS = 'AGREE_TERMS',
  SELECT_OPTION = 'SELECT_OPTION',
  PAYING = 'PAYING',
  BUYING = 'BUYING',
}

export type TicketOptionType = {
  tshirtsize?: string;
  childName?: string;
  childcareBirthDate?: string;
  isRequireParkingDiscount?: boolean;
  note?: string;
  youngCoderName?: string;
  youngCoderBirthDate?: string;
}

configure({ enforceActions: 'observed' })
export class TicketStep {
  @observable ticketId: string = ''
  @observable ticketTitle: string | null = ''
  @observable ticketStepState: TICKET_STEP = TICKET_STEP.BUYING
  @observable ticketOption: TicketOptionType | null = null
  @observable isTicketOptionAgreed: boolean = false
  @observable isTermsAgreed: boolean = false

  @action
  setTicketId = (id: string) => {
    this.ticketId = id
  }

  @action
  setTicketTitle = (title: string | null) => {
    this.ticketTitle = title
  }

  @action
  setTicketStepState = (step: TICKET_STEP) => {
    this.ticketStepState = step
  }

  @action
  setTicketOption = (newTicketOption: TicketOptionType | null) => {
    this.ticketOption = {
      ...this.ticketOption,
      ...newTicketOption,
    }
  }

  @action
  setTicketOptionAgreed = (isAgree: boolean) => {
    this.isTicketOptionAgreed = isAgree
  }

  @action
  setTicketTermsAgreed = (isAgree: boolean) => {
    this.isTermsAgreed = isAgree
  }

  @action
  validateTicket = (ticketType: TicketTypeNode) => {
    if (ticketType === TicketTypeNode.CONFERENCE) {
      if (!this.ticketOption || _.isEmpty(this.ticketOption.tshirtsize)) return VALIDATION_ERROR_TYPE.NO_OPTION_SELECTED
    }

    if (ticketType === TicketTypeNode.CHILD_CARE) {
      if (
        !this.ticketOption ||
        _.isEmpty(this.ticketOption.childName) ||
        _.isEmpty(this.ticketOption.childcareBirthDate) ||
        _.isUndefined(this.ticketOption.isRequireParkingDiscount)
      ) {
        return VALIDATION_ERROR_TYPE.NO_OPTION_SELECTED
      }
    }

    if (ticketType === TicketTypeNode.YOUNG_CODER) {
      if (
        !this.ticketOption ||
        _.isEmpty(this.ticketOption.youngCoderName) ||
        _.isEmpty(this.ticketOption.youngCoderBirthDate)
      ) {
        return VALIDATION_ERROR_TYPE.NO_OPTION_SELECTED
      }
    }

    if (!this.isTicketOptionAgreed) {
      return VALIDATION_ERROR_TYPE.NOT_AGREED_TO_OPTIONS
    }

    return VALIDATION_ERROR_TYPE.NONE
  }

  initConferenceTicketOptions = () => {
    this.setTicketOption(null)
    this.setTicketOptionAgreed(false)
    this.setTicketTermsAgreed(false)
    this.setTicketStepState(TICKET_STEP.BUYING)
  }
}
