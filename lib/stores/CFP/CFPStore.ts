import { client } from 'lib/apollo_graphql/client'
import { CreateOrUpdatePresentationProposal } from 'lib/apollo_graphql/mutations/createOrUpdatePresentationProposal'
import { CategoryType, getCategories } from 'lib/apollo_graphql/queries/getCategories'
import { DifficultyType, getDifficulties } from 'lib/apollo_graphql/queries/getDifficulties'
import { getMyPresentationProposal } from 'lib/apollo_graphql/queries/getMyPresentationProposal'
import _ from 'lodash'
import { action, configure, observable, set, toJS } from 'mobx'
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

    constructor() {
      this.proposal = new PresentationProposal()
    }

    @action
    setCurrentStage(stage: CFPFormStage) {
      this.currentStage = stage
    }

    @action
    setProposal(proposal: any) {
        set(this.proposal, proposal as { [key: string]: any })
        this.isProposalInitialized = proposal !== null
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
      this.difficulties = response.data.difficulties
    }

    @action
    async retrieveCategories() {
      const response = await getCategories(client)({})
      this.categories = response.data.categories
    }

    @action
    async retriveMyProposal() {
      const response = await getMyPresentationProposal(client)({})
      this.setProposal(response.data.myPresentationProposal)
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
