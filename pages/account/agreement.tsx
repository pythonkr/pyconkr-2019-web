import { Button } from 'components/atoms/Button'
import { FormWrapper, H1, Li, Ul } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import React from 'react'
import { paths } from 'routes/paths'
import { HEADING_LIGHT_BLACK, TEAL } from 'styles/colors'
import { StoresType } from '../_app'

@inject('stores')
@observer
class Logout extends React.Component<{
  stores: StoresType;
}> {
  state = {
    isTermsOfService: false,
    isPrivacyPolicy: false
  }

  render() {
    const { stores } = this.props
    const { profile } = toJS(stores.profileStore)

    return (
      <PageTemplate
        header={<Header title='파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <H1>
          <IntlText intlKey='homeTitle'>파이콘 한국 가입하기</IntlText>
        </H1>
        <FormWrapper style={{ marginBottom: 100 }}>
          <form
            onSubmit={e => {
              e.preventDefault()
              stores.profileStore.updateAgreement(this.state).then((result) => {
                if (result.isAgreedAll) {
                  Router.push(paths.home)
                }
              })
            }}
          >
            <p style={{ fontSize: 18, fontWeight: 700, color: HEADING_LIGHT_BLACK, marginTop: 20 }}>
              다음 계정에서 성공적으로 인증받았습니다.
            </p>
            <Ul>
              <Li>연결한 소셜 계정: { profile.oauthType }</Li>
              <Li>이메일: { profile.email }</Li>
            </Ul>
            <p style={{ fontSize: 18, fontWeight: 700, color: HEADING_LIGHT_BLACK, marginTop: 50, marginBottom: 20 }}>
              약관 동의를 통해 가입 절차를 완료해주세요.
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
                이용 약관에 동의합니다.
                <a
                  style={{ position: 'absolute', right: 0 }}
                  href={paths.account.termsOfService}
                  target='_blank'
                  rel='noreferrer'
                >이용 약관 보기</a>
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
                개인정보 처리 방침에 동의합니다.
                <a
                  style={{ position: 'absolute', right: 0 }}
                  href={paths.account.privacyPolicy}
                  target='_blank'
                  rel='noreferrer'
                >개인정보 처리 방침 보기</a>
              </label>
            </p>
            <FlexCenterWrapper>
              <Button
                intlKey='ㅁㄴㅇㄹㅁㄴㅇㄹ'
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
