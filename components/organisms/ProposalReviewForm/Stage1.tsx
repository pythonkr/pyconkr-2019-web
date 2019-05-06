import { Button } from 'components/atoms/Button'
import { FormWrapper, H2, H3, Li, Paragraph, Ul } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import i18next from 'i18next'
import { ProposalReviewFormStage } from 'lib/stores/ProposalReview/ProposalReviewStore'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { TEAL } from 'styles/colors'

@observer
export default class Stage1 extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement; t: i18next.TFunction}> {
  render () {
    const { stores } = this.props

    return (
      <FormWrapper style={{ padding: '44px 20px 60px 20px' }}>
        <form onSubmit={async (e) => {
          e.preventDefault()
          stores.proposalReviewStore.setCurrentStage(ProposalReviewFormStage.stage2)
        }}>
          <H2 id='contribute.cfpGuide.notice.title'>오픈리뷰를 위한 안내</H2>
          <H3 id='contribute.cfpGuide.notice.title'>오픈리뷰란?</H3>
          <Paragraph style={{ fontSize: '17px' }}>
            {'파이콘 한국 2019에 제출된 발표 제안들을 참여자가 직접 검토하고 의견을 남길 수 있는 검토 방식입니다. 분류된 카테고리에 대한 배경지식이 있는 참여자라면 누구나 제안서를 읽고 검토 의견을 제출할 수 있습니다. 파이콘 한국 2019에서 만나고 싶은 발표에 여러분들의 의견을 마음껏 작성해주세요 :)'}
          </Paragraph>
          <H3 id='contribute.cfpGuide.notice.title'>제출된 리뷰 의견은 어떻게 사용되나요?</H3>
          <Paragraph style={{ fontSize: '17px' }}>
            {'파이콘 준비위원회가 제안서를 검토할 때 참고 자료로써 활용됩니다.'}
          </Paragraph>
          <H3 id='contribute.cfpGuide.notice.title'>오픈리뷰는 어덯게 진행되나요?</H3>
          <Paragraph style={{ fontSize: '17px' }}>
            {'1. 리뷰할 카테고리를 2개 이상 선택합니다.'}
          </Paragraph>
          <Ul style={{ color: '#4a4a4a' }}>
            <Li>{'한번 선택한 카테고리는 변경할 수 없으니 이 점 유의 부탁드립니다.'}</Li>
          </Ul>
          <Paragraph style={{ fontSize: '17px' }}>
            {'2. 선택한 카테고리에서 임의로 7개의 제안서가 리뷰 참여자에게 할당됩니다.'}
          </Paragraph>
          <Ul style={{ color: '#4a4a4a' }}>
            <Li>{'특정 제안서에 리뷰하기 위해 반복 할당하는 것을 방지하기 위해 한 번 할당된 제안서는 변경이 되지 않습니다.'}</Li>
          </Ul>
          <Paragraph style={{ fontSize: '17px' }}>
            {'3. 선정된 제안서를 읽고 의견을 작성합니다.'}
          </Paragraph>
          <Paragraph style={{ fontSize: '17px' }}>
            {'4. 리뷰 의견을 제출하면 오픈 리뷰가 완료됩니다.'}
          </Paragraph>
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
