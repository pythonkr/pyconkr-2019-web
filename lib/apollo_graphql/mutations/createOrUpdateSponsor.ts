import {
  CreateOrUpdateSponsor as CreateOrUpdateSponsorNode,
  CreateOrUpdateSponsor_createOrUpdateSponsor,
  CreateOrUpdateSponsorVariables,
  CreateOrUpdateSponsor_createOrUpdateSponsor_sponsor as SponsorNode
} from "lib/apollo_graphql/__generated__/CreateOrUpdateSponsor";
import { createMutationDefinition, sendMutation } from "./__base__";
import * as _createOrUpdateSponsor from "./_createOrUpdateSponsor.graphql";

export const createOrUpdateSponsorMutationDefinition = createMutationDefinition<
  CreateOrUpdateSponsor_createOrUpdateSponsor,
  CreateOrUpdateSponsorVariables
>(_createOrUpdateSponsor);

export const createOrUpdateSponsor = sendMutation(
  createOrUpdateSponsorMutationDefinition
);

export { 
  CreateOrUpdateSponsorNode,
  SponsorNode
};
