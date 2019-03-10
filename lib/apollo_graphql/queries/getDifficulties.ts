import {
  getDifficulties as getDifficultiesType,
  getDifficulties_difficulties as DifficultyType,
} from 'lib/apollo_graphql/__generated__/getDifficulties'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getDifficulties from './_getDifficulties.graphql'

export const getDifficultiesQueryDefinition = createQueryDefinition<
  getDifficultiesType,
  {}
>(_getDifficulties)

export const getDifficulties = sendQuery(
  getDifficultiesQueryDefinition,
)

export {
  DifficultyType,
}
