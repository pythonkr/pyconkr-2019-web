import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from 'pages/_app';
import { CFPFormStage } from 'lib/stores/CFPStore';

export interface ProfileFormPropType {

}

@inject('stores')
@observer
export default class ProfileForm extends React.Component<{stores: StoresType}> {
  state = {
    name: '',
    englishName: '',
    phone: '',
    organization: '',
  }

  render () {
    const { stores } = this.props
    const { email } = toJS(stores.profileStore)

    return (
      <form onSubmit={() => {
        stores.profileStore.updateProfile(this.state)
        stores.cfpStore.setCurrentStage(CFPFormStage.stage2)
      }}>
        <label>계정 이메일</label>
        <input
          type='readonly'
          value={email}
        />
        <label>이름</label>
        <input
          type='text'
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
          required
        />
        <label>영문 이름</label>
        <input
          type='text'
          value={this.state.englishName}
          onChange={e => this.setState({ englishName: e.target.value })}
          required
        />
        <label>연락 가능한 전화번호</label>
        <input
          type='tel'
          value={this.state.phone}
          onChange={e => this.setState({ phone: e.target.value })}
        />
        <label>소속</label>
        <input
          type='text'
          value={this.state.organization}
          onChange={e => this.setState({ organization: e.target.value })}
        />
        <p>
          발표자 정보로 등록한 내용들은 프로필로 저장되며, 내 프로필 페이지에서 수정할 수 있습니다.
          프로필은 추후 프로그램 페이지에서 사용됩니다.
        </p>
        <button type='submit'>프로필 저장하고 계속하기</button>
      </form>
    )
  }

  submit = () => {

  }
}
