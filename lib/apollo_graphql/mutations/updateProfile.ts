import {
  UpdateProfile,
  UpdateProfile_updateProfile,
  UpdateProfileVariables,
} from 'lib/apollo_graphql/__generated__/UpdateProfile'
import {
  createMutationDefinition,
  sendMutation,
} from '../mutations/__base__'
import * as _updateProfile from './_updateProfile.graphql'

export const updateProfileMutationDefinition = createMutationDefinition<
  UpdateProfile,
  UpdateProfileVariables
>(_updateProfile)

export const updateProfile = sendMutation(
  updateProfileMutationDefinition,
)

export {
  UpdateProfile_updateProfile,
}
