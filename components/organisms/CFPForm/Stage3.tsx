import { CFPFormStage } from 'lib/stores/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import { FormWrapper } from 'components/atoms/ContentWrappers'
import React from 'react'

interface State {
  desc: string,
  backgroundDesc: string,
  isPresentedBefore: boolean | null,
  placePresentedBefore: string,
  presentedSlideUrlBefore: string,
  question: string
}

@inject('stores')
@observer
export default class CFPFormStage3 extends React.Component<{stores: StoresType}, State> {
  state = {
    desc: '',
    backgroundDesc: '',
    isPresentedBefore: false,
    placePresentedBefore: '',
    presentedSlideUrlBefore: '',
    question: ''
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault();
          stores.cfpStore.createOrUpdatePresentation(this.state).then(()=>{
            stores.cfpStore.setCurrentStage(CFPFormStage.stage4)
          })
        }}>
          <label>자세한 설명</label>
          <input
            type='text'
            value={this.state.desc}
            onChange={e => this.setState({ desc: e.target.value })}
            aria-required={true}
            required
          />
          <label>세션을 이해하는 데에 필요한 선수 지식</label>
          <input
            type='text'
            value={this.state.backgroundDesc}
            onChange={e => this.setState({ backgroundDesc: e.target.value })}
            aria-required={true}
            required
          />
          <fieldset>
            <legend>이미 다른 곳에서 발표한 내용인가요?</legend>
            <label>예</label>
            <input
              type='radio'
              value={'true'}
              aria-checked={this.state.isPresentedBefore === true}
              checked={this.state.isPresentedBefore === true}
              onChange={() => this.setState({ isPresentedBefore: true })}
            />
            <label>아니오</label>
            <input
              type='radio'
              value={'false'}
              aria-checked={this.state.isPresentedBefore === false}
              checked={this.state.isPresentedBefore === false}
              onChange={() => this.setState({ isPresentedBefore: false })}
            />
          </fieldset>
          <label>발표한 행사</label>
          <input
            type='text'
            value={this.state.placePresentedBefore}
            onChange={e => this.setState({ placePresentedBefore: e.target.value })}
          />
          <label>발표 자료 링크</label>
          <input
            type='text'
            value={this.state.presentedSlideUrlBefore}
            onChange={e => this.setState({ presentedSlideUrlBefore: e.target.value })}
          />
          <label>참고 및 질문 사항</label>
          <input
            type='text'
            value={this.state.question}
            onChange={e => this.setState({ question: e.target.value })}
          />
          <button type='button' onClick={() => {
            stores.cfpStore.setCurrentStage(CFPFormStage.stage2)
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
