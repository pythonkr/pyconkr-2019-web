import { action, configure, observable } from 'mobx'
import { getCategories, CategoryType } from 'lib/apollo_graphql/queries/getCategories'
import { getDifficulties, DifficultyType } from 'lib/apollo_graphql/queries/getDifficulties'
import { client } from 'lib/apollo_graphql/client';
import { PresentationProposalType, getMyPresentationProposal } from 'lib/apollo_graphql/queries/getMyPresentationProposal';
import { createOrUpdatePresentationProposal } from 'lib/apollo_graphql/mutations/createOrUpdatePresentationProposal';

configure({ enforceActions: 'always' })

export enum CFPFormStage {
  stage1 = 0,
  stage2 = 1,
  stage3 = 2,
  stage4 = 3,
  completed = 4
}

export class CFPStore {
    @observable currentStage: CFPFormStage = CFPFormStage.stage1
    @observable categories: CategoryType[] = []
    @observable difficulties: DifficultyType[] = []
    @observable presentation: PresentationType

    @action
    setCurrentStage(stage: CFPFormStage) {
      this.currentStage = stage
    }

    @action
    async retrieveCategories() {
      var response = await getCategories(client)({})
      this.categories = response.data.categories
    }

    @action
    async retrieveDifficulties() {
      var response = await getDifficulties(client)({})
      this.difficulties = response.data.difficulties
    }

    @action
    async retriveMyPresentation() {
      var response = await getMyPresentationProposal(client)({})
      this.presentation = response.data.myPresentation
    }

    @action
    async createOrUpdatePresentation(presentation: any) {
      if(presentation && presentation.hasOwnProperty('__typename')){
        delete presentation.__typename
      }
      var response = await createOrUpdatePresentationProposal(client)({
        data: presentation
      })
      this.presentation = {
        ...response.data.createOrUpdatePresentation.presentation
      }
    }

}

export default new CFPStore()
