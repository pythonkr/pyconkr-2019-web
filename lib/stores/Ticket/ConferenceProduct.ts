// tslint:disable: no-reserved-keywords
import { TicketTypeNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { ConferenceProductType } from 'lib/apollo_graphql/queries/getConferenceProducts'
import * as _ from 'lodash'
import { configure, observable } from 'mobx'

configure({ enforceActions: 'observed' })

export class ConferenceProduct implements ConferenceProductType {
  __typename: 'TicketProductNode' = 'TicketProductNode'
  @observable id!: string
  @observable type: TicketTypeNode | null = null
  @observable name: string | null = ''
  @observable nameKo: string | null = null
  @observable nameEn: string | null = null
  @observable desc: string = ''
  @observable descKo: string | null = null
  @observable descEn: string | null = null
  @observable warning: string = ''
  @observable warningKo: string | null = null
  @observable warningEn: string | null = null
  @observable startAt: any
  @observable finishAt: any
  @observable total: number = 0
  @observable price: number = 0
  @observable isEditablePrice: boolean = false
  @observable isUniqueInType: boolean = false
  @observable active: boolean = false
  @observable cancelableDate: any
  @observable ticketOpenAt: any
  @observable ticketCloseAt: any
  @observable createdAt: any
  @observable updatedAt: any
  @observable purchaseCount: number | null = null
  @observable remainingCount: number | null = null;
  @observable isSoldOut: boolean | null = null;
}
