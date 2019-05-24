import {
  buyTicket_buyTicket_ticket as TicketNode,
  buyTicketVariables as buyTicketVariablesType
} from 'lib/apollo_graphql/__generated__/buyTicket'
import {
  createMutationDefinition,
  sendMutation,
} from '../mutations/__base__'
import * as _buyTicket from './_buyTicket.graphql'

export const buyTicketMutationDefinition = createMutationDefinition<
  TicketNode,
  buyTicketVariablesType
>(_buyTicket)

export const buyTicket = sendMutation(
  buyTicketMutationDefinition,
)

export {
  TicketNode
}
