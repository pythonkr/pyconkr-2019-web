import {
  UpdateAgreement,
  UpdateAgreement_updateAgreement,
  UpdateAgreementVariables,
} from 'lib/apollo_graphql/__generated__/UpdateAgreement'
import {
  createMutationDefinition,
  sendMutation,
} from '../mutations/__base__'
import * as _updateAgreement from './_updateAgreement.graphql'

export const updateAgreementMutationDefinition = createMutationDefinition<
  UpdateAgreement,
  UpdateAgreementVariables
>(_updateAgreement)

export const updateAgreement = sendMutation(
  updateAgreementMutationDefinition,
)

export {
  UpdateAgreement_updateAgreement,
}
