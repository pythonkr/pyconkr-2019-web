
import { H1, Paragraph } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { Loading } from 'components/atoms/Loading'
import CFPEdit from 'components/organisms/CFPForm/CFPEdit'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import SponsorBanners from 'components/organisms/SponsorBanners'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import Router, { RouterProps, withRouter } from 'next/router'
import React from 'react'
import { paths } from 'routes/paths'
import { StoresType } from '../../_app'

@inject('stores')
@(withRouter as any)
@observer
class CFP extends React.Component<{
  stores: StoresType;
  router: RouterProps;
}> {
  async componentDidMount() {
    const { stores, router } = this.props
    const { authStore, cfpStore } = stores
    const isLoggedIn = authStore.loggedIn
    const isStoreInitialized = cfpStore.isInitialized
    let isProposalSubmitted = false

    if (!isLoggedIn) {
      router.replace(`${paths.account.login}?redirect_url=${Router.route}`)

      return
    }

    if (!isStoreInitialized) await stores.cfpStore.initialize()

    isProposalSubmitted = cfpStore.proposal.submitted
    if (!isProposalSubmitted) {
      Router.push(paths.contribute.proposingATalk)
    }
  }

  render() {
    const { stores } = this.props
    const { cfpStore } = stores

    return (
      <PageTemplate
        header={<Header title='발표 제안 수정 :: 파이콘 한국 2019' intlKey='contribution.pageTitle'/>}
        sponsorBanners={<SponsorBanners />}
        footer={<Footer />}
      >
        <H1>
          <IntlText intlKey='contribution.title'>발표 제안 수정</IntlText>
        </H1>
        <Paragraph intlKey='contribution.paragraph'>
          파이콘 한국 2019 발표 제안을 수정합니다.<br/>
        </Paragraph>
        {!stores.cfpStore.isInitialized
          ? <Loading width={50} height={50}/>
          : <CFPEdit cfpStore={cfpStore} />
        }
      </PageTemplate>
    )
  }
}

export default CFP
