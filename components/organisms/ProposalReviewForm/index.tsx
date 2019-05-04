import { FormNeedAuthAgreement } from 'components/atoms/FormNeedAuthAgreement'
import { PaddingWrapper } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import { NotOpenYet } from 'components/atoms/NotOpenYet'
import { PresentationFormClose } from 'components/atoms/PresentationFormClose'
import { StepsWrapper } from 'components/atoms/StepsWrapper'
import { isFuture, isPast } from 'date-fns'
import i18next from 'i18next'
import { ProposalReviewFormStage } from 'lib/stores/ProposalReview/ProposalReviewStore'
import { toJS } from 'mobx'
import { StoresType } from 'pages/_app'
import Steps from 'rc-steps'
import React from 'react'
import intl from 'react-intl-universal'
import { paths } from 'routes/paths'
import { isEmpty } from 'utils/isEmpty'
import { withNamespaces } from '../../../i18n'
import Stage1 from './Stage1'
import Stage2 from './Stage2'
import Stage3 from './Stage3'

export class ProposalReviewForm extends React.Component<{
  stores: StoresType;
  t: i18next.TFunction;
}> {
  formWrapperRef: HTMLDivElement | null = null

  async componentDidMount() {
    const { scheduleStore, cfpStore } = this.props.stores
    if (!scheduleStore.isInitialized) scheduleStore.initialize()
    if (!cfpStore.isInitialized) cfpStore.initialize()
  }

  render() {
    const { stores, t } = this.props
    const { scheduleStore, profileStore, cfpStore, proposalReviewStore } = stores
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
      t('contribute:proposalReview.stages.stage1.header'),
      t('contribute:proposalReview.stages.stage2.header'),
      t('contribute:proposalReview.stages.stage3.header')
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

export default withNamespaces(['contribute'])(ProposalReviewForm)
