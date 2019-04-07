import {
  getSponsorLevels as SponsorLevelsType,
  getSponsorLevels_sponsorLevels as SponsorLevelType,
} from 'lib/apollo_graphql/__generated__/getSponsorLevels'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getSponsorLevels from './_getSponsorLevels.graphql'

export const getSponsorLevelsQueryDefinition = createQueryDefinition<
SponsorLevelsType,
  {}
>(_getSponsorLevels)

export const getSponsorLevels = sendQuery(
  getSponsorLevelsQueryDefinition,
)

export {
  SponsorLevelType,
  SponsorLevelsType
}
