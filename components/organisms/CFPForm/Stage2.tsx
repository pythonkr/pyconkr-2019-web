import { CFPFormStage } from 'lib/stores/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import { FormWrapper } from 'components/atoms/ContentWrappers'
import React from 'react'
import { LanguageNode, DurationNode} from 'lib/apollo_graphql/__generated__/globalTypes';





interface State {
  nameKo: string,
  nameEn: string,
  categoryId: string,
  difficultyId: string,
  shortDescKo: string,
  shortDescEn: string,
  duration: DurationNode | null,
  language: LanguageNode | null,
}

@inject('stores')
@observer
export default class CFPFormStage2 extends React.Component<{stores: StoresType}, State> {
  state = {
    nameKo: '',
    nameEn: '',
    categoryId: '',
    difficultyId: '',
    shortDescKo: '',
    shortDescEn: '',
    duration: DurationNode.SHORT,
    language: LanguageNode.KOREAN,
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log(this.state)
          stores.cfpStore.createOrUpdatePresentation(this.state).then(()=>{
            stores.cfpStore.setCurrentStage(CFPFormStage.stage3)
          })
        }}>
          <label>세션 제목</label>
          <input
            type='text'
            value={this.state.nameKo}
            onChange={e => this.setState({ nameKo: e.target.value })}
            aria-required={true}
            required
          />
          <label>영문 제목</label>
          <input
            type='text'
            value={this.state.nameEn}
            onChange={e => this.setState({ nameEn: e.target.value })}
            required
            aria-required={true}
          />
          <label>세션 카테고리</label>
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
                aria-selected={this.state.categoryId === 'category.id' }
                key={category.id}
                value={category.id}
              >{category.name}</option>
            )
          }
          </select>
          <label>간략한 설명</label>
          <input
            type='text'
            value={this.state.shortDescKo}
            onChange={e => this.setState({ shortDescKo: e.target.value })}
            aria-required={true}
            required
          />
          <label>간략한 설명 - 영문</label>
          <input
            type='text'
            value={this.state.shortDescEn}
            onChange={e => this.setState({ shortDescEn: e.target.value })}
            aria-required={true}
            required
          />
          <fieldset>
            <legend>세션 길이</legend>
            <label>25분</label>
            <input
              type='radio'
              value={DurationNode.SHORT}
              aria-checked={this.state.duration === DurationNode.SHORT}
              checked={this.state.duration === DurationNode.SHORT}
              onChange={() => this.setState({ duration: DurationNode.SHORT })}
            />
            <label>45분</label>
            <input
              type='radio'
              value={DurationNode.LONG}
              aria-checked={this.state.duration === DurationNode.LONG}
              checked={this.state.duration === DurationNode.LONG}
              onChange={() => this.setState({ duration: DurationNode.LONG })}
            />
          </fieldset>
          <fieldset>
            <legend>언어</legend>
            <label>한국어</label>
            <input
              type='radio'
              value={LanguageNode.KOREAN}
              aria-checked={this.state.language === LanguageNode.KOREAN}
              checked={this.state.language === LanguageNode.KOREAN}
              onChange={() => this.setState({ language: LanguageNode.KOREAN })}
            />
            <label>영어</label>
            <input
              type='radio'
              value={LanguageNode.ENGLISH}
              aria-checked={this.state.language === LanguageNode.ENGLISH}
              checked={this.state.language === LanguageNode.ENGLISH}
              onChange={() => this.setState({ language: LanguageNode.ENGLISH })}
            />
          </fieldset>
          <fieldset>
            <legend>세션 난이도</legend>
            {
              stores.cfpStore.difficulties.map(difficulty =>
                <>
                  <input
                    type='radio'
                    value={difficulty.id}
                    key={difficulty.id}
                    aria-checked={this.state.difficultyId === difficulty.id}
                    checked={this.state.difficultyId === difficulty.id}
                    onChange={() => this.setState({ difficultyId: difficulty.id })}>
                  </input>
                  <label>{difficulty.name}</label>
                </>
              )

            }
          </fieldset>
          <button type='button' onClick={() => {
            stores.cfpStore.setCurrentStage(CFPFormStage.stage1)
          }}>이전</button>
          <button type='button' onClick={() => {
            stores.cfpStore.createOrUpdatePresentation(this.state).then(()=>{
              alert('저장이 완료되었습니다')
            })
          }}>임시 저장</button>
          <button type='submit'>다음</button>
        </form>
      </FormWrapper>
    )
  }
}
