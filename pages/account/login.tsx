import styled from '@emotion/styled'
import { H1 } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { NaverLogo } from 'components/atoms/SVG'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { clientIdEnum } from 'lib/stores/AuthStore'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import React from 'react'
import intl from 'react-intl-universal'
import { paths } from 'routes/paths'
import { FACEBOOK_BLUE, NAVER_GREEN } from 'styles/colors'
import { StoresType } from '../_app'

const LoginButtonsWrapper = styled.div`
  width: 700px;
  background-color: #fbfbfb;
  padding: 90px 137px 105px;
  margin-top: -70px;
`
const MainButton = styled.button`
  width: 428px;
  height: 70px;
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  border: solid 1px #ced3d6;
  background-color: #272727;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const SubButton = styled.button`
  width: 428px;
  height: 54px;
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  border: solid 1px #ced3d6;
  background-color: ${props => props.color || '#ffffff'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  cursor: pointer;
`
const ButtonText = styled.span`
  display: block;
  margin-left: 12px;
  font-size: 15px;
  text-align: center;
  color: ${props => props.color || '#4d5256'};
`
const Hr = styled.hr`
  margin: 52px 0 37px;
  position: relative;
  &:after {
    content: '또는';
    position: absolute;
    top: -5px;
    display: block;
    width: 100px;
    height: 16px;
  }
`

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

  async componentDidMount() {
    const {stores} = this.props
    if (stores.authStore.logined) {
      Router.replace(paths.home)

      return
    }
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
        <H1><IntlText intlKey='homeTitle'>로그인</IntlText></H1>
        <LoginButtonsWrapper>
          <MainButton onClick={this.handleGitHubLogin}>
            <ButtonText color='white'>{
              intl
                .get('account.login.githubButton')
                .defaultMessage('GitHub 계정으로 로그인')
            }</ButtonText>
          </MainButton>
          <Hr/>
          {/* <SubButton onClick={this.handleGoogleLogin}>
            <ButtonText>{
              intl
                .get('account.login.googleButton')
                .defaultMessage('Google 계정으로 로그인')
            }</ButtonText>
          </SubButton> */}
          <SubButton
            color={FACEBOOK_BLUE}
            onClick={this.handleFacebookLogin}
          >
            <ButtonText color='white'>{
              intl
                .get('account.login.facebookButton')
                .defaultMessage('Facebook 계정으로 로그인')
            }</ButtonText>
          </SubButton>
          {/* <SubButton onClick={this.handleNaverLogin}>
            <NaverLogo
              width={20}
              height={20}
              color={NAVER_GREEN}
            />
            <ButtonText>{intl
              .get('account.login.naverButton')
              .defaultMessage('네이버 계정으로 로그인')
            }</ButtonText>
          </SubButton> */}
        </LoginButtonsWrapper>
      </PageTemplate>
    )
  }
}

export default Login
