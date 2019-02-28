import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import { parse } from 'qs'
import React from 'react'
import { StoresType } from '../_app';
import { H1 } from 'components/atoms/H1';
import NavLink from 'components/atoms/NavLink'

@inject('stores')
@observer
class Login extends React.Component<{stores: StoresType}> {
  async componentDidMount () {
    const { stores } = this.props

    if (location.search.indexOf('code') === -1) return
    const { code } = parse(location.search, { ignoreQueryPrefix: true })
    await stores.authStore.login(code)
  }

  render () {
    return (
      <PageTemplate
        header={<Header title='파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <H1 intlKey='homeTitle'>파이콘 홈페이지</H1>
        <ul>
          <li>
            <NavLink
              intlKey='account.login.githubButton'
              to="https://github.com/login/oauth/authorize?state=github&client_id=bc6a4bddabaa55004090&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=user:email"
              name="GitHub 로그인"
            />
          </li>
          <li>
              <NavLink
              intlKey='account.login.googleButton'
              to="https://accounts.google.com/o/oauth2/v2/auth?state=google&scope=profile%20email&include_granted_scopes=true&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&client_id=434664051101-ms06l6uja93lrjs3errmb73alb6dek1f.apps.googleusercontent.com"
              name="Google 로그인"
              />
          </li>
          <li>
              <NavLink
              intlKey='account.login.facebookButton'
              to="https://www.facebook.com/v3.2/dialog/oauth?scope=email&client_id=373255026827477&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=facebook&response_type=code"
              name="Facebook 로그인"
              />
          </li>
          <li>
              <NavLink
              intlKey='account.login.naverButton'
              to="https://nid.naver.com/oauth2.0/authorize?client_id=K1dzcT_4mOnrA7KTFVFq&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=naver"
              name="Naver 로그인"
              />
          </li>
        </ul>
      </PageTemplate>
    )
  }
}

export default Login
