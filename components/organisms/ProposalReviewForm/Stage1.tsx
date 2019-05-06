import { Button } from 'components/atoms/Button'
import { FormWrapper } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import { ProposalReviewFormStage } from 'lib/stores/ProposalReview/ProposalReviewStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { TEAL } from 'styles/colors'

type State = {
  // todo : implement here
}

@inject('stores')
@observer
export default class Stage1 extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement}, State> {
  state: State = {
    // todo : implement here
  }

  async componentDidMount() {
    // todo : implement here
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={async (e) => {
          e.preventDefault()
          stores.proposalReviewStore.setCurrentStage(ProposalReviewFormStage.stage2)
        }}>
          <p>오픈 리뷰란 블라블라</p>

          <FlexCenterWrapper style={{ marginTop: 80 }}>
            <Button
              type='submit'
              tag='button'
              intlKey='contribute.talkProposal.application.stages.stages1.button'
              color={TEAL}
              width={300}
            >
            시작하기!
            </Button>
        </FlexCenterWrapper>
        </form>
      </FormWrapper>
    )
  }
}
