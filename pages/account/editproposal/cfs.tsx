
import { H1, Paragraph } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { Loading } from 'components/atoms/Loading'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import CFSEdit from 'components/organisms/SponsorForm/CFSEdit'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import Router, { RouterProps, withRouter } from 'next/router'
import React from 'react'
import { paths } from 'routes/paths'
import { StoresType } from '../../_app'

@inject('stores')
@(withRouter as any)
@observer
class CFS extends React.Component<{
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
    const { authStore, sponsorStore } = stores
    const isLoggedIn = authStore.loggedIn
    const isStoreInitialized = sponsorStore.isInitialized
    let isProposalSubmitted = false

    if (!isLoggedIn) {
      router.replace(`${paths.account.login}?redirect_url=${Router.route}`)

      return
    }

    if (!isStoreInitialized) await stores.sponsorStore.initialize()

    isProposalSubmitted = sponsorStore.proposal.submitted
    if (!isProposalSubmitted) {
      Router.push(paths.sponsor.applicationForm)
    }
  }

  render() {
    const { stores } = this.props
    const { sponsorStore } = stores

    return (
      <PageTemplate
        header={<Header title='스폰서 신청 내역 수정 :: 파이콘 한국 2019' intlKey='contribution.pageTitle'/>}
        footer={<Footer />}
      >
        <H1>
          <IntlText intlKey='contribution.title'>스폰서 신청 내역 수정</IntlText>
        </H1>
        <Paragraph intlKey='contribution.paragraph'>
          스폰서 신청 내역을 수정합니다.<br/>
        </Paragraph>
        {!stores.sponsorStore.isInitialized
          ? <Loading width={50} height={50}/>
          : <CFSEdit sponsorStore={sponsorStore} />
        }
      </PageTemplate>
    )
  }
}

export default CFS
