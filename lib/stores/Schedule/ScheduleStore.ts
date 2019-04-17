import { client } from 'lib/apollo_graphql/client'
import { action, configure, observable, set, values, toJS } from 'mobx'
import { getSchedule } from 'lib/apollo_graphql/queries/getSchedule';
import { ScheduleNode } from './ScheduleNode'

configure({ enforceActions: 'observed' })


export class ScheduleStore {
    @observable isInitialized: boolean = false
    @observable schedule: ScheduleNode

    constructor() {
        this.schedule = new ScheduleNode()
    }

    @action
    async initialize() {
        await this.retrieveSchedule()
        this.isInitialized = true
    }

    @action
    async retrieveSchedule() {
        const response = await getSchedule(client)({})
        if (response.data.schedule) {
            set(this.schedule,response.data.schedule)
        }
    }
    
}

export default new ScheduleStore()
