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

configure({ enforceActions: 'observed' })
export class TicketStep {
  @observable ticketId: string = ''
  @observable ticketTitle: string | null = ''
  @observable ticketStepState: TICKET_STEP = TICKET_STEP.BUYING
  @observable ticketOption: { tshirtsize: string } | null = null
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
  setTicketOption = (ticketOption: { tshirtsize: string } | null) => {
    this.ticketOption = ticketOption
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
  validateTicket = () => {
    if (!this.ticketOption || _.isEmpty(this.ticketOption.tshirtsize)) return VALIDATION_ERROR_TYPE.NO_OPTION_SELECTED
    if (!this.isTicketOptionAgreed) return VALIDATION_ERROR_TYPE.NOT_AGREED_TO_OPTIONS

    return VALIDATION_ERROR_TYPE.NONE
  }

  initConferenceTicketOptions = () => {
    this.setTicketOption(null)
    this.setTicketOptionAgreed(false)
    this.setTicketTermsAgreed(false)
    this.setTicketStepState(TICKET_STEP.BUYING)
  }
}
