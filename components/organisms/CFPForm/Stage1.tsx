import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'

export interface ProfileFormPropType {}

@inject('stores')
@observer
export default class ProfileForm extends React.Component<{stores: StoresType}> {
  state = {
    nameKo: '',
    nameEn: '',
    email: '',
    phone: '',
    organization: '',
  }
  componentDidMount() {
    this.setState({
      ...toJS(this.props.stores.profileStore).profile
    })
  }
  render () {
    const { stores } = this.props

    return (
      <form onSubmit={(e) => {
        e.preventDefault();        stores.profileStore.updateProfile(this.state)
        // stores.cfpStore.setCurrentStage(CFPFormStage.stage2)
      }}>
        <label>이메일</label>
        <input
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          required
          aria-required={true}
        />
        <br/>
        <label>이름(Korean)</label>
        <input
          type='text'
          value={this.state.nameKo}
          onChange={e => this.setState({ nameKo: e.target.value })}
          required
          aria-required={true}
        />
        <br/>
        <label>이름(English)</label>
        <input
          type='text'
          value={this.state.nameEn}
          onChange={e => this.setState({ nameEn: e.target.value })}
          required
          aria-required={true}
        />
        <br/>
        <label>연락 가능한 전화번호</label>
        <input
          type='tel'
          value={this.state.phone}
          onChange={e => this.setState({ phone: e.target.value })}
        />
        <br/>
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

  submit = () => {}
}
