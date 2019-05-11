import {
  getConferenceProducts as ConferenceProductsType,
  getConferenceProducts_conferenceProducts as ConferenceProductType,
  getConferenceProducts_conferenceProducts_optiondescSet as ConferenceProductsOptionsType,
} from 'lib/apollo_graphql/__generated__/getConferenceProducts'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getConferenceProducts from './_getConferenceProducts.graphql'

export const getConferenceProductsQueryDefinition = createQueryDefinition<
ConferenceProductsType,
  {}
>(_getConferenceProducts)

export const getConferenceProducts = sendQuery(
  getConferenceProductsQueryDefinition,
)

export {
  ConferenceProductType,
  ConferenceProductsType,
  ConferenceProductsOptionsType
}
