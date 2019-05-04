import { Button } from 'components/atoms/Button'
import { FormWrapper } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import i18next from 'i18next';
import { LanguageNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { ProposalReviewFormStage } from 'lib/stores/ProposalReview/ProposalReviewStore'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { toast } from 'react-toastify'
import { TEAL } from 'styles/colors'

type State = {
  categoryIds: string[];
  language: LanguageNode;
}

@observer
export default class Stage1 extends React.Component<{stores: StoresType; scrollRef: HTMLDivElement; t: i18next.TFunction}, State> {
  state: State = {
    categoryIds: [],
    language: LanguageNode.KOREAN
  }

  async componentDidMount() {
    this.props.scrollRef && window.scrollTo(0, this.props.scrollRef.offsetTop)
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
    const { stores } = this.props
    const { categoryIds } = this.state

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          stores.proposalReviewStore.selectCategoriesAndOthers().then(() => {
            stores.proposalReviewStore.setCurrentStage(ProposalReviewFormStage.stage2)
          })
        }}>
          <fieldset>
            <legend className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item3'>
                세션 난이도
              </IntlText>
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
          <fieldset>
              <legend className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item6.header'>
                  언어
                </IntlText>
              </legend>
              <p>
                <input
                  type='radio'
                  id={LanguageNode.KOREAN}
                  value={LanguageNode.KOREAN}
                  aria-checked={this.state.language === LanguageNode.KOREAN}
                  checked={this.state.language === LanguageNode.KOREAN}
                  onChange={() => this.setState({ language: LanguageNode.KOREAN })}
                />
                <label htmlFor={LanguageNode.KOREAN}>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item6.sub1'>
                    한국어
                  </IntlText>
                </label>
              </p>
              <p>
                <input
                  type='radio'
                  id={LanguageNode.ENGLISH}
                  value={LanguageNode.ENGLISH}
                  aria-checked={this.state.language === LanguageNode.ENGLISH}
                  checked={this.state.language === LanguageNode.ENGLISH}
                  onChange={() => this.setState({ language: LanguageNode.ENGLISH })}
                />
                <label htmlFor={LanguageNode.ENGLISH}>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item6.sub2'>
                    영어
                  </IntlText>
                </label>
              </p>
            </fieldset>
            <FlexCenterWrapper style={{ marginTop: 80 }}>
              <Button
                type='submit'
                tag='button'
                intlKey='contribute.talkProposal.application.stages.stages1.button'
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
