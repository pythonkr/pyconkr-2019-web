import { client } from 'lib/apollo_graphql/client'
import { createOrUpdateSponsor } from 'lib/apollo_graphql/mutations/createOrUpdateSponsor'
import { uploadBusinessRegistrationFile as uploadSponsorBusinessRegistrationFile } from 'lib/apollo_graphql/mutations/uploadBusinessRegistrationFile'
import { uploadLogoImage as uploadSponsorLogoImage } from 'lib/apollo_graphql/mutations/uploadLogoImage'
import { uploadLogoVector as uploadSponsorLogoVector } from 'lib/apollo_graphql/mutations/uploadLogoVector'
import { getMySponsor } from 'lib/apollo_graphql/queries/getMySponsor'
import { getSponsorLevels, SponsorLevelType } from 'lib/apollo_graphql/queries/getSponsorLevels'
import { action, configure, observable, set } from 'mobx'
import { SponsorNode } from './SponsorNode'
import * as _ from 'lodash'

configure({ enforceActions: 'observed' })

export enum SponsorFormStage {
    stage1 = 0,
    stage2 = 1,
    completed = 2,
}

export class SponsorStore {
    @observable isInitialized: boolean = false
    @observable sponsorLevels: SponsorLevelType[] = []
    @observable proposal: SponsorNode
    @observable currentStage: SponsorFormStage = SponsorFormStage.stage1

    constructor() {
        this.proposal = new SponsorNode()
    }

    @action
    async initialize() {
        await this.retrieveSponsorLevels()
        await this.retrieveMySponsorProposal()
        this.isInitialized = true
    }

    @action
    async retrieveSponsorLevels() {
        const response = await getSponsorLevels(client)({})
        if (response.data.sponsorLevels) {
            this.sponsorLevels = response.data.sponsorLevels
        }
    }

    @action
    async retrieveMySponsorProposal() {
        const { data } = await getMySponsor(client)({})
        set(this.proposal, data.mySponsor as { [key: string]: any })
    }

    @action
    async createOrUpdateSponsor(submitted: boolean) {
        const excludeKeys = ['__typename', 'id', 'accepted', 'creator', 'paidAt', 'businessRegistrationFile', 'logoImage', 'logoVector', 'name', 'desc']
        this.proposal.setSumitted(submitted)
        const sponsor = _.omit(this.proposal, excludeKeys)

        // FIXME: 아래 코드 의도를 잘 모르겠습니다.. @이종서
        if('level' in sponsor){
            if(sponsor.level)
                sponsor.levelId = sponsor.level.id
            delete sponsor['level']
        }
        const { data } = await createOrUpdateSponsor(client)({ data: sponsor })
        this.proposal = new SponsorNode(data.createOrUpdateSponsor.sponsor)
    }

    @action
    async uploadBusinessRegistrationFile(file: any) {
        const response = await uploadSponsorBusinessRegistrationFile(client)({
            file
        })
        const fileUrl = response.data.uploadBusinessRegistrationFile.file
        this.proposal.setBusinessRegistrationFile(fileUrl)

        return fileUrl
    }

    @action
    async uploadLogoImage(file: any) {
        const response = await uploadSponsorLogoImage(client)({
            file
        })
        const fileUrl = response.data.uploadLogoImage.image
        this.proposal.setLogoImage(fileUrl)

        return fileUrl
    }

    @action
    async uploadLogoVector(file: any) {
        const response = await uploadSponsorLogoVector(client)({
            file
        })
        const fileUrl = response.data.uploadLogoVector.image
        this.proposal.setLogoVector(fileUrl)

        return fileUrl
    }
}

export default new SponsorStore()
