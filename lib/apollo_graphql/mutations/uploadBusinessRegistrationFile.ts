import {
  UploadBusinessRegistrationFile,
  UploadBusinessRegistrationFile_uploadBusinessRegistrationFile,
  UploadBusinessRegistrationFileVariables,
} from 'lib/apollo_graphql/__generated__/UploadBusinessRegistrationFile'
import {
  createMutationDefinition,
  sendMutation,
} from './__base__'
import * as _uploadBusinessRegistrationFile from './_uploadBusinessRegistrationFile.graphql'

export const uploadBusinessRegistrationFileMutationDefinition = createMutationDefinition<
  UploadBusinessRegistrationFile,
  UploadBusinessRegistrationFileVariables
>(_uploadBusinessRegistrationFile)

export const uploadBusinessRegistrationFile = sendMutation(
  uploadBusinessRegistrationFileMutationDefinition,
)

export {
  UploadBusinessRegistrationFile_uploadBusinessRegistrationFile,
}
