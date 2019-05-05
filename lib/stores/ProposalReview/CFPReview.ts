import { getAssignedCfpReviews_assignedCfpReviews_presentation } from 'lib/apollo_graphql/__generated__/getAssignedCfpReviews'
import { CFPReviewType } from 'lib/apollo_graphql/queries/getAssignedCfpReviews'
import { action, configure, observable } from 'mobx'

configure({ enforceActions: 'observed' })

export class CFPReview implements CFPReviewType {
    __typename: 'CFPReviewNode' = 'CFPReviewNode'
    @observable id: string = ''
    @observable presentation: getAssignedCfpReviews_assignedCfpReviews_presentation | null = null
    @observable comment: string = ''
    @observable createdAt: any
    @observable updatedAt: any

    @action
    setComment(newComment: string) {
        this.comment = newComment
    }
}
