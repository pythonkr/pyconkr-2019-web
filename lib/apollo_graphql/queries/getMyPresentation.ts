import {
  getMyPresentation as getMyPresentationType,
  getMyPresentation_myPresentation as PresentationType
} from "lib/apollo_graphql/__generated__/getMyPresentation";
import { createQueryDefinition, sendQuery } from "./__base__";
import * as _getMyPresentation from "./_getMyPresentation.graphql";

export const getMyPresentationQueryDefinition = createQueryDefinition<
  getMyPresentationType,
  {}
>(_getMyPresentation);

export const getMyPresentation = sendQuery(getMyPresentationQueryDefinition);

export { PresentationType };
