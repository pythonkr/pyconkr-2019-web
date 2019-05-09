import { FormNeedAuthAgreement } from 'components/atoms/FormNeedAuthAgreement'
import { PaddingWrapper } from 'components/atoms/FormNeedsLogin'
import { FormSubmitted } from 'components/atoms/FormSubmitted'
import { Loading } from 'components/atoms/Loading'
import { NotOpenYet } from 'components/atoms/NotOpenYet'
import { PresentationFormClose } from 'components/atoms/PresentationFormClose'
import { StepsWrapper } from 'components/atoms/StepsWrapper'
import Stage1 from 'components/organisms/CFPForm/Stage1'
import Stage2 from 'components/organisms/CFPForm/Stage2'
import Stage3 from 'components/organisms/CFPForm/Stage3'
import Stage4 from 'components/organisms/CFPForm/Stage4'
import { isFuture, isPast } from 'date-fns'
import { CFPFormStage } from 'lib/stores/CFP/CFPStore'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import Steps from 'rc-steps'
import React from 'react'
import intl from 'react-intl-universal'
import { paths } from 'routes/paths'
import { isEmpty } from 'utils/isEmpty'

@inject('stores')
@observer
export default class CFPForm extends React.Component<{ stores: StoresType }> {
  formWrapperRef: HTMLDivElement | null = null

  async componentDidMount() {
    const { stores } = this.props
    const { cfpStore, scheduleStore } = stores
    if (!cfpStore.isInitialized) cfpStore.initialize()
    if (!scheduleStore.isInitialized) scheduleStore.initialize()
  }

  render() {
    const { stores } = this.props
    const { profileStore, cfpStore, scheduleStore } = stores
    const { profile } = toJS(profileStore)
    const { currentStage, categories, proposal, difficulties, isInitialized } = toJS(cfpStore)
    const { presentationProposalStartAt,  presentationProposalFinishAt} = scheduleStore.schedule

    if (!stores.profileStore.isInitialized || !isInitialized) {
      return <Loading width={50} height={50}/>
    }

    if (isFuture(presentationProposalStartAt)) {
      return <NotOpenYet
        title='아직 발표 제안 모집이 시작되지 않았습니다.'
        buttonText='발표안 작성 가이드 보러 가기'
        buttonIntlKey='gnb.account.login'
        link={paths.contribute.cfpDetailedGuide}
      />
    }

    if (!stores.profileStore.isAgreed) {
      return <FormNeedAuthAgreement />
    }

    if (isPast(presentationProposalFinishAt)) {
      return <PresentationFormClose />
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
