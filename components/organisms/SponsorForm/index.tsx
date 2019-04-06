import styled from '@emotion/styled'
import { FormNeedAuthAgreement } from 'components/atoms/FormNeedAuthAgreement'
import { PaddingWrapper } from 'components/atoms/FormNeedsLogin'
import { FormSubmitted } from 'components/atoms/FormSubmitted'
import { Loading } from 'components/atoms/Loading'
import { NotOpenYet } from 'components/atoms/NotOpenYet'
import { isFuture } from 'date-fns'
import { talkProposal } from 'dates'
import { CFPFormStage } from 'lib/stores/CFPStore'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import Steps from 'rc-steps'
import React from 'react'
import intl from 'react-intl-universal'
import { TEAL, TEAL_LIGHT, TEAL_LIGHT_LIGHT, TEAL_SEMI_DARK } from 'styles/colors'
import { isEmpty } from 'utils/isEmpty'
import Stage1 from './Stage1'
import Stage2 from './Stage2'

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
`

@inject('stores')
@observer
export default class CFPForm extends React.Component<{ stores: StoresType }> {
  formWrapperRef: HTMLDivElement | null = null
  state = {
    currentStage: 0
  }

  async componentDidMount() {
    const { cfpStore } = this.props.stores
    if (!cfpStore.isInitialized) cfpStore.initialize()
  }

  render() {
    const { stores } = this.props
    const { profile } = toJS(this.props.stores.profileStore)
    // const { currentStage, categories, proposal, difficulties, isInitialized } = toJS(stores.cfpStore)

    if (!stores.profileStore.isInitialized) {
      return <Loading width={50} height={50}/>
    }

    // if (isFuture(callForSponsors.open)) {
    //   return <NotOpenYet />
    // }

    if (!stores.profileStore.isAgreed) {
      return <FormNeedAuthAgreement />
    }

    // if (proposal && proposal.submitted) {
    //   return <FormSubmitted />
    // }

    if (isEmpty(profile)) {
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
      intl.get('contribute.talkProposal.application.stages.stages1.header').d('약관 동의'),
      intl.get('contribute.talkProposal.application.stages.stages2.header').d('후원 정보'),
      intl.get('contribute.talkProposal.application.stages.stages5.header').d('제출 완료'),
    ]

    return (
      <PaddingWrapper ref={ref => this.formWrapperRef = ref}>
        <StepsWrapper>
          <Steps current={this.state.currentStage} labelPlacement='vertical'>
            {steps.map(step => <Steps.Step title={step} key={step} />)}
          </Steps>
        </StepsWrapper>
        {this.state.currentStage === 0 &&
          <Stage1
            stores={stores}
            scrollRef={this.formWrapperRef!}
            toNextStage={() => this.setState({ currentStage: 1 })}
          />
        }
        {this.state.currentStage === 1 &&
          <Stage2
            stores={stores}
            scrollRef={this.formWrapperRef!}
          />
        }
        {this.state.currentStage === 2 &&
          <div>후원사 신청서를 제출했습니다.</div>
        }
      </PaddingWrapper>
    )
  }
}
