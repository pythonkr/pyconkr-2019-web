import {
  getMyTickets as MyTicketsType,
  getMyTickets_myTickets as TicketNode,
} from 'lib/apollo_graphql/__generated__/getMyTickets'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getMyTickets from './_getMyTickets.graphql'

export const getMyTicketsQueryDefinition = createQueryDefinition<
  MyTicketsType,
  {}
>(_getMyTickets)

export const getMyTickets = sendQuery(
  getMyTicketsQueryDefinition,
)

export {
  TicketNode,
  MyTicketsType,
}
