import {
    getMyPresentationProposal_myPresentationProposal as PresentationProposalNode,
    getMyPresentationProposal_myPresentationProposal_category as CategoryNode,
    getMyPresentationProposal_myPresentationProposal_difficulty as DifficultyNode,
    getMyPresentationProposal_myPresentationProposal_owner
} from 'lib/apollo_graphql/__generated__/getMyPresentationProposal'
import { DurationNode, LanguageNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { action, configure, observable } from 'mobx'

configure({ enforceActions: 'observed' })

export class PresentationProposal implements PresentationProposalNode {
    __typename: 'PresentationProposalNode' = 'PresentationProposalNode'
    @observable name: string = ''
    @observable owner: getMyPresentationProposal_myPresentationProposal_owner | null = null
    @observable backgroundDesc: string = ''
    @observable detailDesc: string = ''
    @observable language: LanguageNode | null = null
    @observable duration: DurationNode | null = null
    @observable category: CategoryNode | null = null
    @observable difficulty: DifficultyNode | null = null
    @observable isPresentedBefore: boolean = false
    @observable placePresentedBefore: string = ''
    @observable presentedSlideUrlBefore: string = ''
    @observable comment: string = ''
    @observable isAgreed: boolean | null = null
    @observable recordable: boolean = false
    @observable submitted: boolean = false
    @observable accepted: boolean = false
    @observable categoryId: string = (this.category && this.category.id) || '1'
    @observable difficultyId: string = (this.difficulty && this.difficulty.id) || '1'

    @action setCategoryId(newCategoryId: string) {
        this.categoryId = newCategoryId
    }

    @action setDifficultyId(newDifficultyId: string) {
        this.difficultyId = newDifficultyId
    }

    @action setName(newName: string) {
        this.name = newName
    }

    @action setBackgroundDesc(newBackgroundDesc: string) {
        this.backgroundDesc = newBackgroundDesc
    }

    @action setDuration(duration: DurationNode) {
        this.duration = duration
    }

    @action setLanguage(language: LanguageNode) {
        this.language = language
    }

    @action setDetailDesc(newDetailDesc: string) {
        this.detailDesc = newDetailDesc
    }

    @action setIsPresentationBefore(isPresentedBefore: boolean) {
        this.isPresentedBefore = isPresentedBefore
    }

    @action setPlacePresentedBefore(placePresentedBefore: string) {
        this.placePresentedBefore = placePresentedBefore
    }

    @action setPresentedSlideUrlBefore(presentedSlideUrlBefore: string) {
        this.presentedSlideUrlBefore = presentedSlideUrlBefore
    }

    @action setComment(newComment: string) {
        this.comment = newComment
    }
}
