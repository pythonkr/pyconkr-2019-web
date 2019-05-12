import {
  getSponsors as getSponsorsType,
  getSponsors_sponsors as PublicSponsorNode,
} from 'lib/apollo_graphql/__generated__/getSponsors'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getSponsors from './_getSponsors.graphql'

export const getSponsorsQueryDefinition = createQueryDefinition<
  getSponsorsType,
  {}
>(_getSponsors)

export const getSponsors = sendQuery(
  getSponsorsQueryDefinition,
)

export {
  PublicSponsorNode,
}
