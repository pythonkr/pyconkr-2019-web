
import { Button } from 'components/atoms/Button'
import { FormWrapper, H1, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { FlexCenterWrapper } from 'components/atoms/FlexWrapper'
import { IntlText } from 'components/atoms/IntlText'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import Router, { RouterProps, withRouter } from 'next/router'
import React from 'react'
import intl from 'react-intl-universal'
import { paths } from 'routes/paths'
import { TEAL } from 'styles/colors'
import { StoresType } from '../_app'
import { Loading } from 'components/atoms/Loading';
import { Empty } from 'components/atoms/Empty';
import MyContribution from 'components/organisms/MyContribution';


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

    if (!stores.cfpStore.isInitialized) {
      await stores.cfpStore.initialize()
    }
  }

  render() {

    return <PageTemplate
      header={<Header title='제안 및 신청 내역 :: 파이콘 한국 2019' intlKey='contribution.pageTitle'/>}
      footer={<Footer />}
    >
      <H1>
        <IntlText intlKey='contribution.title'>제안 및 신청 내역</IntlText>
      </H1>
      <Paragraph> <IntlText intlKey='contribution.paragraph'>파이콘 한국 2019에 제안 또는 신청한 내역입니다.</IntlText></Paragraph>
      <MyContribution />
    </PageTemplate>
  }
}

export default Contribution
