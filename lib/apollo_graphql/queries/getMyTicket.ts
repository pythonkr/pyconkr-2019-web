import {
    getMyTicket as getMyTicketType,
    getMyTicket_myTicket as TicketNode,
  } from 'lib/apollo_graphql/__generated__/getMyTicket'
import {
    createQueryDefinition,
    sendQuery,
  } from './__base__'
import * as _getMyTicket from './_getMyTicket.graphql'

export const getMyTicketQueryDefinition = createQueryDefinition<
  getMyTicketType,
  {}
>(_getMyTicket)

export const getMyTicket = sendQuery(
  getMyTicketQueryDefinition,
)

export {
  TicketNode,
}
