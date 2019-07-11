import {
  getTutorialProducts as TutorialProductsType,
  getTutorialProducts_tutorialProducts as TutorialProductType,
} from 'lib/apollo_graphql/__generated__/getTutorialProducts'
import {
  createQueryDefinition,
  sendQuery,
} from './__base__'
import * as _getTutorialProducts from './_getTutorialProducts.graphql'

export const getTutorialProductsQueryDefinition = createQueryDefinition<
  TutorialProductsType,
  {}
>(_getTutorialProducts)

export const getTutorialProducts = sendQuery(
  getTutorialProductsQueryDefinition,
)

export {
  TutorialProductType,
  TutorialProductsType,
}
