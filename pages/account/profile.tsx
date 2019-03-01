import { toJS } from 'mobx'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from '../_app';
import { H1 } from 'components/atoms/H1';

@inject('stores')
@observer
class Profile extends React.Component<{stores: StoresType}> {
  state = {
    // avatarUrl: '',
    email: '',
    // oauthType: '',
    nameKo: '',
    nameEn: '',
    phone: '',
    organization: '',
    nationality: '',
    bioKo: '',
    bioEn: ''
  }

  async componentDidMount () {
    this.setState({
      ...toJS(this.props.stores.profileStore).profile
    })
  }

  render () {
    const { stores } = this.props
    return (
      <PageTemplate
        header={<Header title='프로필' />}
        footer={<Footer />}
      >
        <H1 intlKey='homeTitle'>프로필</H1>
        <form onSubmit={(e) => {
          e.preventDefault();
          stores.profileStore.updateProfile(this.state)
      }}>
        <label>이메일</label>
        <input
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          required
        />
        <br/>
        <label>이름</label>
        <input
          type='text'
          value={this.state.nameKo}
          onChange={e => this.setState({ nameKo: e.target.value })}
          required
        />
        <br/>
        <label>영문 이름</label>
        <input
          type='text'
          value={this.state.nameEn}
          onChange={e => this.setState({ nameEn: e.target.value })}
          required
        />
        <br/>
        <label>전화번호</label>
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
        <br/>
        <label>국적</label>
        <input
          type='text'
          value={this.state.nationality}
          onChange={e => this.setState({ nationality: e.target.value })}
        />
        <br/>
        <label>소개</label>
        <textarea
          value={this.state.bioKo}
          onChange={e => this.setState({ bioKo: e.target.value })}
        />
        <br/>
        <label>영문소개</label>
        <textarea
          value={this.state.bioEn}
          onChange={e => this.setState({ bioEn: e.target.value })}
        />
        
        <button type='submit'>프로필 업데이트</button>
      </form>
      </PageTemplate>
    )
    
  }
}

export default Profile
