import { action, configure, observable } from 'mobx'

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

    @action
    setCurrentStage(stage: CFPFormStage) {
      this.currentStage = stage
    }
}

export default new CFPStore()
