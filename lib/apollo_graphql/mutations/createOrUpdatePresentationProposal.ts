import {
  createOrUpdatePresentationProposal,
  createOrUpdatePresentationProposal_createOrUpdatePresentationProposal,
  createOrUpdatePresentationProposal_createOrUpdatePresentationProposal_proposal as PresentationProposalNode,
  createOrUpdatePresentationProposalVariables
} from 'lib/apollo_graphql/__generated__/createOrUpdatePresentationProposal'
import { createMutationDefinition, sendMutation } from '../mutations/__base__'
import * as _createOrUpdatePresentationProposal from './_createOrUpdatePresentationProposal.graphql'

export const createOrUpdatePresentationProposalMutationDefinition = createMutationDefinition<
  createOrUpdatePresentationProposal_createOrUpdatePresentationProposal,
  createOrUpdatePresentationProposalVariables
>(_createOrUpdatePresentationProposal)

export const CreateOrUpdatePresentationProposal = sendMutation(
  createOrUpdatePresentationProposalMutationDefinition
)

export {
  createOrUpdatePresentationProposal,
  PresentationProposalNode
}
