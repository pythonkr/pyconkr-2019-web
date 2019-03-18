import {
  CreateOrUpdatePresentationProposal,
  CreateOrUpdatePresentationProposal_createOrUpdatePresentationProposal,
  CreateOrUpdatePresentationProposalVariables,
  CreateOrUpdatePresentationProposal_createOrUpdatePresentationProposal_proposal as PresentationProposalNode
} from "lib/apollo_graphql/__generated__/CreateOrUpdatePresentationProposal";
import { createMutationDefinition, sendMutation } from "../mutations/__base__";
import * as _createOrUpdatePresentationProposal from "./_createOrUpdatePresentationProposal.graphql";

export const createOrUpdatePresentationProposalMutationDefinition = createMutationDefinition<
  CreateOrUpdatePresentationProposal_createOrUpdatePresentationProposal,
  CreateOrUpdatePresentationProposalVariables
>(_createOrUpdatePresentationProposal);

export const createOrUpdatePresentationProposal = sendMutation(
  createOrUpdatePresentationProposalMutationDefinition
);

export { 
  CreateOrUpdatePresentationProposal,
  PresentationProposalNode 
};
