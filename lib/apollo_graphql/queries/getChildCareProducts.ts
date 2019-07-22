import {
  getChildCareProducts as ChildCareProductsType,
  getChildCareProducts_childCareProducts as ChildCareProductType,
} from 'lib/apollo_graphql/__generated__/getChildCareProducts'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getChildCareProducts from './_getChildCareProducts.graphql'

export const getChildCareProductsQueryDefinition = createQueryDefinition<
  ChildCareProductsType,
  {}
>(_getChildCareProducts)

export const getChildCareProducts = sendQuery(
  getChildCareProductsQueryDefinition,
)

export {
  ChildCareProductType,
  ChildCareProductsType,
}
