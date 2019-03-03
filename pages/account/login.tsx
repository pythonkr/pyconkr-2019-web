import { H1 } from 'components/atoms/H1'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { clientIdEnum } from 'lib/stores/AuthStore'
import { inject, observer } from 'mobx-react'
import React from 'react'
import intl from 'react-intl-universal'
import { StoresType } from '../_app'

@inject('stores')
@observer
class Login extends React.Component<{ stores: StoresType }> {
  handleGitHubLogin() {
    const authorize_url = 'https://github.com/login/oauth/authorize'
    const client_id = clientIdEnum.github
    const state = 'github'
    const redirect_uri = encodeURIComponent(`${location.origin}/`)
    const scope = encodeURIComponent('user:email')
    const url = `${authorize_url}?state=${state}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`
    window.location.href = url
  }

  handleGoogleLogin() {
    const authorize_url = 'https://accounts.google.com/o/oauth2/v2/auth'
    const client_id = clientIdEnum.google
    const state = 'google'
    const redirect_uri = encodeURIComponent(`${location.origin}/`)
    const scope = encodeURIComponent('profile email')
    const url = `${authorize_url}?include_granted_scopes=true&state=${state
      }&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code`
    window.location.href = url
  }

  handleFacebookLogin() {
    const authorize_url = 'https://www.facebook.com/v3.2/dialog/oauth'
    const client_id = clientIdEnum.facebook
    const state = 'facebook'
    const redirect_uri = encodeURIComponent(`${location.origin}/`)
    const scope = encodeURIComponent('email')
    const url = `${authorize_url}?include_granted_scopes=true&state=${state
      }&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code`
    window.location.href = url
  }

  handleNaverLogin() {
    const authorize_url = 'https://nid.naver.com/oauth2.0/authorize'
    const client_id = clientIdEnum.naver
    const state = 'naver'
    const redirect_uri = encodeURIComponent(`${location.origin}/`)
    const url = `${authorize_url}?include_granted_scopes=true&state=${state
      }&client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`
    window.location.href = url
  }
  render() {
    return (
      <PageTemplate
        header={<Header title='파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <H1 intlKey='homeTitle'>로그인 페이지</H1>
        <ul>
          <li>
            <button onClick={this.handleGitHubLogin}>{
              intl
                .get('account.login.githubButton')
                .defaultMessage('GitHub 로그인')
            }</button>
          </li>
          <li>
            <button onClick={this.handleGoogleLogin}>{
              intl
                .get('account.login.googleButton')
                .defaultMessage('Google 로그인')
            }</button>
          </li>
          <li>
            <button onClick={this.handleFacebookLogin}>{
              intl
                .get('account.login.facebookButton')
                .defaultMessage('Facebook 로그인')
            }</button>
          </li>
          <li>
            <button onClick={this.handleNaverLogin}>{
              intl
                .get('account.login.naverButton')
                .defaultMessage('Naver 로그인')
            }</button>
          </li>
        </ul>
      </PageTemplate>
    )
  }
}

export default Login
