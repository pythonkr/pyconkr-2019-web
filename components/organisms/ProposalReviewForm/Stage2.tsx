import { Button } from 'components/atoms/Button'
import { FormWrapper } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import i18next from 'i18next'
import { ProposalReviewFormStage } from 'lib/stores/ProposalReview/ProposalReviewStore'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { TEAL } from 'styles/colors'

@observer
export default class Stage2 extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement; t: i18next.TFunction}> {

  async componentDidMount() {
    this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
  }

  isFormValid () {
    const { stores } = this.props
    const { assignedCfpReviews } = toJS(stores.proposalReviewStore)

    return assignedCfpReviews.length >= 7 && assignedCfpReviews.every(review => review.comment.length > 20)
  }

  renderProposalsToReview = () => {
    const { stores, t } = this.props
    const { assignedCfpReviews } = stores.proposalReviewStore

    return assignedCfpReviews && assignedCfpReviews.map((review, index) => {
        const { presentation } = review
        if (!presentation) {
          return null
        }

        return (
          <fieldset key={`${presentation.name}_${index}`}>
            <legend className='required'>
              {t('contribute:proposalReview.stages.stage3.presentationName', { number: index + 1, name: presentation.name })}
            </legend>
            <p style={{ marginBottom: 5 }}>
              {presentation.category && presentation.category.name} /
              {presentation.difficulty && presentation.difficulty.name} /
              {t('contribute:proposalReview.stages.stage3.backgroundDesc', { backgroundDesc: presentation.backgroundDesc })} /
              {presentation.duration}
            </p>
            <p  style={{ marginBottom: 20 }}>
              {presentation.detailDesc}
            </p>
            <textarea
              value={review.comment}
              onChange={e => review.setComment(e.target.value)}
              aria-required={true}
              style={{ height: 100, marginBottom: 10 }}
              maxLength={1000}
              minLength={20}
              required
            />
            <div
              style={{
                textAlign: 'right',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              {review.comment.length < 20 && (
                <div
                  style={{ color: 'red' }}
                >
                  리뷰는 최소 20자 이상 입력하셔야 합니다.
                </div>
              )}
              <div
                style={{ marginLeft: 'auto' }}
              >
                <span
                  style={{ color: review.comment.length < 20 ? 'red ':'black' }}
                >
                  {review.comment.length}
                </span>
                /1000
              </div>
            </div>
          </fieldset>
        )
    })
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={async (e) => {
          e.preventDefault()
          await stores.proposalReviewStore.submitCfpReviews()
          stores.proposalReviewStore.setCurrentStage(ProposalReviewFormStage.stage3)
        }}>
          {this.renderProposalsToReview()}
          <FlexCenterWrapper style={{ marginTop: 80 }}>
            <Button
              type='submit'
              tag='button'
              intlKey='contribute.talkProposal.application.stages.stages1.button'
              color={TEAL}
              width={300}
              disabled={!this.isFormValid()}
            >
              검토 의견 제출하기
            </Button>
          </FlexCenterWrapper>
        </form>
      </FormWrapper>
    )
  }
}
