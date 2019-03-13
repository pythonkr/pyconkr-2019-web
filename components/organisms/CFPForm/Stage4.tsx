import { CFPFormStage } from 'lib/stores/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import { FormWrapper } from 'components/atoms/ContentWrappers'
import React from 'react'

interface State {
  cooperationConsent: boolean,
  cocConsent: boolean,
  noPlagiarismConsent: boolean,
  contentConsistencyConsent: boolean,
  recordable: boolean | null,
}

@inject('stores')
@observer
export default class CFPFormStage4 extends React.Component<{stores: StoresType}, State> {
  state = {
    cooperationConsent: false,
    cocConsent: false,
    noPlagiarismConsent: false,
    contentConsistencyConsent: false,
    recordable: true,
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault();
          stores.cfpStore.createOrUpdatePresentation(
            {submitted:true, recordable: this.state.recordable}
            ).then(()=>{
            stores.cfpStore.setCurrentStage(CFPFormStage.completed)
          })
        }}>
          <fieldset>
            <legend>약관 및 동의</legend>
            <input
              type='checkbox'
              aria-checked={this.state.cooperationConsent}
              checked={this.state.cooperationConsent}
              onChange={() => this.setState({ cooperationConsent: !this.state.cooperationConsent })}
            />
            <label>업무 관련 내용은 회사의 동의를 받으셨나요? (무관한 경우도 체크)</label>
            <input
              type='checkbox'
              aria-checked={this.state.cocConsent}
              checked={this.state.cocConsent}
              onChange={() => this.setState({ cocConsent: !this.state.cocConsent })}
            />
            <label>CoC(성명서)를 준수하는 발표 내용인가요?</label>
            <input
              type='checkbox'
              aria-checked={this.state.noPlagiarismConsent}
              checked={this.state.noPlagiarismConsent}
              onChange={() => this.setState({ noPlagiarismConsent: !this.state.noPlagiarismConsent })}
            />
            <label>표절이 확인될 경우 발표가 취소될 수 있습니다. </label>
            <input
              type='checkbox'
              aria-checked={this.state.contentConsistencyConsent}
              checked={this.state.contentConsistencyConsent}
              onChange={() => this.setState({ contentConsistencyConsent: !this.state.contentConsistencyConsent })}
            />
            <label>제안 내용과 발표 내용이 다르면 발표가 취소될 수 있습니다.</label>
          </fieldset>
          <fieldset>
            <legend>파이콘 한국 2019에서는 세션 내용을 녹화 및 공개합니다. 이에 동의하십니까?</legend>
            <label>예</label>
            <input
              type='radio'
              value={'true'}
              aria-checked={this.state.recordable === true}
              checked={this.state.recordable === true}
              onChange={() => this.setState({ recordable: true })}
            />
            <label>아니오</label>
            <input
              type='radio'
              value={'false'}
              aria-checked={this.state.recordable === false}
              checked={this.state.recordable === false}
              onChange={() => this.setState({ recordable: false })}
            />
          </fieldset>
          <button type='submit'>발표안 제출하기</button>
        </form>
      </FormWrapper>
    )
  }
}
