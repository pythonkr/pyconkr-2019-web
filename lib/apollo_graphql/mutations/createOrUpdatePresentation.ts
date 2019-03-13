import {
  CreateOrUpdatePresentation,
  CreateOrUpdatePresentation_createOrUpdatePresentation,
  CreateOrUpdatePresentationVariables
} from "lib/apollo_graphql/__generated__/CreateOrUpdatePresentation";
import { createMutationDefinition, sendMutation } from "../mutations/__base__";
import * as _createOrUpdatePresentation from "./_createOrUpdatePresentation.graphql";

export const createOrUpdatePresentationMutationDefinition = createMutationDefinition<
  CreateOrUpdatePresentation,
  CreateOrUpdatePresentationVariables
>(_createOrUpdatePresentation);

export const createOrUpdatePresentation = sendMutation(
  createOrUpdatePresentationMutationDefinition
);

export { CreateOrUpdatePresentation_createOrUpdatePresentation };
