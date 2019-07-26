import { format } from 'date-fns'
import { getDifficulties_difficulties } from 'lib/apollo_graphql/__generated__/getDifficulties'
import { client } from 'lib/apollo_graphql/client'
import { CreateOrUpdatePresentationProposal } from 'lib/apollo_graphql/mutations/createOrUpdatePresentationProposal'
import { CategoryType, getCategories } from 'lib/apollo_graphql/queries/getCategories'
import { DifficultyType, getDifficulties } from 'lib/apollo_graphql/queries/getDifficulties'
import { getMyPresentationProposal } from 'lib/apollo_graphql/queries/getMyPresentationProposal'
import { getPresentation } from 'lib/apollo_graphql/queries/getPresentation'
import { getPresentations, PresentationNode } from 'lib/apollo_graphql/queries/getPresentations'
import _ from 'lodash'
import { action, computed, configure, observable, set, toJS } from 'mobx'
import { formatDateYearMonthDay } from 'utils/formatDate'
import { PresentationProposal } from './PresentationProposal'

configure({ enforceActions: 'observed' })

export enum CFPFormStage {
  stage1 = 0,
  stage2 = 1,
  stage3 = 2,
  stage4 = 3,
  completed = 4
}

export class CFPStore {
    @observable isInitialized: boolean = false
    @observable currentStage: CFPFormStage = CFPFormStage.stage1
    @observable categories: CategoryType[] = []
    @observable difficulties: DifficultyType[] = []
    @observable proposal: PresentationProposal
    @observable isProposalInitialized: boolean = false
    @observable presentations: (PresentationNode | null)[] = []
    @observable selectedDate?: Date

    constructor() {
      this.proposal = new PresentationProposal()
    }

    @action
    setCurrentStage(stage: CFPFormStage) {
      this.currentStage = stage
    }

    @action
    setProposal(proposal: any) {
        if (!proposal) {
          this.isProposalInitialized = false

          return
        }
        set(this.proposal, proposal as { [key: string]: any })
        if (proposal.category) {
          this.proposal.setCategoryId(proposal.category.id)
        }
        if (proposal.difficulty) {
          this.proposal.setDifficultyId(proposal.difficulty.id)
        }
        this.isProposalInitialized = true
    }

    @action
    setSelectedDate = (newDate: Date) => {
      this.selectedDate = newDate
    }

    @action
    async initialize() {
      await this.retrieveDifficulties()
      await this.retrieveCategories()
      await this.retriveMyProposal()
      this.isInitialized = true
    }

    @action
    async retrieveDifficulties() {
      const response = await getDifficulties(client)({})
      this.difficulties = response.data.difficulties as getDifficulties_difficulties[]
    }

    @action
    async retrieveCategories() {
      const response = await getCategories(client)({})
      // FIXME: 카테고리 타입이 없음.
      this.categories = response.data.categories
    }

    @action
    async retriveMyProposal() {
      const response = await getMyPresentationProposal(client)({})
      this.setProposal(response.data.myPresentationProposal)
    }

    @action
    retrievePresentations = async () => {
      const response = await getPresentations(client)({})

      return response.data.presentations
    }

    @action
    setPresentations = (presentations: (PresentationNode | null)[]) => {
      this.presentations = presentations
    }

    @computed get conferenceTalks () {
      // tslint:disable: underscore-consistent-invocation
      const conferenceTalks = _.filter(this.presentations, (presentation: PresentationNode) => {
        if (!this.selectedDate) return
        const selectedDate = formatDateYearMonthDay(this.selectedDate.toString())
        const startDate = formatDateYearMonthDay(presentation.startedAt)
        const finishDate = formatDateYearMonthDay(presentation.finishedAt)

        return presentation.startedAt && presentation.finishedAt && (selectedDate === startDate && selectedDate === finishDate)
      })

      return _.sortBy(conferenceTalks, (conferenceTalk: PresentationNode): (PresentationNode | null)[] => {
        const { startedAt, finishedAt } = conferenceTalk

        return startedAt && finishedAt
      })
    }

    @action
    async retrievePresentation(id: string) {
      const response = await getPresentation(client)({
        id: id
      })

      return response.data.presentation
    }

    @action
    async createOrUpdatePresentation(presentation: any) {
      if (presentation && presentation.hasOwnProperty('__typename')) {
        delete presentation.__typename
      }
      const response = await CreateOrUpdatePresentationProposal(client)({
        data: presentation
      })
      this.setProposal(response.data.createOrUpdatePresentationProposal.proposal)
    }

    @action
    async createOrUpdatePresentationEdit() {
      const excludeKeys = [
        '__typename', 'owner', 'category', 'difficulty',
        'isAgreed', 'recordable', 'submitted', 'accepted'
      ]
      const presentation = _.omit(toJS(this.proposal), excludeKeys)
      const response = await CreateOrUpdatePresentationProposal(client)({
        data: presentation
      })

      this.setProposal(response.data.createOrUpdatePresentationProposal.proposal)
    }
}

export default new CFPStore()
