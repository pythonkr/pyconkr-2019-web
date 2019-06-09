import { Button } from 'components/atoms/Button'
import { FormWrapper, H1, Li, Ul } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'
import React from 'react'
import { paths } from 'routes/paths'
import { HEADING_LIGHT_BLACK, TEAL } from 'styles/colors'
import { StoresType } from '../_app'

@inject('stores')
@(withRouter as any)
@observer
class Logout extends React.Component<{
  stores: StoresType; router: any;
}> {
  state = {
    isTermsOfService: false,
    isPrivacyPolicy: false
  }

  render() {
    const { stores } = this.props
    const { profile } = toJS(stores.profileStore)
    const redirectUrl = this.props.router!.query.redirect_url

    return (
      <PageTemplate
        header={<Header title='가입하기 :: 파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <H1>
          <IntlText intlKey='agreement.title'>파이콘 한국 가입하기</IntlText>
        </H1>
        <FormWrapper style={{ marginBottom: 100 }}>
          <form
            onSubmit={e => {
              e.preventDefault()
              stores.profileStore.updateAgreement(this.state).then((result) => {
                if (result.isAgreedAll) {
                  location.replace(`${location.origin}${redirectUrl || paths.home}`)
                }
              })
            }}
          >
            <p style={{ fontSize: 18, fontWeight: 700, color: HEADING_LIGHT_BLACK, marginTop: 20 }}>
              <IntlText intlKey='agreement.desc1'>다음 계정에서 성공적으로 인증받았습니다.</IntlText>
            </p>
            <Ul>
              <Li><IntlText intlKey='agreement.socialService'>연결한 소셜 계정</IntlText>: { profile.oauthType }</Li>
              <Li><IntlText intlKey='agreement.email'>이메일</IntlText>: { profile.email }</Li>
            </Ul>
            <p style={{ fontSize: 18, fontWeight: 700, color: HEADING_LIGHT_BLACK, marginTop: 50 }}>
              <IntlText intlKey='agreement.desc2'>계정 인증 시 다음 공개 정보(Public Data)를 함께 저장합니다.</IntlText>
            </p>
            <Ul>
              <Li><IntlText intlKey='agreement.socialAccount'>소셜 계정 아이디</IntlText></Li>
              <Li><IntlText intlKey='agreement.profileImage'>프로필 이미지</IntlText></Li>
            </Ul>
            <p style={{ fontSize: 18, fontWeight: 700, color: HEADING_LIGHT_BLACK, marginTop: 50, marginBottom: 20 }}>
              <IntlText intlKey='agreement.desc3'>약관 동의를 통해 가입 절차를 완료해주세요.</IntlText>
            </p>
            <p style={{ position: 'relative'}}>
              <input
                type='checkbox'
                id='terms-consent'
                aria-checked={this.state.isTermsOfService}
                checked={this.state.isTermsOfService}
                onChange={(event) =>
                  this.setState({
                    isTermsOfService: event.target.checked
                  })
                }
              />
              <label htmlFor='terms-consent'>
                <IntlText intlKey='agreement.agreeTermsOfService'>이용 약관에 동의합니다.</IntlText>
                <a
                  style={{ position: 'absolute', right: 0 }}
                  href={paths.account.termsOfService}
                  target='_blank'
                  rel='noreferrer'
                ><IntlText intlKey='agreement.viewTermsOfService'>이용 약관 보기</IntlText></a>
              </label>
            </p>
            <p style={{ position: 'relative'}}>
              <input
                type='checkbox'
                id='privacy-consent'
                aria-checked={this.state.isPrivacyPolicy}
                checked={this.state.isPrivacyPolicy}
                onChange={(event) =>
                  this.setState({
                    isPrivacyPolicy: event.target.checked
                  })
                }
              />
              <label htmlFor='privacy-consent'>
                <IntlText intlKey='agreement.agreePrivacyProtectionPolicy'>개인정보 처리 방침에 동의합니다.</IntlText>
                <a
                  style={{ position: 'absolute', right: 0 }}
                  href={paths.account.privacyPolicy}
                  target='_blank'
                  rel='noreferrer'
                ><IntlText intlKey='agreement.viewPrivacyProtectionPolicy'>개인정보 처리 방침 보기</IntlText></a>
              </label>
            </p>
            <FlexCenterWrapper>
              <Button
                intlKey='agreement.finishRegisteration'
                tag='button'
                color={TEAL}
                size='big'
                type='submit'
                disabled={!this.state.isPrivacyPolicy || !this.state.isTermsOfService}
                style={{ marginTop: 80 }}
              >
                가입 완료하기
              </Button>
            </FlexCenterWrapper>
          </form>
        </FormWrapper>
      </PageTemplate>
    )
  }
}

export default Logout
