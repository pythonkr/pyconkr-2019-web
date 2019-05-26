import { PaymentInput, TicketStatus, TicketTypeNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { client } from 'lib/apollo_graphql/client'
import { buyTicket } from 'lib/apollo_graphql/mutations/buyTicket'
import { ConferenceProductType, getConferenceProducts } from 'lib/apollo_graphql/queries/getConferenceProducts'
import { getMyTicket, MyTicketNode } from 'lib/apollo_graphql/queries/getMyTicket'
import { getMyTickets, TicketNode } from 'lib/apollo_graphql/queries/getMyTickets'
import * as _ from 'lodash'
import { action, configure, observable, toJS } from 'mobx'

configure({ enforceActions: 'observed' })

export enum PAYMENT_TYPE_ENUM {
    EARLYBIRD = 'EARLYBIRD',
    GENERAL = 'GENERAL',
    PATRON = 'PATRON'
}

export enum VALIDATION_ERROR_TYPE {
    NONE = 'NONE',
    NOT_AGREED = 'NOT_AGREED',
    NO_OPTION_SELECTED = 'NO_OPTIONS_SELECTED'
}

export enum CREDITCARD_TYPE {
    DOMESTIC = 'DOMESTIC',
    FOREIGN = 'FOREIGN'
}

const initialTicketInput = {
  isDomesticCard: true,
  cardNumber: '',
  expiry: '',
  birth: '',
  pwd2digit: '',
  amount: 0,
  buyerEmail: '',
  buyerName: '',
  buyerTel: ''
}
export class TicketStore {
    @observable isInitialized: boolean = false
    @observable conferenceProducts: ConferenceProductType[] = []
    @observable isPaying: boolean = false
    @observable payingType: PAYMENT_TYPE_ENUM | null = null
    @observable price: number = 0
    @observable options: string = ''
    @observable productId: string = ''
    @observable earlyBirdTicketStep: number = 1
    @observable earlyBirdTicketOption: { ticketOption: any } | null = null
    @observable earlyBirdTicketOptionAgreed: boolean = false
    @observable patronTicketStep: number = 1
    @observable patronTicketOption: { ticketOption: any } | null = null
    @observable patronTicketOptionAgreed: boolean = false
    @observable expiryMonth: string = ''
    @observable expiryYear: string = ''
    @observable ticketInput: PaymentInput = initialTicketInput
    @observable myTickets: TicketNode[] = []
    @observable currentTicket: MyTicketNode | null = null

    // Getter, Setter
    @action
    getMyConferenceTickets = () => {
      return this.myTickets.filter(myTicket =>
        myTicket.status === TicketStatus.PAID &&
        myTicket.product.type === TicketTypeNode.CONFERENCE
      )
    }

    @action
    setConferenceProducts = (conferenceProducts: ConferenceProductType[]) => {
        this.conferenceProducts = conferenceProducts
    }

    @action
    setMyTickets = (myTickets: TicketNode[]) => {
        this.myTickets = myTickets
    }

    @action
    setCurrentTicket = (ticket: MyTicketNode) => {
        this.currentTicket = ticket
    }

    @action
    setEarlyBirdTicketStep = (step: number) => {
        this.earlyBirdTicketStep = step
    }

    @action
    setEarlyBirdTicketOption = (ticketOption: string | null) => {
        this.earlyBirdTicketOption = { ticketOption }
    }

    @action
    setEarlyBirdTicketOptionAgreed = (isAgree: boolean) => {
        this.earlyBirdTicketOptionAgreed = isAgree
    }

    @action
    setPatronTicketStep = (step: number) => {
        this.patronTicketStep = step
    }

    @action
    setPatronTicketOption = (ticketOption: string | null) => {
      this.patronTicketOption = { ticketOption }
    }

    @action
    setPatronTicketOptionAgreed = (isAgree: boolean) => {
      this.patronTicketOptionAgreed = isAgree
    }

    @action
    setPayingType = (payingType: PAYMENT_TYPE_ENUM) => {
        this.payingType = payingType
    }

    @action
    setIsDomesticCard = (isDomesticCard: boolean) => {
      this.ticketInput.isDomesticCard = isDomesticCard
    }

    @action
    setPrice = (price: number) => {
      this.price = price
    }

    @action
    setCardNumber = (cardNumber: string) => {
      this.ticketInput.cardNumber = cardNumber
    }

    @action
    setExpiry = () => {
      this.ticketInput.expiry = `20${this.expiryYear}-${this.expiryMonth}`
    }

    @action
    setExpiryMonth = (expiryMonth: string) => {
      this.expiryMonth = expiryMonth
    }

    @action
    setExpiryYear = (expiryYear: string) => {
      this.expiryYear = expiryYear
    }

    @action
    setBirth = (birth: string) => {
      this.ticketInput.birth = birth
    }

    @action
    setPwd2Digit = (pwd2Digit: string) => {
      this.ticketInput.pwd2digit = pwd2Digit
    }

    // Actions
    @action
    initialize = async () => {
        if (this.isInitialized) return
        await this.retrieveConferenceProducts()
        await this.retrieveMyTickets()
        this.isInitialized = true
    }

    @action
    cleanupPaymentInfo = () => {
      this.expiryMonth = ''
      this.expiryYear = ''
      this.ticketInput = initialTicketInput
    }

    cleanupConferenceTicketOptions = () => {
      this.setEarlyBirdTicketOption(null)
      this.setEarlyBirdTicketOptionAgreed(false)
      this.setEarlyBirdTicketStep(1)
      this.setPatronTicketOption(null)
      this.setPatronTicketOptionAgreed(false)
      this.setPatronTicketStep(1)
    }

    @action
    retrieveConferenceProducts = async () => {
      const { data } = await getConferenceProducts(client)({})
      if (data) this.setConferenceProducts(data.conferenceProducts as ConferenceProductType[])
    }

    @action
    retrieveMyTickets = async () => {
      const { data } = await getMyTickets(client)({})
      this.setMyTickets(data.myTickets as TicketNode[])
    }

    @action
    async retrieveMyTicket(id: string) {
      const { data } = await getMyTicket(client)({id})
      this.setCurrentTicket(data.myTicket as MyTicketNode)
    }

    @action
    validateEarlyBirdTicket = () => {
        if (!this.earlyBirdTicketOption || _.isEmpty(this.earlyBirdTicketOption.ticketOption)) return VALIDATION_ERROR_TYPE.NO_OPTION_SELECTED
        if (!this.earlyBirdTicketOptionAgreed) return VALIDATION_ERROR_TYPE.NOT_AGREED

        return VALIDATION_ERROR_TYPE.NONE
    }

    @action
    setEarlyBirdTicket = (productId: string) => {
      this.isPaying = true
      this.productId = productId
      this.payingType = PAYMENT_TYPE_ENUM.EARLYBIRD
      this.options = JSON.stringify(this.earlyBirdTicketOption)
    }

    @action
    validatePatronTicket = () => {
      if (!this.patronTicketOption || _.isEmpty(this.patronTicketOption.ticketOption)) return VALIDATION_ERROR_TYPE.NO_OPTION_SELECTED
      if (!this.patronTicketOptionAgreed) return VALIDATION_ERROR_TYPE.NOT_AGREED

      return VALIDATION_ERROR_TYPE.NONE
    }

    @action
    setPatronTicket = (productId: string) => {
      this.isPaying = true
      this.productId = productId
      this.payingType = PAYMENT_TYPE_ENUM.PATRON
      this.options = JSON.stringify(this.patronTicketOption)
    }

    @action
    payTicket = async () => {
      try {
        this.ticketInput.amount = this.price

        return await buyTicket(client)({
          options: this.options,
          payment: toJS(this.ticketInput),
          productId: this.productId
        })
      } catch (err) {
        return err
      }
    }
}

export default new TicketStore()
