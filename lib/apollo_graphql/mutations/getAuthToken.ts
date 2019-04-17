import {
    getAuthToken as getAuthTokenType,
    getAuthToken_oAuthTokenAuth as AuthTokenType,
    getAuthTokenVariables as getAuthVariablesType,
  } from 'lib/apollo_graphql/__generated__/getAuthToken'
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
