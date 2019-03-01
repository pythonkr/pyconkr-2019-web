import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from 'pages/_app';
import { CFPFormStage } from 'lib/stores/CFPStore';

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
          required
        />
        <label>영문 제목</label>
        <input
          type='text'
          value={this.state.sessionTitleEn}
          onChange={e => this.setState({ sessionTitleEn: e.target.value })}
          required
        />
        <label>세션 카테고리</label>
        <select
          value={this.state.category}
          onChange={e => this.setState({ category: e.target.value })}
          required
        >
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option selected value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
        <label>간략한 설명</label>
        <input
          type='text'
          value={this.state.briefDescription}
          onChange={e => this.setState({ briefDescription: e.target.value })}
          required
        />
        <label>간략한 설명 - 영문</label>
        <input
          type='text'
          value={this.state.briefDescriptionEn}
          onChange={e => this.setState({ briefDescriptionEn: e.target.value })}
          required
        />
        <fieldset>
          <legend>세션 길이</legend>
          <label>25분</label>
          <input
            type='radio'
            value={SessionLength.short}
            checked={this.state.sessionLength === SessionLength.short}
            onChange={() => this.setState({ sessionLength: SessionLength.short })}
            required
          />
          <label>45분</label>
          <input
            type='radio'
            value={SessionLength.long}
            checked={this.state.sessionLength === SessionLength.long}
            onChange={() => this.setState({ sessionLength: SessionLength.long })}
            required
          />
        </fieldset>
        <fieldset>
          <legend>언어</legend>
          <label>한국어</label>
          <input
            type='radio'
            value={SessionLanguage.ko}
            checked={this.state.language === SessionLanguage.ko}
            onChange={() => this.setState({ language: SessionLanguage.ko })}
            required
          />
          <label>영어</label>
          <input
            type='radio'
            value={SessionLanguage.en}
            checked={this.state.language === SessionLanguage.en}
            onChange={() => this.setState({ language: SessionLanguage.en })}
            required
          />
        </fieldset>
        <fieldset>
          <legend>세션 난이도</legend>
          <label>초보</label>
          <input
            type='radio'
            value={LevelOfDifficulty.beginner}
            checked={this.state.levelOfDifficulty === LevelOfDifficulty.beginner}
            onChange={() => this.setState({ levelOfDifficulty: LevelOfDifficulty.beginner })}
            required
          />
          <label>중급</label>
          <input
            type='radio'
            value={LevelOfDifficulty.intermediate}
            checked={this.state.levelOfDifficulty === LevelOfDifficulty.intermediate}
            onChange={() => this.setState({ levelOfDifficulty: LevelOfDifficulty.intermediate })}
            required
          />
          <label>고급</label>
          <input
            type='radio'
            value={LevelOfDifficulty.advanced}
            checked={this.state.levelOfDifficulty === LevelOfDifficulty.advanced}
            onChange={() => this.setState({ levelOfDifficulty: LevelOfDifficulty.advanced })}
            required
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
