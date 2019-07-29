import {
  getPresentations as getPresentationsType,
  getPresentations_presentations as PresentationNode,
  getPresentations_presentations_owner as UserNode,
  getPresentations_presentations_place as PlaceNode,
} from 'lib/apollo_graphql/__generated__/getPresentations'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getPresentations from './_getPresentations.graphql'

export const getPresentationsQueryDefinition = createQueryDefinition<
  getPresentationsType,
  {}
>(_getPresentations)

export const getPresentations = sendQuery(
  getPresentationsQueryDefinition,
)

export {
  PresentationNode,
  PlaceNode,
  UserNode,
}
