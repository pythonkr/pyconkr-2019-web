import {
  getMyPresentationProposal as getMyPresentationProposalType,
  getMyPresentationProposal_myPresentationProposal as PresentationProposalType
} from "lib/apollo_graphql/__generated__/getMyPresentationProposal";
import { createQueryDefinition, sendQuery } from "./__base__";
import * as _getMyPresentationProposal from "./_getMyPresentationProposal.graphql";

export const getMyPresentationProposalQueryDefinition = createQueryDefinition<
  getMyPresentationProposalType,
  {}
>(_getMyPresentationProposal);

export const getMyPresentationProposal = sendQuery(getMyPresentationProposalQueryDefinition);

export { PresentationProposalType };
