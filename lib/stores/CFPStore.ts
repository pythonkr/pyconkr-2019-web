import { action, configure, observable } from 'mobx'
import { getCategories, CategoryType } from 'lib/apollo_graphql/queries/getCategories'
import { getDifficulties, DifficultyType } from 'lib/apollo_graphql/queries/getDifficulties'
import { client } from 'lib/apollo_graphql/client';
import { PresentationType, getMyPresentation } from 'lib/apollo_graphql/queries/getMyPresentation';
import { createOrUpdatePresentation } from 'lib/apollo_graphql/mutations/createOrUpdatePresentation';

configure({ enforceActions: 'always' })

export enum CFPFormStage {
  stage1 = 1,
  stage2 = 2,
  stage3 = 3,
  stage4 = 4,
  completed = 5
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
      var response = await getMyPresentation(client)({})
      this.presentation = response.data.myPresentation
    }

    @action
    async createOrUpdatePresentation(presentation: any) {
      if(presentation && presentation.hasOwnProperty('__typename')){
        delete presentation.__typename
      }
      var response = await createOrUpdatePresentation(client)({
        presentationInput: presentation
      })
      this.presentation = {
        ...response.data.createOrUpdatePresentation.presentation
      }
    }

}

export default new CFPStore()
