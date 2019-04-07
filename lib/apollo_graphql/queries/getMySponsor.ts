import {
    getMySponsor as getMySponsorType,
    getMySponsor_mySponsor as SponsorNode,
  } from 'lib/apollo_graphql/__generated__/getMySponsor'
import {
    createQueryDefinition,
    sendQuery,
  } from './__base__'
import * as _getMySponsor from './_getMySponsor.graphql'

export const getMySponsorQueryDefinition = createQueryDefinition<
    getMySponsorType,
    {}
>(_getMySponsor)

export const getMySponsor = sendQuery(
    getMySponsorQueryDefinition,
)

export {
  SponsorNode,
}
