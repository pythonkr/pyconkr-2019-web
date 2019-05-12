import { EventClose } from 'components/atoms/EventClose'
import { FormNeedAuthAgreement } from 'components/atoms/FormNeedAuthAgreement'
import { PaddingWrapper } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import { ReviewFormSubmitted } from 'components/atoms/ReviewFormSubmitted'
import { NotOpenYet } from 'components/atoms/NotOpenYet'

import { StepsWrapper } from 'components/atoms/StepsWrapper'
import { isPast, isFuture } from 'date-fns'
import i18next from 'i18next'
import { ProposalReviewFormStage } from 'lib/stores/ProposalReview/ProposalReviewStore'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import Steps from 'rc-steps'
import React from 'react'
import { isEmpty } from 'utils/isEmpty'
import { withNamespaces } from '../../../i18n'
import Stage1 from './Stage1'
import Stage2 from './Stage2'
import Stage3 from './Stage3'

@observer
export class ProposalReviewForm extends React.Component<{
  stores: StoresType;
  t: i18next.TFunction;
}> {
  formWrapperRef: HTMLDivElement | null = null

  async componentDidMount() {
    const { scheduleStore, cfpStore, proposalReviewStore } = this.props.stores
    if (!scheduleStore.isInitialized) scheduleStore.initialize()
    if (!cfpStore.isInitialized) cfpStore.initialize()
    if (!proposalReviewStore.isInitialized) proposalReviewStore.initialize()
  }

  render() {
    const { stores, t } = this.props
    const { scheduleStore, profileStore, cfpStore, proposalReviewStore } = stores
    const { presentationReviewStartAt, presentationReviewFinishAt } = scheduleStore.schedule
    const { categories } = toJS(cfpStore)
    const { currentStage } = toJS(proposalReviewStore)

    if (!profileStore.isInitialized) {
      return <Loading width={50} height={50}/>
    }

    if (isFuture(presentationReviewStartAt)) {
      return <NotOpenYet
        title='아직 오픈 리뷰 기간이 시작되지 않았습니다.'
        titleIntlKey='contribute.proposalReview.schedule.notOpenYet'
      />
    }

    if (!profileStore.isAgreed) {
      return <FormNeedAuthAgreement />
    }

    if (isPast(presentationReviewFinishAt)) {
      return <EventClose 
        title='오픈 리뷰 기간이 끝났습니다.'
        desc='오픈 리뷰 의견을 수렴하여 파이콘 한국의 발표가 확정될 예정입니다.🙆‍'
      />
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
      proposalReviewStore.isCfpReviewSubmitted ? <ReviewFormSubmitted />
      :
      <PaddingWrapper ref={ref => this.formWrapperRef = ref}>
        <StepsWrapper>
          <Steps current={currentStage} labelPlacement='vertical'>
            {steps.map(step => <Steps.Step title={step} key={step} />)}
          </Steps>
        </StepsWrapper>
        {currentStage === ProposalReviewFormStage.stage1 &&
          <Stage1
            stores={stores}
            scrollRef={this.formWrapperRef!}
            t={t}
          />
        }
        {currentStage === ProposalReviewFormStage.stage2 &&
          <Stage2
            stores={stores}
            scrollRef={this.formWrapperRef!}
            t={t}
          />
        }
        {currentStage === ProposalReviewFormStage.stage3 &&
          <Stage3
            stores={stores}
            scrollRef={this.formWrapperRef!}
            t={t}
          />
        }
      </PaddingWrapper>
    )
  }
}

export default withNamespaces(['contribute'])(ProposalReviewForm)
