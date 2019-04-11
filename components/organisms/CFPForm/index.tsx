import styled from '@emotion/styled'
import { FormNeedAuthAgreement } from 'components/atoms/FormNeedAuthAgreement'
import { PaddingWrapper } from 'components/atoms/FormNeedsLogin'
import { FormSubmitted } from 'components/atoms/FormSubmitted'
import { Loading } from 'components/atoms/Loading'
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
import { isFuture } from 'date-fns';
import { talkProposal } from 'dates';
import { NotOpenYet } from 'components/atoms/NotOpenYet'
import { mobileWidth } from 'styles/layout'

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
  .rc-steps-item-finish > .rc-steps-item-icon {
    display:inline-block;
    position: relative;

    &:after{
      content: '✔︎';
      display: block;
      color: ${TEAL_LIGHT};
      position: absolute;
      top: -2px;
      left: 6px;
    }
  }

  @media (max-width: ${mobileWidth}) {
    overflow-x: auto;
  }
`

@inject('stores')
@observer
export default class CFPForm extends React.Component<{ stores: StoresType }> {
  formWrapperRef: HTMLDivElement | null = null

  async componentDidMount() {
    const { cfpStore } = this.props.stores
    if (!cfpStore.isInitialized) cfpStore.initialize()
  }

  render() {
    const { stores } = this.props
    const { profile } = toJS(this.props.stores.profileStore)
    const { currentStage, categories, proposal, difficulties, isInitialized } = toJS(stores.cfpStore)

    if (!stores.profileStore.isInitialized || !isInitialized) {
      return <Loading width={50} height={50}/>
    }

    if (isFuture(talkProposal.open)) {
      return <NotOpenYet />
    }

    if (!stores.profileStore.isAgreed) {
      return <FormNeedAuthAgreement />
    }

    if (proposal && proposal.submitted) {
      return <FormSubmitted />
    }

    if (isEmpty(profile) || isEmpty(categories) || isEmpty(difficulties)) {
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
      <PaddingWrapper ref={ref => this.formWrapperRef = ref}>
        <StepsWrapper>
          <Steps current={currentStage} labelPlacement='vertical'>
            {steps.map(step => <Steps.Step title={step} key={step} />)}
          </Steps>
        </StepsWrapper>
        {currentStage === CFPFormStage.stage1 &&
          <Stage1
            stores={stores}
            scrollRef={this.formWrapperRef!}
          />
        }
        {currentStage === CFPFormStage.stage2 &&
          <Stage2
            stores={stores}
            scrollRef={this.formWrapperRef!}
          />
        }
        {currentStage === CFPFormStage.stage3 &&
          <Stage3
            stores={stores}
            scrollRef={this.formWrapperRef!}
          />
        }
        {currentStage === CFPFormStage.stage4 &&
          <Stage4
            stores={stores}
            scrollRef={this.formWrapperRef!}
          />
        }
        {currentStage === CFPFormStage.completed &&
          <div>발표안을 잘 제출했습니다. 호호호 지금 막 제출한 거여</div>
        }
      </PaddingWrapper>
    )
  }
}
