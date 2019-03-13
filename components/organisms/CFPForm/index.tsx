import Stage1 from 'components/organisms/CFPForm/Stage1'
import Stage2 from 'components/organisms/CFPForm/Stage2'
import Stage3 from 'components/organisms/CFPForm/Stage3'
import Stage4 from 'components/organisms/CFPForm/Stage4'
import { CFPFormStage } from 'lib/stores/CFPStore'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'

@inject('stores')
@observer
export default class CFPForm extends React.Component<{ stores: StoresType }> {
  async componentDidMount() {
    const { cfpStore} = this.props.stores
    cfpStore.retrieveCategories()
    cfpStore.retrieveDifficulties()
  }

  render() {
    const { stores } = this.props
    const { currentStage } = toJS(stores.cfpStore)

    return <>
      {(currentStage === CFPFormStage.stage1) && <Stage1 stores={stores} />}
      {(currentStage === CFPFormStage.stage2) && <Stage2 stores={stores} />}
      {(currentStage === CFPFormStage.stage3) && <Stage3 stores={stores} />}
      {(currentStage === CFPFormStage.stage4) && <Stage4 stores={stores} />}
      {(currentStage === CFPFormStage.completed) && <div>
        발표안을 제출했습니다! 호호호
      </div>}
    </>
  }
}
