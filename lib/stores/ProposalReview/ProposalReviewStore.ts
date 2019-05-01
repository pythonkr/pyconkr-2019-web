import { action, configure, observable } from 'mobx'

configure({ enforceActions: 'observed' })

export enum ProposalReviewFormStage {
    stage1 = 0,
    stage2 = 1,
    stage3 = 2,
    completed = 3,
}

export class ProposalReviewStore {
    // @observable isInitialized: boolean = false
    @observable currentStage: ProposalReviewFormStage = ProposalReviewFormStage.stage1
    @observable proposalsToReview: object[] = []
    @observable comments: object[] = []

    constructor() {
        // this.proposal = new SponsorNode()
    }

    // @action
    // async initialize() {
    //     await this.retrieveSponsorLevels()
    //     await this.retrieveMySponsorProposal()
    //     this.isInitialized = true
    // }

    @action
    setCurrentStage(stage: ProposalReviewFormStage) {
      this.currentStage = stage
    }

    @action
    setProposalsToReview(proposals: object[]) {
      this.proposalsToReview = proposals
    }

    @action
    async retrieveProposalsToReview() {
        // const { data } = await getMySponsor(client)({})
        this.setProposalsToReview([])
    }

    @action
    async selectCategoriesAndOthers() {
        return Promise.resolve()
    }
}

export default new ProposalReviewStore()
