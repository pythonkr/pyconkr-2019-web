import {
  cancelTicket_cancelTicket_ticket as TicketNode,
  cancelTicketVariables as cancelTicketVariablesType
} from 'lib/apollo_graphql/__generated__/cancelTicket'
import {
  createMutationDefinition,
  sendMutation,
} from './__base__'
import * as _cancelTicket from './_cancelTicket.graphql'

export const cancelTicketMutationDefinition = createMutationDefinition<
  TicketNode,
  cancelTicketVariablesType
>(_cancelTicket)

export const cancelTicket = sendMutation(
  cancelTicketMutationDefinition
)
