import { action, configure, observable } from 'mobx'
import { getCategories, CategoryType } from 'lib/apollo_graphql/queries/getCategories'
import { getDifficulties, DifficultyType } from 'lib/apollo_graphql/queries/getDifficulties'
import { client } from 'lib/apollo_graphql/client';

configure({ enforceActions: 'always' })

export enum CFPFormStage {
  stage1 = 1,
  stage2 = 2,
  stage3 = 3,
  stage4 = 4,
  completed = 5
}

export class CFPStore {
    @observable currentStage: CFPFormStage = CFPFormStage.stage1;
    @observable categories: CategoryType[] = []
    @observable difficulties: DifficultyType[] = [] 
    
    @action
    setCurrentStage(stage: CFPFormStage) {
      this.currentStage = stage
    }

    @action
    async retrieveCategories() {
      var response = await getCategories(client)({})
      this.categories = {
        ...response.data.categories
      }
      console.log(this.categories)
    }

    @action
    async retrieveDifficulties() {
      var response = await getDifficulties(client)({})
      this.difficulties = {
        ...response.data.difficulties
      }
      console.log(response)
    }

}

export default new CFPStore()
