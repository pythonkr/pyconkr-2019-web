import { CFPFormStage } from 'lib/stores/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'

export enum SessionLength {
  short = 25,
  long = 45
}

export enum SessionLanguage {
  ko = 'korean',
  en = 'english'
}

export enum LevelOfDifficulty {
  beginner = 'beginner',
  intermediate = 'intermediate',
  advanced = 'advanced',
}

interface State {
  sessionTitle: string,
  sessionTitleEn: string,
  category: string,
  briefDescription: string,
  briefDescriptionEn: string,
  sessionLength: SessionLength | null,
  language: SessionLanguage | null,
  levelOfDifficulty: LevelOfDifficulty | null,
}

@inject('stores')
@observer
export default class CFPFormStage2 extends React.Component<{stores: StoresType}, State> {
  state = {
    sessionTitle: '',
    sessionTitleEn: '',
    category: '',
    briefDescription: '',
    briefDescriptionEn: '',
    sessionLength: null,
    language: null,
    levelOfDifficulty: null,
  }

  render () {
    const { stores } = this.props

    return (
      <form onSubmit={() => {
        stores.cfpStore.setCurrentStage(CFPFormStage.stage3)
      }}>
        <label>세션 제목</label>
        <input
          type='readonly'
          value={this.state.sessionTitle}
          onChange={e => this.setState({ sessionTitle: e.target.value })}
          aria-required={true}
          required
        />
        <label>영문 제목</label>
        <input
          type='text'
          value={this.state.sessionTitleEn}
          onChange={e => this.setState({ sessionTitleEn: e.target.value })}
          required
          aria-required={true}
        />
        <label>세션 카테고리</label>
        <select
          value={this.state.category}
          onBlur={e => this.setState({ category: e.target.value })}
          aria-required={true}
          required
        >
          <option
            aria-selected={this.state.category === 'grapefruit'}
            value='grapefruit'
          >Grapefruit</option>
          <option
            aria-selected={this.state.category === 'grapefruit'}
            value='lime'
          >Lime</option>
          <option
            selected
            aria-selected={this.state.category === 'grapefruit'}
            value='coconut'
          >Coconut</option>
          <option
            aria-selected={this.state.category === 'grapefruit'}
            value='mango'
          >Mango</option>
        </select>
        <label>간략한 설명</label>
        <input
          type='text'
          value={this.state.briefDescription}
          onChange={e => this.setState({ briefDescription: e.target.value })}
          aria-required={true}
          required
        />
        <label>간략한 설명 - 영문</label>
        <input
          type='text'
          value={this.state.briefDescriptionEn}
          onChange={e => this.setState({ briefDescriptionEn: e.target.value })}
          aria-required={true}
          required
        />
        <fieldset>
          <legend>세션 길이</legend>
          <label>25분</label>
          <input
            type='radio'
            value={SessionLength.short}
            aria-checked={this.state.sessionLength === SessionLength.short}
            checked={this.state.sessionLength === SessionLength.short}
            onChange={() => this.setState({ sessionLength: SessionLength.short })}
          />
          <label>45분</label>
          <input
            type='radio'
            value={SessionLength.long}
            aria-checked={this.state.sessionLength === SessionLength.long}
            checked={this.state.sessionLength === SessionLength.long}
            onChange={() => this.setState({ sessionLength: SessionLength.long })}
          />
        </fieldset>
        <fieldset>
          <legend>언어</legend>
          <label>한국어</label>
          <input
            type='radio'
            value={SessionLanguage.ko}
            aria-checked={this.state.language === SessionLanguage.ko}
            checked={this.state.language === SessionLanguage.ko}
            onChange={() => this.setState({ language: SessionLanguage.ko })}
          />
          <label>영어</label>
          <input
            type='radio'
            value={SessionLanguage.en}
            aria-checked={this.state.language === SessionLanguage.en}
            checked={this.state.language === SessionLanguage.en}
            onChange={() => this.setState({ language: SessionLanguage.en })}
          />
        </fieldset>
        <fieldset>
          <legend>세션 난이도</legend>
          <label>초보</label>
          <input
            type='radio'
            value={LevelOfDifficulty.beginner}
            aria-checked={this.state.levelOfDifficulty === LevelOfDifficulty.beginner}
            checked={this.state.levelOfDifficulty === LevelOfDifficulty.beginner}
            onChange={() => this.setState({ levelOfDifficulty: LevelOfDifficulty.beginner })}
          />
          <label>중급</label>
          <input
            type='radio'
            value={LevelOfDifficulty.intermediate}
            aria-checked={this.state.levelOfDifficulty === LevelOfDifficulty.intermediate}
            checked={this.state.levelOfDifficulty === LevelOfDifficulty.intermediate}
            onChange={() => this.setState({ levelOfDifficulty: LevelOfDifficulty.intermediate })}
          />
          <label>고급</label>
          <input
            type='radio'
            value={LevelOfDifficulty.advanced}
            aria-checked={this.state.levelOfDifficulty === LevelOfDifficulty.advanced}
            checked={this.state.levelOfDifficulty === LevelOfDifficulty.advanced}
            onChange={() => this.setState({ levelOfDifficulty: LevelOfDifficulty.advanced })}
          />
        </fieldset>
        <button type='button' onClick={() => {
          stores.cfpStore.setCurrentStage(CFPFormStage.stage1)
        }}>이전</button>
        <button type='button'>임시 저장</button>
        <button type='submit'>다음</button>
      </form>
    )
  }
}
