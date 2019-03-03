import {
  UploadProfileImage,
  UploadProfileImage_uploadProfileImage,
  UploadProfileImageVariables,
} from 'lib/apollo_graphql/__generated__/UploadProfileImage'
import {
  createMutationDefinition,
  sendMutation,
} from './__base__'
import * as _uploadProfileImage from './UploadProfileImage.graphql'

export const uploadProfileImageMutationDefinition = createMutationDefinition<
  UploadProfileImage,
  UploadProfileImageVariables
>(_uploadProfileImage)

export const uploadProfileImage = sendMutation(
  uploadProfileImageMutationDefinition,
)

export {
  UploadProfileImage_uploadProfileImage,
}
