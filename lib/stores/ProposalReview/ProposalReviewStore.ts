import { action, configure, observable } from 'mobx'
import { PresentationProposal } from '../CFP/PresentationProposal';

configure({ enforceActions: 'observed' })

export enum ProposalReviewFormStage {
    stage1 = 0,
    stage2 = 1,
    stage3 = 2,
    completed = 3,
}

export type Comment = {
    proposalId: number;
    text: string;
}

export class ProposalReviewStore {
    // @observable isInitialized: boolean = false
    @observable currentStage: ProposalReviewFormStage = ProposalReviewFormStage.stage1
    @observable proposalsToReview: PresentationProposal[] = []
    @observable comments: object[] = []

    constructor() {
        this.proposalsToReview = Array.from({ length: 7 })
            .map((_, index) => ({
                id: index + 3,
                name: 'Why do I use Python for scientific research.',
                detailDesc: `My research domain is hadrontherapy, which treat tumor with physical beams. One of the important research in this field is to calculate physical and biological dose fast and accurate to understand many effects on patients, such as Tumor Control Probability (TCP), Noraml Tissue Complication Probability (NTCP) and etc, and increase reproducible results respectively. Fast Recalculation on GPU (FRoG) is an in-house platform for Centro Nazionale Adrontherapia Oncologica (CNAO) in Italy and Heidelberg Ion Therapy center (HIT) in Germany. Recently, FRoG was installed at Aahrus proton center in Denmark and showed its potential to be used in other centers. FRoG is mainly programmed with python and CUDA to achieve fast calculation and flexibility together.

                In the presentation, I will going to present about the two parts. One is about the advantage and the other is disadvantage of using python in scientific fields based on my experiences. The advantage of python is easy to learn, simple to code and well known libraries are existing. The disadvantage is more cultural. Mostly issued scientific areas are few statistical regression methods, such as neural network, and optimization which are called machine learning or Artificial Intelligent (AI).

                Python is a powerful tool for science. However, the distance between scientists and python community seems not to be close. Presenting the differences in those two communities will help understanding each other.`,
                difficulty: '초급',
                category: '기타',
                backgroundDesc: 'Scientific method',
                duration: '45분'
            }))
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
