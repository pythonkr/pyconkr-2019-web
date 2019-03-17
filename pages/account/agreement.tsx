import { AlertBar } from 'components/atoms/AlertBar'
import { FormWrapper, H1 } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
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

    return (
      <PageTemplate
        header={<Header title='파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <H1>
          <IntlText intlKey='homeTitle'>약관 동의</IntlText>
        </H1>
        <AlertBar
          text={'파이콘 한국 서비스 약관과 개인 정보 처리 방침을 ~~~~'}
        />
        <FormWrapper>
          <form
            onSubmit={e => {
              e.preventDefault()
              stores.profileStore.updateAgreement(this.state).then(() => {
                alert('asdf')
              })
            }}
          >
            <label>서비스 이용 약관</label>
            <input
              type='checkbox'
              aria-checked={this.state.isTermsOfService}
              checked={this.state.isTermsOfService}
              onChange={(event) =>
                this.setState({
                  isTermsOfService: event.target.checked
                })
              }
            />
            <label>개인정보 처리 방침 동의</label>
            <input
              type='checkbox'
              aria-checked={this.state.isPrivacyPolicy}
              checked={this.state.isPrivacyPolicy}
              onChange={(event) =>
                this.setState({
                  isPrivacyPolicy: event.target.checked
                })
              }
            />
            <button type='submit'>동의합니다!</button>
          </form>
        </FormWrapper>
      </PageTemplate>
    )
  }
}

export default Logout
