
import { H1, Paragraph } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import MyContribution from 'components/organisms/MyContribution'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import Router, { RouterProps, withRouter } from 'next/router'
import React from 'react'
import { paths } from 'routes/paths'
import { StoresType } from '../_app'

@inject('stores')
@withRouter
@observer
class Contribution extends React.Component<{
  stores: StoresType;
  router: RouterProps;
}> {
  state = {
    profile: {
      email: '',
      oauthType: '',
      nameKo: '',
      nameEn: '',
      phone: '',
      organization: '',
      nationality: '',
      bioKo: '',
      bioEn: '',
      image: '',
      avatarUrl: ''
    },
    profileFile: null
  }

  async componentDidMount() {
    const { stores, router } = this.props

    if (!stores.authStore.loggedIn) {
      router.replace(`${paths.account.login}?redirect_url=${Router.route}`)

      return
    }

    if (!stores.cfpStore.isInitialized) await stores.cfpStore.initialize()
    if (!stores.sponsorStore.isInitialized) await stores.sponsorStore.initialize()
  }

  render() {
    return (
      <PageTemplate
        header={<Header title='제안 및 신청 내역 :: 파이콘 한국 2019' intlKey='contribution.pageTitle'/>}
        footer={<Footer />}
      >
        <H1>
          <IntlText intlKey='contribution.title'>제안 및 신청 내역</IntlText>
        </H1>
        <Paragraph intlKey='contribution.paragraph'>파이콘 한국 2019에 제안 또는 신청한 내역입니다.</Paragraph>
        <MyContribution />
      </PageTemplate>
    )
  }
}

export default Contribution
