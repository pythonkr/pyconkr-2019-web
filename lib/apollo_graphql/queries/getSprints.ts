import {
  getSprints as getSprintsType,
  getSprints_sprints as SprintNode,
  getSprints_sprints_owner as UserNode,
  getSprints_sprints_place as PlaceNode,
} from 'lib/apollo_graphql/__generated__/getSprints'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getSprints from './_getSprints.graphql'

export const getSprintsQueryDefinition = createQueryDefinition<
  getSprintsType,
  {}
>(_getSprints)

export const getSprints = sendQuery(
  getSprintsQueryDefinition,
)

export {
  SprintNode,
  PlaceNode,
  UserNode,
}
