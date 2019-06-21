import {
  getPresentation as getPresentationType,
  getPresentation_presentation as PublicPresentationNode,
} from 'lib/apollo_graphql/__generated__/getPresentation'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getPresentation from './_getPresentation.graphql'

export const getPresentationQueryDefinition = createQueryDefinition<
  getPresentationType,
  {}
>(_getPresentation)

export const getPresentation = sendQuery(
  getPresentationQueryDefinition,
)

export {
  PublicPresentationNode,
}
