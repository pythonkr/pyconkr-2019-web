import {
  getSponsor as getSponsorType,
  getSponsor_sponsor as PublicSponsorNode,
} from 'lib/apollo_graphql/__generated__/getSponsor'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getSponsor from './_getSponsor.graphql'

export const getSponsorQueryDefinition = createQueryDefinition<
  getSponsorType,
  {}
>(_getSponsor)

export const getSponsor = sendQuery(
  getSponsorQueryDefinition,
)

export {
  PublicSponsorNode,
}
