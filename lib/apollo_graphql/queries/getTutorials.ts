import {
  getTutorials as getTutorialsType,
  getTutorials_tutorials as TutorialNode,
  getTutorials_tutorials_owner as UserNode,
  getTutorials_tutorials_place as PlaceNode,
} from 'lib/apollo_graphql/__generated__/getTutorials'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getTutorials from './_getTutorials.graphql'

export const getTutorialsQueryDefinition = createQueryDefinition<
  getTutorialsType,
  {}
>(_getTutorials)

export const getTutorials = sendQuery(
  getTutorialsQueryDefinition,
)

export {
  TutorialNode,
  PlaceNode,
  UserNode,
}
