import {
  UploadLogoVector,
  UploadLogoVector_uploadLogoVector,
  UploadLogoVectorVariables,
} from 'lib/apollo_graphql/__generated__/UploadLogoVector'
import {
  createMutationDefinition,
  sendMutation,
} from './__base__'
import * as _uploadLogoVector from './_uploadLogoVector.graphql'

export const uploadLogoVectorMutationDefinition = createMutationDefinition<
  UploadLogoVector,
  UploadLogoVectorVariables
>(_uploadLogoVector)

export const uploadLogoVector = sendMutation(
  uploadLogoVectorMutationDefinition,
)

export {
  UploadLogoVector_uploadLogoVector,
}
