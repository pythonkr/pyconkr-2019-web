import { PaymentInput, TicketStatus, TicketTypeNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { client } from 'lib/apollo_graphql/client'
import { buyTicket } from 'lib/apollo_graphql/mutations/buyTicket'
import { cancelTicket } from 'lib/apollo_graphql/mutations/cancelTicket'
import { ConferenceProductType, getConferenceProducts } from 'lib/apollo_graphql/queries/getConferenceProducts'
import { getMyTicket, MyTicketNode } from 'lib/apollo_graphql/queries/getMyTicket'
import { getMyTickets, TicketNode } from 'lib/apollo_graphql/queries/getMyTickets'
import * as _ from 'lodash'
import { action, configure, observable, toJS } from 'mobx'
import { TicketStep } from './TicketStep';

configure({ enforceActions: 'observed' })

export enum VALIDATION_ERROR_TYPE {
    NONE = 'NONE',
    NOT_AGREED_TO_OPTIONS = 'NOT_AGREED_TO_OPTIONS',
    NOT_AGREED_TO_TERMS = 'NOT_AGREED_TO_TERMS',
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
    @observable isSubmitPayment: boolean = false
    @observable payingTicketTitle: string | null = ''
    @observable price: number = 0
    @observable options: string = ''
    @observable productId: string = ''
    @observable expiryMonth: string = ''
    @observable expiryYear: string = ''
    @observable ticketInput: PaymentInput = initialTicketInput
    @observable myTickets: TicketNode[] = []
    @observable currentTicket: MyTicketNode | null = null

    @observable ticketSteps: Map<string, TicketStep> = new Map([])

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

    @action
    setIsSubmitPayment = (isSubmitPayment: boolean) => {
      this.isSubmitPayment = isSubmitPayment
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
    setPayingTicket = (ticketStep: TicketStep) => {
      this.isPaying = true
      this.productId = ticketStep.ticketId
      this.payingTicketTitle = ticketStep.ticketTitle
      this.options = JSON.stringify(ticketStep.ticketOption)
    }

    @action
    setTicketStep = (id: string, title: string | null) => {
      const newTicketStep = new TicketStep()
      newTicketStep.setTicketId(id)
      newTicketStep.setTicketTitle(title || '')
      this.ticketSteps.set(newTicketStep.ticketId, newTicketStep)
    }

    @action
    getTicketStep = (id: string) => {
      return this.ticketSteps.get(id)
    }

    @action
    getIsTicketStepExist = (id: string) => {
      return !!this.getTicketStep(id)
    }

    @action
    payTicket = async () => {
      try {
        this.setIsSubmitPayment(true)
        this.setExpiry()
        this.ticketInput.amount = this.price

        return await buyTicket(client)({
          options: this.options,
          payment: toJS(this.ticketInput),
          productId: this.productId
        })
      } catch (err) {
        this.setIsSubmitPayment(false)

        return err
      }
    }

    @action
    cancelTicket = async (ticketId: any) => {
      try{
        const data = await cancelTicket(client)({
          ticketId
        }) 
        this.retrieveMyTickets()
        return data
      } catch (err) {
        return err
      }
    }
}

export default new TicketStore()
