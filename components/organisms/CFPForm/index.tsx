import styled from '@emotion/styled'
import { PaddingWrapper } from 'components/atoms/FormNeedsLogin'
import Stage1 from 'components/organisms/CFPForm/Stage1'
import Stage2 from 'components/organisms/CFPForm/Stage2'
import Stage3 from 'components/organisms/CFPForm/Stage3'
import Stage4 from 'components/organisms/CFPForm/Stage4'
import { CFPFormStage } from 'lib/stores/CFPStore'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import Steps from 'rc-steps'
import React from 'react'
import intl from 'react-intl-universal'
import { TEAL, TEAL_LIGHT, TEAL_LIGHT_LIGHT, TEAL_SEMI_DARK } from 'styles/colors'
import { isEmpty } from 'utils/isEmpty'
import { Loading } from 'components/atoms/Loading';

const StepsWrapper = styled.div`
  padding: 49px 30px 40px;
  background-color: ${TEAL_LIGHT_LIGHT};
  border-bottom: solid 1px #e1e4e6;
  .rc-steps-item-icon {
    border-color: ${TEAL_LIGHT};
  }
  .rc-steps-item-finish > .rc-steps-item-tail::after {
    background-color: ${TEAL_SEMI_DARK};
  }
  .rc-steps-item-finish > .rc-steps-item-icon,
  .rc-steps-item-process > .rc-steps-item-icon {
    background-color: ${TEAL};
    border-color: ${TEAL_SEMI_DARK};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

@inject('stores')
@observer
export default class CFPForm extends React.Component<{ stores: StoresType }> {
  state = {
    isFormInitialized: false
  }

  async componentDidMount() {
    const { cfpStore } = this.props.stores
    cfpStore.retrieveCategories()
    cfpStore.retriveMyProposal()
    this.setState({
      isFormInitialized: true
    })
  }

  render() {
    const { stores } = this.props
    const { profile } = toJS(this.props.stores.profileStore)
    const { currentStage, categories, proposal } = toJS(stores.cfpStore)

    if (!stores.profileStore.isInitialized || !this.state.isFormInitialized) {
      return <Loading width={50} height={50}/>
    }

    // profile is not agreed -> show greement alert
    if (!stores.profileStore.isAgreed) {
      return <div>으아 로그인 인증을 하라구 </div>
    }

   if (proposal) {
     console.log(proposal)
   }

    if (isEmpty(profile) || isEmpty(categories)) {
      return (
        <div>
          Oops something wrong. Click to refresh form.
          <button onClick={() => stores.profileStore.retrieveMe()}>
            refresh
          </button>
        </div>
      )
    }

    const steps = [
      intl.get('contribute.talkProposal.application.stages.stages1.header').d('프로필 저장'),
      intl.get('contribute.talkProposal.application.stages.stages2.header').d('기본 발표 내용'),
      intl.get('contribute.talkProposal.application.stages.stages3.header').d('상세 발표 내용'),
      intl.get('contribute.talkProposal.application.stages.stages4.header').d('CoC 및 발표 윤리'),
      intl.get('contribute.talkProposal.application.stages.stages5.header').d('제출 완료'),
    ]

    return (
      <PaddingWrapper>
        <StepsWrapper>
          <Steps current={currentStage} labelPlacement='vertical'>
            {steps.map(step => <Steps.Step title={step} />)}
          </Steps>
        </StepsWrapper>
        {currentStage === CFPFormStage.stage1 && <Stage1 stores={stores} />}
        {currentStage === CFPFormStage.stage2 && <Stage2 stores={stores} />}
        {currentStage === CFPFormStage.stage3 && <Stage3 stores={stores} />}
        {currentStage === CFPFormStage.stage4 && <Stage4 stores={stores} />}
        {currentStage === CFPFormStage.completed && (
          <div>발표안을 제출했습니다! 호호호</div>
        )}
      </PaddingWrapper>
    )
  }
}
