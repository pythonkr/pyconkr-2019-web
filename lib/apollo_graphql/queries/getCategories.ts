import {
  getCategories as getCategoriesType,
  getCategories_categories as CategoryType,
} from 'lib/apollo_graphql/__generated__/getCategories'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getCategories from './_getCategories.graphql'

export const getCategoriesQueryDefinition = createQueryDefinition<
  CategoryType,
  {}
>(_getCategories)

export const getCategories = sendQuery(
  getCategoriesQueryDefinition,
)

export {
  CategoryType,
}
