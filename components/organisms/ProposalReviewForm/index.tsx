import { FormNeedAuthAgreement } from 'components/atoms/FormNeedAuthAgreement'
import { PaddingWrapper } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import { NotOpenYet } from 'components/atoms/NotOpenYet'
import { PresentationFormClose } from 'components/atoms/PresentationFormClose'
import { StepsWrapper } from 'components/atoms/StepsWrapper'
import { isFuture, isPast } from 'date-fns'
import { ProposalReviewFormStage } from 'lib/stores/ProposalReview/ProposalReviewStore'
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
import Stage3 from './Stage3'

@inject('stores')
@observer
export default class ProposalReviewForm extends React.Component<{ stores: StoresType }> {
  formWrapperRef: HTMLDivElement | null = null

  async componentDidMount() {
    const { scheduleStore, cfpStore } = this.props.stores
    if (!scheduleStore.isInitialized) scheduleStore.initialize()
    if (!cfpStore.isInitialized) cfpStore.initialize()
  }

  render() {
    const { scheduleStore, profileStore, cfpStore, proposalReviewStore } = this.props.stores
    const { presentationReviewStartAt,  presentationReviewFinishAt } = scheduleStore.schedule
    const { categories } = toJS(cfpStore)
    const { currentStage } = toJS(proposalReviewStore)

    if (!profileStore.isInitialized) {
      return <Loading width={50} height={50}/>
    }

    // if (isFuture(presentationReviewStartAt)) {
    //   return <NotOpenYet
    //     title='아직 발표 제안 검토가 시작되지 않았습니다.'
    //     buttonText='다른 공헌 방법 보기'
    //     buttonIntlKey='asdfkljasldkfj'
    //     link={paths.contribute.overview}
    //   />
    // }

    if (!profileStore.isAgreed) {
      return <FormNeedAuthAgreement />
    }

    if (isPast(presentationReviewFinishAt)) {
      return <PresentationFormClose />
    }

    if (isEmpty(categories)) {
      return (
        <div>
          Oops something wrong. Click to refresh form.
          <button onClick={() => cfpStore.retrieveCategories()}>
            refresh
          </button>
        </div>
      )
    }

    // TODO: implement with review submitted from store
    // if (proposal && proposal.submitted) {
    //   return <FormSubmitted />
    // }

    if (isEmpty(profileStore.profile)) {
      return (
        <div>
          Oops something wrong. Click to refresh form.
          <button onClick={() => profileStore.retrieveMe()}>
            refresh
          </button>
        </div>
      )
    }

    const steps = [
      intl.get('contribute.talkProposal.application.stages.stages1.header').d('카테고리와 언어'),
      intl.get('contribute.talkProposal.application.stages.stages2.header').d('제안서별 의견 남기기'),
      intl.get('contribute.talkProposal.application.stages.stages3.header').d('제출'),
    ]

    return (
      <PaddingWrapper ref={ref => this.formWrapperRef = ref}>
        <StepsWrapper>
          <Steps current={currentStage} labelPlacement='vertical'>
            {steps.map(step => <Steps.Step title={step} key={step} />)}
          </Steps>
        </StepsWrapper>
        {currentStage === ProposalReviewFormStage.stage1 &&
          <Stage1
            stores={this.props.stores}
            scrollRef={this.formWrapperRef!}
          />
        }
        {currentStage === ProposalReviewFormStage.stage2 &&
          <Stage2
            stores={this.props.stores}
            scrollRef={this.formWrapperRef!}
          />
        }
        {currentStage === ProposalReviewFormStage.stage3 &&
          <Stage3
            stores={this.props.stores}
            scrollRef={this.formWrapperRef!}
          />
        }
      </PaddingWrapper>
    )
  }
}
