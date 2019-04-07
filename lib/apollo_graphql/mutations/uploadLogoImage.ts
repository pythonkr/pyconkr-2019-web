import {
  UploadLogoImage,
  UploadLogoImage_uploadLogoImage,
  UploadLogoImageVariables,
} from 'lib/apollo_graphql/__generated__/UploadLogoImage'
import {
  createMutationDefinition,
  sendMutation,
} from './__base__'
import * as _uploadLogoImage from './UploadLogoImage.graphql'

export const uploadLogoImageMutationDefinition = createMutationDefinition<
  UploadLogoImage,
  UploadLogoImageVariables
>(_uploadLogoImage)

export const uploadLogoImage = sendMutation(
  uploadLogoImageMutationDefinition,
)

export {
  UploadLogoImage_uploadLogoImage,
}
