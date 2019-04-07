import { client } from 'lib/apollo_graphql/client'
import { configure, observable, action } from 'mobx'
import { SponsorLevelType, getSponsorLevels } from 'lib/apollo_graphql/queries/getSponsorLevels'
import { createOrUpdateSponsor, SponsorNode } from 'lib/apollo_graphql/mutations/createOrUpdateSponsor';
import { uploadBusinessRegistrationFile as uploadSponsorBusinessRegistrationFile } from 'lib/apollo_graphql/mutations/uploadBusinessRegistrationFile'
import { uploadLogoImage as uploadSponsorLogoImage } from 'lib/apollo_graphql/mutations/uploadLogoImage'
import { uploadLogoVector as uploadSponsorLogoVector } from 'lib/apollo_graphql/mutations/uploadLogoVector'

configure({ enforceActions: 'always' })

export enum SponsorFormStage {
    stage1 = 0,
    stage2 = 1,
    stage3 = 2,
}

export class SponsorStore {
    @observable isInitialized: boolean = false
    @observable sponsorLevels: SponsorLevelType[] = []
    @observable proposal: SponsorNode | null = null
    @observable currentStage: SponsorFormStage = SponsorFormStage.stage1

    @action
    async initialize() {
        this.retrieveSponsorLevels()
        this.isInitialized = true
    }

    @action
    setCurrentStage(stage: SponsorFormStage) {
      this.currentStage = stage
    }

    @action
    async retrieveSponsorLevels() {
        const response = await getSponsorLevels(client)({})
        if (response.data.sponsorLevels){
            this.sponsorLevels = response.data.sponsorLevels
        }
    }

    @action
    async createOrUpdateSponsor(sponsor: any) {
        if (sponsor && sponsor.hasOwnProperty('__typename')) {
            delete sponsor.__typename
        }
        const response = await createOrUpdateSponsor(client)({
            data: sponsor
        })
        this.proposal = {
            ...response.data.createOrUpdateSponsor.sponsor
        }

    }

    @action
    async uploadBusinessRegistrationFile(file: any) {
        const response = await uploadSponsorBusinessRegistrationFile(client)({
            file
        })
        const fileUrl = response.data.uploadBusinessRegistrationFile.file
        this.proposal = {
            ...this.proposal,
            businessRegistrationFile: fileUrl
        }
        return fileUrl
    }

    @action
    async uploadLogoImage(file: any) {
        const response = await uploadSponsorLogoImage(client)({
            file
        })
        const fileUrl = response.data.uploadLogoImage.image
        this.proposal = {
            ...this.proposal,
            logoImage: fileUrl
        }
        return fileUrl
    }

    @action
    async uploadLogoVector(file: any) {
        const response = await uploadSponsorLogoVector(client)({
            file
        })
        const fileUrl = response.data.uploadLogoVector.image
        this.proposal = {
            ...this.proposal,
            logoVector: fileUrl
        }
        return fileUrl
    }
}

export default new SponsorStore()
