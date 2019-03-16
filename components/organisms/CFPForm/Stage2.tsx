import { Button } from 'components/atoms/Button'
import { FormWrapper } from 'components/atoms/ContentWrappers'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import { DurationNode, LanguageNode} from 'lib/apollo_graphql/__generated__/globalTypes'
import { CFPFormStage } from 'lib/stores/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { TEAL } from 'styles/colors'

interface State {
  nameKo: string,
  categoryId: string,
  difficultyId: string,
  backgroundDesc: string,
  duration: DurationNode | null,
  language: LanguageNode | null,
}

@inject('stores')
@observer
export default class CFPFormStage2 extends React.Component<{stores: StoresType}, State> {
  state = {
    nameKo: '',
    categoryId: '',
    difficultyId: '',
    backgroundDesc: '',
    duration: DurationNode.SHORT,
    language: LanguageNode.KOREAN,
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
            stores.cfpStore.setCurrentStage(CFPFormStage.stage3)
          })
        }}>
          <label><IntlText intlKey='asdfasdf'>주제</IntlText></label>
          <input
            type='text'
            value={this.state.nameKo}
            onChange={e => this.setState({ nameKo: e.target.value })}
            aria-required={true}
            required
          />
          <label><IntlText intlKey='asdfasdf'>세션 카테고리</IntlText></label>
          {/* tslint:disable-next-line:react-a11y-no-onchange */}
          <select
            value={this.state.categoryId}
            onBlur={e => this.setState({ categoryId: e.target.value })}
            onChange={e => this.setState({ categoryId: e.target.value })}
            aria-required={true}
            required
          >
            {
              stores.cfpStore.categories.map(category =>
                <option
                  key={category.id}
                  aria-selected={this.state.categoryId === 'category.id' }
                  value={category.id}
                >{category.name}</option>
              )
            }
          </select>
          <fieldset>
            <legend><IntlText intlKey='asdfasdf'>세션 난이도</IntlText></legend>
            {
              stores.cfpStore.difficulties.map(difficulty =>
                <p key={difficulty.id}>
                  <input
                    type='radio'
                    id={difficulty.name}
                    value={difficulty.id}
                    aria-checked={this.state.difficultyId === difficulty.id}
                    checked={this.state.difficultyId === difficulty.id}
                    onChange={() => this.setState({ difficultyId: difficulty.id })}>
                  </input>
                  <label htmlFor={difficulty.name}>{difficulty.name}</label>
                </p>
              )
            }
          </fieldset>
          <label><IntlText intlKey='asdfasdf'>
            세션을 이해하는 데에 필요한 선수 지식
          </IntlText></label>
          <input
            type='text'
            value={this.state.backgroundDesc}
            onChange={e => this.setState({ backgroundDesc: e.target.value })}
            aria-required={true}
            required
          />
          <div role='group'>
            <fieldset>
              <legend>세션 길이</legend>
              <p>
                <input
                  type='radio'
                  id={DurationNode.SHORT}
                  value={DurationNode.SHORT}
                  aria-checked={this.state.duration === DurationNode.SHORT}
                  checked={this.state.duration === DurationNode.SHORT}
                  onChange={() => this.setState({ duration: DurationNode.SHORT })}
                />
                <label htmlFor={DurationNode.SHORT}>25분</label>
              </p>
              <p>
                <input
                  type='radio'
                  id={DurationNode.LONG}
                  value={DurationNode.LONG}
                  aria-checked={this.state.duration === DurationNode.LONG}
                  checked={this.state.duration === DurationNode.LONG}
                  onChange={() => this.setState({ duration: DurationNode.LONG })}
                />
                <label htmlFor={DurationNode.LONG}>45분</label>
              </p>
            </fieldset>
            <fieldset>
              <legend>언어</legend>
              <p>
                <input
                  type='radio'
                  id={LanguageNode.KOREAN}
                  value={LanguageNode.KOREAN}
                  aria-checked={this.state.language === LanguageNode.KOREAN}
                  checked={this.state.language === LanguageNode.KOREAN}
                  onChange={() => this.setState({ language: LanguageNode.KOREAN })}
                />
                <label htmlFor={LanguageNode.KOREAN}>한국어</label>
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
                <label htmlFor={LanguageNode.ENGLISH}>영어</label>
              </p>
            </fieldset>
          </div>
          <FlexSpaceBetweenWrapper style={{ marginTop: 80 }}>
            <Button
              tag='button'
              type='button'
              intlKey='adsfasdfa'
              color={TEAL}
              width={120}
              primary={false}
              onClick={() => {
                stores.cfpStore.setCurrentStage(CFPFormStage.stage1)
              }}
            >이전</Button>
            <div>
              <Button
                tag='button'
                type='button'
                intlKey='adsfasdfa'
                color={TEAL}
                width={120}
                primary={false}
                onClick={() => {
                  stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
                    alert('저장이 완료되었습니다')
                  })
                }}
              >임시 저장</Button>
              <Button
                tag='button'
                type='submit'
                intlKey='adsfasdfa'
                color={TEAL}
                width={120}
                style={{ marginLeft: 10 }}
              >다음</Button>
            </div>
          </FlexSpaceBetweenWrapper>

        </form>
      </FormWrapper>
    )
  }
}
