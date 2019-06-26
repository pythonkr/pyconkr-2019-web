import { FormNeedAuthAgreement } from 'components/atoms/FormNeedAuthAgreement'
import { PaddingWrapper } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import { NotOpenYet } from 'components/atoms/NotOpenYet'
import { SponsorFormClose } from 'components/atoms/SponsorFormClose'
import { SponsorFormSubmitted } from 'components/atoms/SponsorFormSubmitted'
import { StepsWrapper } from 'components/atoms/StepsWrapper'
import { isFuture, isPast } from 'date-fns'
import { SponsorFormStage } from 'lib/stores/Sponsor/SponsorStore'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import Steps from 'rc-steps'
import React from 'react'
import intl from 'react-intl-universal'
import { paths } from 'routes/paths'
import { isEmpty } from 'utils/isEmpty'
import Stage1 from './Stage1'
import Stage2 from './Stage2'

@inject('stores')
@observer
export default class SponsorForm extends React.Component<{ stores: StoresType }> {
  formWrapperRef: HTMLDivElement | null = null
  state = {
    currentStage: 0
  }

  render() {
    const { stores } = this.props
    const { profileStore, sponsorStore } = stores
    const { profile } = toJS(profileStore)
    const { proposal } = toJS(sponsorStore)
    const { sponsorProposalStartAt,  sponsorProposalFinishAt} = stores.scheduleStore.schedule

    if (!profileStore.isInitialized) {
      return <Loading width={50} height={50}/>
    }

    if (isFuture(sponsorProposalStartAt)) {
      return <NotOpenYet
        title='아직 후원사 모집이 시작되지 않았습니다.'
        buttonText='후원사 안내 보러 가기'
        buttonIntlKey='gnb.account.login'
        link={paths.sponsor.prospectus}
      />
    }

    if (!profileStore.isAgreed) {
      return <FormNeedAuthAgreement />
    }

    if (isPast(sponsorProposalFinishAt)) {
      return <SponsorFormClose />
    }

    if (proposal && proposal.submitted) {
      return <SponsorFormSubmitted />
    }

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
        {this.state.currentStage === SponsorFormStage.stage1 &&
          <Stage1
            stores={stores}
            scrollRef={this.formWrapperRef!}
            toNextStage={() => this.setState({ currentStage: SponsorFormStage.stage2 })}
          />
        }
        {this.state.currentStage === SponsorFormStage.stage2 &&
          <Stage2
            stores={stores}
            scrollRef={this.formWrapperRef!}
            toPrevStage={() => this.setState({ currentStage: SponsorFormStage.stage1 })}
            toNextStage={() => this.setState({ currentStage: SponsorFormStage.completed })}
          />
        }
        {this.state.currentStage === SponsorFormStage.completed &&
          <div>후원사 신청서를 제출했습니다.</div>
        }
      </PaddingWrapper>
    )
  }
}
