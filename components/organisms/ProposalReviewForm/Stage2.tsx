import { Button } from 'components/atoms/Button'
import { FormWrapper } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import i18next from 'i18next'
import { LanguageNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { ProposalReviewFormStage } from 'lib/stores/ProposalReview/ProposalReviewStore'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { toast } from 'react-toastify'
import { TEAL } from 'styles/colors'
import { withNamespaces } from '../../../i18n'

type State = {
  categoryIds: string[];
  language: LanguageNode;
}

@observer
export class Stage2 extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement; t: i18next.TFunction}, State> {
  state: State = {
    categoryIds: [],
    language: LanguageNode.KOREAN
  }

  async componentDidMount() {
    this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
    const { stores } = this.props
    if (stores.proposalReviewStore.isReviewAssigned()) {
      stores.proposalReviewStore.setCurrentStage(ProposalReviewFormStage.stage3)
    }
  }

  isFormValid () {
    return this.state.categoryIds.length >= 2
  }

  onChangeCategoryCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { t } = this.props
    const { categoryIds } = this.state
    const categoryId = e.target.value
    const isChecked = !!e.target.checked
    const isExceedSelectionLimit = categoryIds.length > 6 && !!isChecked

    if (isExceedSelectionLimit) {
      toast.error(t('contribute:proposalReview.stages.stage1.exceededSelectionLimit'))

      return
    }

    if (!isChecked) {
      const newCategoryIds = categoryIds
      newCategoryIds.splice(categoryIds.indexOf(categoryId), 1)
      this.setState({ categoryIds: newCategoryIds })
    } else {
      this.setState({ categoryIds: [ ...categoryIds, categoryId] })
    }
  }

  render () {
    const { stores, t } = this.props
    const { categoryIds } = this.state

    return (
      <FormWrapper>
        <form onSubmit={async (e) => {
          e.preventDefault()
          await stores.proposalReviewStore.assignCfpReviews(categoryIds)
          stores.proposalReviewStore.setCurrentStage(ProposalReviewFormStage.stage3)
        }}>
          <fieldset>
            <legend className='required'>
              {t('contribute:proposalReview.stages.stage1.selectCategoryTitle')}
              <strong> ({categoryIds.length}/7)</strong>
            </legend>
            {
              categoryIds &&
              stores &&
              stores.cfpStore.categories.map(category =>
                <p key={category.id}>
                  <input
                    type='checkbox'
                    id={category.name}
                    value={category.id}
                    aria-checked={categoryIds.includes(category.id)}
                    checked={categoryIds.includes(category.id)}
                    onChange={this.onChangeCategoryCheckBox}>
                  </input>
                  <label htmlFor={category.name}>{category.name}</label>
                </p>
              )
            }
          </fieldset>
          <FlexCenterWrapper style={{ marginTop: 80 }}>
            <Button
              type='submit'
              tag='button'
              intlKey='contribute.proposalReview.reviewProposals'
              color={TEAL}
              width={300}
              disabled={!this.isFormValid()}
            >
              선택한 조건에 맞는 발표 제안 검토하기
            </Button>
        </FlexCenterWrapper>
        </form>
      </FormWrapper>
    )
  }
}

export default withNamespaces(['contribute'])(Stage2)
