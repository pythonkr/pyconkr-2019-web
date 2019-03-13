import {
    getMe as getMeType,
    getMe_me as MeType,
  } from 'lib/apollo_graphql/__generated__/getMe'
import {
    createQueryDefinition,
    sendQuery,
  } from './__base__'
import * as _getMe from './_getMe.graphql'

export const getMeQueryDefinition = createQueryDefinition<
    getMeType,
    {}
>(_getMe)

export const getMe = sendQuery(
    getMeQueryDefinition,
)

export {
    MeType,
}
