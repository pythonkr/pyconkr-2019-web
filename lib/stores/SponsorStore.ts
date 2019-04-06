import { client } from 'lib/apollo_graphql/client'
import { configure, observable, action } from 'mobx'
import { SponsorLevelType, getSponsorLevels } from 'lib/apollo_graphql/queries/getSponsorLevels'

configure({ enforceActions: 'always' })

export class Sponsor {
    @observable id: string = '';
    @observable name?: string;
    @observable nameKo?: string;
    @observable desc?: string;
}

export class SponsorStore {
    @observable isInitialized: boolean = false
    @observable sponsorLevels: SponsorLevelType[] = []
    @observable sponsors: Sponsor[] = [
        { id: '1', name: 'one', nameKo: '하나', desc: 'sample1'},
        { id: '2', name: 'two', nameKo: '둘', desc: 'sample2'},
    ]

    @action
    async initialize() {
        this.retrieveSponsorLevels()
        this.isInitialized = true
    }
    @action
    async retrieveSponsorLevels() {
        const response = await getSponsorLevels(client)({})
        this.sponsorLevels = response.data.sponsorLevels
    }
}

export default new SponsorStore()
