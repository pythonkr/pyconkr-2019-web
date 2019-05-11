import { client } from 'lib/apollo_graphql/client'
import { ConferenceProductType, getConferenceProducts } from 'lib/apollo_graphql/queries/getConferenceProducts'
import * as _ from 'lodash'
import { action, configure, observable } from 'mobx'

configure({ enforceActions: 'observed' })

export class TicketStore {
    @observable isInitialized: boolean = false
    @observable conferenceProducts: ConferenceProductType[] = []
    @observable earlyBirdTicketStep: number = 1
    @observable earlyBirdTicketOption: string | null = null
    @observable earlyBIrdTicketOptionAgreed: boolean = false

    @action
    async initialize() {
        if (this.isInitialized) return
        await this.retrieveConferenceProducts()
        this.isInitialized = true
    }

    @action
    setConferenceProducts = (conferenceProducts: ConferenceProductType[]) => {
        this.conferenceProducts = conferenceProducts
    }

    @action
    retrieveConferenceProducts = async () => {
        const { data } = await getConferenceProducts(client)({})
        this.setConferenceProducts(data.conferenceProducts as ConferenceProductType[])
    }

    @action
    setEarlyBirdTicketStep = (step: number) => {
        this.earlyBirdTicketStep = step
    }

    @action
    setEarlyBirdTicketOption = (ticketOption: string) => {
        this.earlyBirdTicketOption = ticketOption
    }

    @action
    setEarlyBirdTicketOptionAgreed = (isAgree: boolean) => {
        this.earlyBIrdTicketOptionAgreed = isAgree
    }
}

export default new TicketStore()
