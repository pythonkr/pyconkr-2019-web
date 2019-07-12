import {
  getSprintProducts as SprintProductsType,
  getSprintProducts_sprintProducts as SprintProductType,
} from 'lib/apollo_graphql/__generated__/getSprintProducts'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getSprintProducts from './_getSprintProducts.graphql'

export const getSprintProductsQueryDefinition = createQueryDefinition<
  SprintProductsType,
  {}
>(_getSprintProducts)

export const getSprintProducts = sendQuery(
  getSprintProductsQueryDefinition,
)

export {
  SprintProductsType,
  SprintProductType,
}
