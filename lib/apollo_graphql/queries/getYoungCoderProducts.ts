import {
  getYoungCoderProducts as YoungCoderProductsType,
  getYoungCoderProducts_youngCoderProducts as YoungCoderProductType,
} from 'lib/apollo_graphql/__generated__/getYoungCoderProducts'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getYoungCoderProducts from './_getYoungCoderProducts.graphql'

export const getYoungCoderProductsQueryDefinition = createQueryDefinition<
  YoungCoderProductsType,
  {}
>(_getYoungCoderProducts)

export const getYoungCoderProducts = sendQuery(
  getYoungCoderProductsQueryDefinition,
)

export {
  YoungCoderProductType,
  YoungCoderProductsType,
}
