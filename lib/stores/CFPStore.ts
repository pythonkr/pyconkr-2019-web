import { client } from 'lib/apollo_graphql/client';
import { createOrUpdatePresentationProposal } from 'lib/apollo_graphql/mutations/createOrUpdatePresentationProposal';
import { CategoryType, getCategories } from 'lib/apollo_graphql/queries/getCategories';
import { DifficultyType, getDifficulties } from 'lib/apollo_graphql/queries/getDifficulties';
import { getMyPresentationProposal } from 'lib/apollo_graphql/queries/getMyPresentationProposal';
import { action, configure, observable } from 'mobx';

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
      const response = await getCategories(client)({})
      this.categories = response.data.categories
    }

    @action
    async retrieveDifficulties() {
      const response = await getDifficulties(client)({})
      this.difficulties = response.data.difficulties
    }

    @action
    async retriveMyPresentation() {
      const response = await getMyPresentationProposal(client)({})
      this.presentation = response.data.myPresentation
    }

    @action
    async createOrUpdatePresentation(presentation: any) {
      if (presentation && presentation.hasOwnProperty('__typename')) {
        delete presentation.__typename
      }
      const response = await createOrUpdatePresentationProposal(client)({
        data: presentation
      })
      this.presentation = {
        ...response.data.createOrUpdatePresentationProposal.presentation
      }
    }

}

export default new CFPStore()
