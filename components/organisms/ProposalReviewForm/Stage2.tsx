import { Button } from 'components/atoms/Button'
import { FormWrapper } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import { StageButtonGroup } from 'components/organisms/CFPForm/StageButtonGroup'
import { LanguageNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { Comment, ProposalReviewFormStage } from 'lib/stores/ProposalReview/ProposalReviewStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { TEAL } from 'styles/colors'
import { toJS } from 'mobx';

type State = {
  comments: Comment[];
}

@inject('stores')
@observer
export default class Stage2 extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement}, State> {
  state: State = {
    comments: Array.from({ length: 7 }).map((_, index) => ({
      proposalId: index,
      text: ''
    }))
  }

  async componentDidMount() {
    const { stores } = this.props
    const { proposalsToReview } = toJS(stores.proposalReviewStore)

    this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
    this.setState({
      comments: proposalsToReview.map((proposal) => ({
        proposalId: proposal.id,
        text: ''
      }))
    })
  }

  isFormValid () {
    return this.state.comments.length >= 7 &&
      this.state.comments.every((comment) => comment.text.length > 20)
  }

  render () {
    const { stores } = this.props
    const { proposalsToReview } = toJS(stores.proposalReviewStore)

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          stores.proposalReviewStore.selectCategoriesAndOthers().then(() => {
            stores.proposalReviewStore.setCurrentStage(ProposalReviewFormStage.stage2)
          })
        }}>
          {proposalsToReview.map((proposal, index) => {
            return <fieldset>
              <legend className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.sub1'>
                  발표 제안 {index + 1}: {proposal.name}
                </IntlText>
              </legend>
              <p style={{ marginBottom: 5 }}>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.desc1'>
                {proposal.category}
                </IntlText> / <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.desc1'>
                  {proposal.difficulty}
                </IntlText> / <IntlText   intlKey='contribute.talkProposal.application.stages.stages3.item1.desc1'>
                  필요한 배경지식: {proposal.backgroundDesc}
                </IntlText> / <IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.desc1'>
                {proposal.duration}
              </IntlText>
              </p>
              <p  style={{ marginBottom: 20 }}><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.desc1'>
                {proposal.detailDesc}
              </IntlText></p>
              <textarea
                value={this.state.comments[index].text}
                onChange={e => this.setState({
                  comments: this.state.comments.map((comment) => ({
                    ...comment,
                    text: comment.proposalId === proposal.id ? e.target.value : comment.text
                  }))
                })}
                aria-required={true}
                style={{ height: 100, marginBottom: 10 }}
                required
              />
            </fieldset>
          })}
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
