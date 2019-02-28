import {
    oAuthTokenAuth as getAuthTokenType,
    oAuthTokenAuth_oAuthTokenAuth as AuthTokenType,
    oAuthTokenAuthVariables as getAuthVariablesType,
  } from 'lib/apollo_graphql/__generated__/oAuthTokenAuth'
import {
    createMutationDefinition,
    sendMutation,
  } from '../mutations/__base__'
import * as _getAuthToken from './_getAuthToken.graphql'

export const getAuthTokenMutationDefinition = createMutationDefinition<
    getAuthTokenType,
    getAuthVariablesType
  >(_getAuthToken)

export const getAuthToken = sendMutation(
  getAuthTokenMutationDefinition,
)

export {
  AuthTokenType,
}