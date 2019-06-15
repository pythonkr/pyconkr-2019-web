import { client } from 'lib/apollo_graphql/client'
import { createOrUpdateSponsor } from 'lib/apollo_graphql/mutations/createOrUpdateSponsor'
import { uploadBusinessRegistrationFile as uploadSponsorBusinessRegistrationFile } from 'lib/apollo_graphql/mutations/uploadBusinessRegistrationFile'
import { uploadLogoImage as uploadSponsorLogoImage } from 'lib/apollo_graphql/mutations/uploadLogoImage'
import { uploadLogoVector as uploadSponsorLogoVector } from 'lib/apollo_graphql/mutations/uploadLogoVector'
import { getMySponsor } from 'lib/apollo_graphql/queries/getMySponsor'
import { getSponsor } from 'lib/apollo_graphql/queries/getSponsor'
import { getSponsorLevels, SponsorLevelType } from 'lib/apollo_graphql/queries/getSponsorLevels'
import { getSponsors, PublicSponsorNode } from 'lib/apollo_graphql/queries/getSponsors'

import { getSponsors_sponsors } from 'lib/apollo_graphql/__generated__/getSponsors'
import { getPatrons, PatronNode } from 'lib/apollo_graphql/queries/getPatrons'
import * as _ from 'lodash'
import { action, configure, observable, set } from 'mobx'
import { SponsorNode } from './SponsorNode'

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
    @observable sponsors: PublicSponsorNode[] = []
    @observable currentSponsor: PublicSponsorNode | null = null
    @observable isProposalInitialized: boolean = false
    @observable proposalLevel: SponsorLevelType
    @observable currentStage: SponsorFormStage = SponsorFormStage.stage1
    @observable patrons: PatronNode[] = []

    constructor() {
        this.proposal = new SponsorNode()
    }

    @action
    setProposal(proposal: any) {
        set(this.proposal, proposal as { [key: string]: any })
        this.isProposalInitialized = proposal !== null
        if (proposal && proposal.level) {
            set(this.proposalLevel, proposal.level as { [key: string]: any})
        }
    }

    @action
    async getProposalLevel() {
        if (!this.sponsorLevels) {
            await this.retrieveSponsorLevels()
        }

        return this.sponsorLevels.filter((value) => value.id === this.proposalLevelId)
    }

    @action
    async initialize() {
        await this.retrieveSponsorLevels()
        await this.retrieveSponsors()
        await this.retrieveMySponsorProposal()
        this.isInitialized = true
    }

    @action
    async retrieveSponsorLevels() {
        const response = await getSponsorLevels(client)({})
        if (response.data.sponsorLevels) {
            this.sponsorLevels = response.data.sponsorLevels as SponsorLevelType[]
            this.proposalLevel = {
                ...this.getAvailableLevel()
            }
        }
    }

    @action
    getAvailableLevel() {
        this.sponsorLevels.forEach(sponsorLevel => {
            if (sponsorLevel.currentRemainingNumber) {
                return sponsorLevel
            }
        })

        return {}
    }

    @action
    async retrieveMySponsorProposal() {
        const { data } = await getMySponsor(client)({})
        this.setProposal(data.mySponsor)
    }

    @action
    async retrieveSponsors() {
        const response = await getSponsors(client)({})
        if (response.data.sponsors) {
            this.sponsors = response.data.sponsors as getSponsors_sponsors[]
        }
    }

    @action
    async retrieveSponsor(id: string) {
        const response = await getSponsor(client)({
            id
        })
        if (response.data.sponsor) {
            this.currentSponsor = response.data.sponsor
        }

        return response.data.sponsor
    }

    @action
    async createOrUpdateSponsor(submitted: boolean) {
        const excludeKeys = [
            '__typename', 'id', 'accepted', 'level', 'creator',
            'paidAt', 'businessRegistrationFile', 'logoImage',
            'logoVector', 'name', 'desc'
        ]
        this.proposal.setSumitted(submitted)
        const sponsor = _.omit(this.proposal, excludeKeys)
        sponsor.levelId = this.proposalLevel.id
        const { data } = await createOrUpdateSponsor(client)({ data: sponsor })
        this.setProposal(data.createOrUpdateSponsor.sponsor)
    }

    @action
    setProposalLevelById(levelId: string) {
        this.sponsorLevels.forEach(sponsorLevel => {
            const level = sponsorLevel
            if (level.id === levelId) {
                set(this.proposalLevel, level as { [key: string]: any})

                return
            }
        })
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

    @action
    async retrievePatrons() {
        const response = await getPatrons(client)({})
        this.setPatrons(response.data.patrons as PatronNode[])
    }

    @action
    setPatrons(patrons: PatronNode[]) {
        this.patrons = patrons
    }
}

export default new SponsorStore()
