import { client } from 'lib/apollo_graphql/client'
import { createOrUpdateSponsor } from 'lib/apollo_graphql/mutations/createOrUpdateSponsor'
import { uploadBusinessRegistrationFile as uploadSponsorBusinessRegistrationFile } from 'lib/apollo_graphql/mutations/uploadBusinessRegistrationFile'
import { uploadLogoImage as uploadSponsorLogoImage } from 'lib/apollo_graphql/mutations/uploadLogoImage'
import { uploadLogoVector as uploadSponsorLogoVector } from 'lib/apollo_graphql/mutations/uploadLogoVector'
import { getMySponsor } from 'lib/apollo_graphql/queries/getMySponsor'
import { getSponsorLevels, SponsorLevelType } from 'lib/apollo_graphql/queries/getSponsorLevels'
import { action, configure, observable, set, values, toJS } from 'mobx'
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
    @observable proposalLevel: SponsorLevelType
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
            this.proposalLevel = {
                ...this.getAvailableLevel()
            }
        }
    }

    @action
    getAvailableLevel(){
        for(const i in this.sponsorLevels){
            const sponsor = this.sponsorLevels[i]
            if(sponsor.currentRemainingNumber){
                return sponsor
            }
        }
        return {}
    }

    @action
    async retrieveMySponsorProposal() {
        const { data } = await getMySponsor(client)({})
        this.setProposal(data.mySponsor)
    }

    @action
    async createOrUpdateSponsor(submitted: boolean) {
        const excludeKeys = ['__typename', 'id', 'accepted', 'level', 'creator',
            'paidAt', 'businessRegistrationFile', 'logoImage', 'logoVector', 'name', 'desc']
        this.proposal.setSumitted(submitted)
        const sponsor = _.omit(this.proposal, excludeKeys)
        sponsor.levelId = this.proposalLevel.id
        

        const { data } = await createOrUpdateSponsor(client)({ data: sponsor })
        this.setProposal(data.createOrUpdateSponsor.sponsor)
    }

    @action
    setProposalLevelById(levelId: string) {
        for(var i in this.sponsorLevels){
            const level = this.sponsorLevels[i]
            if(level.id == levelId){
                set(this.proposalLevel, level as { [key: string]: any})
                return
            }
        }
    }

    @action
    setProposal(proposal: any){
        set(this.proposal, proposal as { [key: string]: any })
        if(proposal && proposal.level){
            set(this.proposalLevel, proposal.level as { [key: string]: any})
        }
    }

    @action
    async getProposalLevel() {
        if(!this.sponsorLevels){
            await this.retrieveSponsorLevels()
        }  
        var level = this.sponsorLevels.filter((value) => value.id === this.proposalLevelId);
        console.log(level)
        return level
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
