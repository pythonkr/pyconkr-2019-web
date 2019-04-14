import {
    getSchedule as getScheduleType,
    getSchedule_schedule as ScheduleNode,
  } from 'lib/apollo_graphql/__generated__/getSchedule'
import {
    createQueryDefinition,
    sendQuery,
  } from './__base__'
import * as _getSchedule from './_getSchedule.graphql'

export const getScheduleQueryDefinition = createQueryDefinition<
    getScheduleType,
    {}
>(_getSchedule)

export const getSchedule = sendQuery(
    getScheduleQueryDefinition,
)

export {
  ScheduleNode,
}
