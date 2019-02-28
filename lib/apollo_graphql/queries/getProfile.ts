import {
    getProfile as getProfileType,
    getProfile_me as ProfileType,
  } from 'lib/apollo_graphql/__generated__/getProfile'
import {
    createQueryDefinition,
    sendQuery,
  } from './__base__'
import * as _getProfile from './_getProfile.graphql'

export const getProfileQueryDefinition = createQueryDefinition<
    getProfileType,
    {}
>(_getProfile)

export const getProfile = sendQuery(
    getProfileQueryDefinition,
)

export {
    ProfileType,
}
