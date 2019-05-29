import { client } from 'lib/apollo_graphql/client'
import { AssignCfpReviews } from 'lib/apollo_graphql/mutations/assignCfpReviews'
import { SubmitCfpReviews } from 'lib/apollo_graphql/mutations/submitCfpReviews'
import { getAssignedCfpReviews } from 'lib/apollo_graphql/queries/getAssignedCfpReviews'
import _ from 'lodash'
import { action, configure, observable, set, toJS } from 'mobx'
import { CFPReview } from './CFPReview'

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
    @observable isInitialized: boolean = false
    @observable currentStage: ProposalReviewFormStage = ProposalReviewFormStage.stage1
    @observable assignedCfpReviews: CFPReview[] = []
    @observable isCfpReviewSubmitted: boolean | null = false

    @action
    async initialize() {
        if (this.isInitialized) return
        await this.retrieveAssignedCfpReviews()
        this.isInitialized = true
    }

    @action
    setCurrentStage = (stage: ProposalReviewFormStage) => {
      this.currentStage = stage
    }

    @action
    getAssignedCfpReviews (reviews: CFPReview[]) {
        let cfpReview
        const cfpReviews: CFPReview[] = []

        reviews.forEach((review: CFPReview) => {
            cfpReview = new CFPReview()
            set(cfpReview, review as { [key: string]: any})
            cfpReviews.push(cfpReview)
        })

        return cfpReviews
    }

    @action
    async retrieveAssignedCfpReviews() {
        const { data } = await getAssignedCfpReviews(client)({})
        this.isCfpReviewSubmitted = data.isCfpReviewSubmitted
        const cfpReviews = this.getAssignedCfpReviews(data.assignedCfpReviews as CFPReview[])
        this.assignedCfpReviews = [...cfpReviews]
    }

    @action
    async assignCfpReviews(categoryIds: string[]) {
        const { data } = await AssignCfpReviews(client)({ categoryIds: categoryIds })
        const cfpReviews = this.getAssignedCfpReviews(data.assignCfpReviews.reviews)
        const shuffledReviews = this.shuffleCfpReviews(cfpReviews)
        this.assignedCfpReviews = shuffledReviews && [...shuffledReviews]
    }

    @action
    shuffleCfpReviews(cfpReviews: CFPReview[]) {
        // tslint:disable-next-line: underscore-consistent-invocation
        return _.shuffle(cfpReviews)
    }

    @action
    async submitCfpReviews() {
        try {
            const reviews = this.assignedCfpReviews.map((review) => {
                return {
                    id: review.id,
                    comment: review.comment
                }
            })
            await SubmitCfpReviews(client)({ reviews })
            this.setIsCfpReviewSubmitted(true)
        } catch (err) {
            console.log(err)
        }
    }

    @action
    isReviewAssigned() {
        if (this.assignedCfpReviews === null || this.assignedCfpReviews.length === 0) {
            return false
        }

        return true
    }

    @action
    setIsCfpReviewSubmitted (isCfpReviewSubmitted: boolean) {
        this.isCfpReviewSubmitted = isCfpReviewSubmitted
    }
}

export default new ProposalReviewStore()
