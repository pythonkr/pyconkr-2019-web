import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from 'pages/_app';
import { CFPFormStage } from 'lib/stores/CFPStore';

interface State {
  detailedDescription: string,
  requirements: string,
  previousPresentation: boolean | null,
  previouslyPresentedEvent: string,
  slideLink: string,
  comment: string
}

@inject('stores')
@observer
export default class CFPFormStage3 extends React.Component<{stores: StoresType}, State> {
  state = {
    detailedDescription: '',
    requirements: '',
    previousPresentation: null,
    previouslyPresentedEvent: '',
    slideLink: '',
    comment: ''
  }

  render () {
    const { stores } = this.props

    return (
      <form onSubmit={() => {
        stores.cfpStore.setCurrentStage(CFPFormStage.stage4)
      }}>
        <label>자세한 설명</label>
        <input
          type='readonly'
          value={this.state.detailedDescription}
          onChange={e => this.setState({ detailedDescription: e.target.value })}
          required
        />
        <label>세션을 이해하는 데에 필요한 선수 지식</label>
        <input
          type='text'
          value={this.state.requirements}
          onChange={e => this.setState({ requirements: e.target.value })}
          required
        />
        <fieldset>
          <legend>이미 다른 곳에서 발표한 내용인가요?</legend>
          <label>예</label>
          <input
            type='radio'
            value={'true'}
            checked={this.state.previousPresentation === true}
            onChange={() => this.setState({ previousPresentation: true })}
            required
          />
          <label>아니오</label>
          <input
            type='radio'
            value={'false'}
            checked={this.state.previousPresentation === false}
            onChange={() => this.setState({ previousPresentation: false })}
            required
          />
        </fieldset>
        <label>발표한 행사</label>
        <input
          type='text'
          value={this.state.previouslyPresentedEvent}
          onChange={e => this.setState({ previouslyPresentedEvent: e.target.value })}
        />
        <label>발표 자료 링크</label>
        <input
          type='text'
          value={this.state.slideLink}
          onChange={e => this.setState({ slideLink: e.target.value })}
        />
        <label>참고 및 질문 사항</label>
        <input
          type='text'
          value={this.state.comment}
          onChange={e => this.setState({ comment: e.target.value })}
        />
        <button type='button'>이전</button>
        <button type='button'>임시 저장</button>
        <button type='submit'>다음</button>
      </form>
    )
  }
}
