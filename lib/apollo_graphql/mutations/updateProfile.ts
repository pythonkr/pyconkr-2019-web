import {
  UpdateProfile as UpdateProfileType,
  UpdateProfile_updateProfile as UpdateProfile2Type,
  UpdateProfileVariables as UpdateProfileVariablesType,
} from 'lib/apollo_graphql/__generated__/UpdateProfile'
import {
  createMutationDefinition,
  sendMutation,
} from '../mutations/__base__'
import * as _updateProfile from './_updateProfile.graphql'

export const updateProfileMutationDefinition = createMutationDefinition<
  UpdateProfileType,
  UpdateProfileVariablesType
>(_updateProfile)

export const updateProfile = sendMutation(
  updateProfileMutationDefinition,
)

export {
  UpdateProfile2Type,
}
