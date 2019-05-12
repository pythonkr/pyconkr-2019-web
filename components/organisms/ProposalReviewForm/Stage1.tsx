import { Button } from 'components/atoms/Button'
import { FormWrapper, H2, H3, Li, Paragraph, Ul } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import i18next from 'i18next'
import { ProposalReviewFormStage } from 'lib/stores/ProposalReview/ProposalReviewStore'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { TEAL } from 'styles/colors'
import { withNamespaces } from '../../../i18n'

@observer
export class Stage1 extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement; t: i18next.TFunction}> {
  render () {
    const { stores, t } = this.props

    return (
      <FormWrapper style={{ padding: '44px 20px 60px 20px' }}>
        <form onSubmit={async (e) => {
          e.preventDefault()
          stores.proposalReviewStore.setCurrentStage(ProposalReviewFormStage.stage2)
        }}>
          <H2>
            {t('contribute:proposalReview.stages.stage1.header')}
          </H2>
          <H3>
            {t('contribute:proposalReview.stages.stage1.header1')}
          </H3>
          <Paragraph>
            {t('contribute:proposalReview.stages.stage1.desc1')}
          </Paragraph>
          <H3>
            {t('contribute:proposalReview.stages.stage1.header2')}
          </H3>
          <Paragraph>
            {t('contribute:proposalReview.stages.stage1.desc2')}
          </Paragraph>
          <H3>
            {t('contribute:proposalReview.stages.stage1.header3')}
          </H3>
          <Paragraph>
            {t('contribute:proposalReview.stages.stage1.desc3-1')}
          </Paragraph>
          <Ul style={{ color: '#4a4a4a' }}>
            <Li>
              {t('contribute:proposalReview.stages.stage1.desc3-1-1')}
            </Li>
          </Ul>
          <Paragraph>
            {t('contribute:proposalReview.stages.stage1.desc3-2')}
          </Paragraph>
          <Ul style={{ color: '#4a4a4a' }}>
            <Li>
              {t('contribute:proposalReview.stages.stage1.desc3-2-1')}
            </Li>
          </Ul>
          <Paragraph>
            {t('contribute:proposalReview.stages.stage1.desc3-3')}
          </Paragraph>
          <Paragraph>
            {t('contribute:proposalReview.stages.stage1.desc3-4')}
          </Paragraph>
          <FlexCenterWrapper style={{ marginTop: 80 }}>
            <Button
              type='submit'
              tag='button'
              intlKey='contribute.proposalReview.startReview'
              color={TEAL}
              width={300}
            >
            리뷰 시작하기👩‍💻👨‍💻
            </Button>
        </FlexCenterWrapper>
        </form>
      </FormWrapper>
    )
  }
}


export default withNamespaces(['contribute'])(Stage1)