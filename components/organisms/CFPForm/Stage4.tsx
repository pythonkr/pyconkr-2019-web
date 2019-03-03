import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from 'pages/_app';
import { CFPFormStage } from 'lib/stores/CFPStore';

interface State {
  cooperationConsent: boolean,
  cocConsent: boolean,
  noPlagiarismConsent: boolean,
  contentConsistencyConsent: boolean,
  recordingReleaseConsent: boolean | null,
}

@inject('stores')
@observer
export default class CFPFormStage4 extends React.Component<{stores: StoresType}, State> {
  state = {
    cooperationConsent: false,
    cocConsent: false,
    noPlagiarismConsent: false,
    contentConsistencyConsent: false,
    recordingReleaseConsent: null,
  }

  render () {
    const { stores } = this.props

    return (
      <form onSubmit={() => {
        stores.cfpStore.setCurrentStage(CFPFormStage.completed)
      }}>
        <fieldset>
          <legend>약관 및 동의</legend>
          <input
            type='checkbox'
            checked={this.state.cooperationConsent}
            onChange={() => this.setState({ cooperationConsent: !this.state.cooperationConsent })}
            required
          />
          <label>업무 관련 내용은 회사의 동의를 받으셨나요? (무관한 경우도 체크)</label>
          <input
            type='checkbox'
            checked={this.state.cocConsent}
            onChange={() => this.setState({ cocConsent: !this.state.cocConsent })}
            required
          />
          <label>CoC(성명서)를 준수하는 발표 내용인가요?</label>
          <input
            type='checkbox'
            checked={this.state.noPlagiarismConsent}
            onChange={() => this.setState({ noPlagiarismConsent: !this.state.noPlagiarismConsent })}
            required
          />
          <label>표절이 확인될 경우 발표가 취소될 수 있습니다. </label>
          <input
            type='checkbox'
            checked={this.state.contentConsistencyConsent}
            onChange={() => this.setState({ contentConsistencyConsent: !this.state.contentConsistencyConsent })}
            required
          />
          <label>제안 내용과 발표 내용이 다르면 발표가 취소될 수 있습니다.</label>
        </fieldset>
        <fieldset>
          <legend>파이콘 한국 2018에서는 세션 내용을 녹화 및 공개합니다. 이에 동의하십니까?</legend>
          <label>예</label>
          <input
            type='radio'
            value={'true'}
            checked={this.state.recordingReleaseConsent === true}
            onChange={() => this.setState({ recordingReleaseConsent: true })}
            required
          />
          <label>아니오</label>
          <input
            type='radio'
            value={'false'}
            checked={this.state.recordingReleaseConsent === false}
            onChange={() => this.setState({ recordingReleaseConsent: false })}
            required
          />
        </fieldset>
        <button type='submit'>발표안 제출하기</button>
      </form>
    )
  }
}
