import {
  getPatrons as PatronsType,
  getPatrons_patrons as PatronNode,
} from 'lib/apollo_graphql/__generated__/getPatrons'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getPatrons from './_getPatrons.graphql'

export const getPatronsQueryDefinition = createQueryDefinition<
  PatronsType,
  {}
>(_getPatrons)

export const getPatrons = sendQuery(
  getPatronsQueryDefinition,
)

export {
  PatronNode,
  PatronsType,
}
