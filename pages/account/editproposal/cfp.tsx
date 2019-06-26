
import { H1, Paragraph } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { Loading } from 'components/atoms/Loading'
import CFPEdit from 'components/organisms/CFPForm/CFPEdit'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { isPast } from 'date-fns'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import Router, { RouterProps, withRouter } from 'next/router'
import React from 'react'
import { paths } from 'routes/paths'
import { StoresType } from '../../_app'
import i18next from 'i18next'

@inject('stores')
@(withRouter as any)
@observer
class CFP extends React.Component<{
  stores: StoresType;
  router: RouterProps;
  t: i18next.TFunction;
}> {
  async componentDidMount() {
    const { stores, router } = this.props
    const { authStore, cfpStore } = stores
    const isStoreInitialized = cfpStore.isInitialized
    let isProposalSubmitted = false
    authStore.syncToken()
    if (!authStore.loggedIn) {
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
    const { stores, t } = this.props
    const { cfpStore, scheduleStore } = stores
    const { proposal } = cfpStore

    if (!proposal) return null

    const { presentationProposalFinishAt } = scheduleStore.schedule
    const isAcceptedProposal = isPast(presentationProposalFinishAt) && proposal.accepted

    return (
      <PageTemplate
        header={<Header
          title={`발표 ${isAcceptedProposal ? '소개' : '제안'} 수정 :: 파이콘 한국 2019`}
          intlKey='contribution.pageTitle'/>
        }
        footer={<Footer />}
      >
        <H1>
          <IntlText intlKey='contribution.title'>발표 {isAcceptedProposal ? '소개' : '제안'} 수정</IntlText>
        </H1>
        <Paragraph intlKey='contribution.paragraph'>
          파이콘 한국 2019 발표 {isAcceptedProposal ? '내용' : '제안'}을 수정합니다.<br/>
        </Paragraph>
        {isAcceptedProposal && <Paragraph intlKey='contribution.paragraph'>
          발표 제목, 카테고리, 발표 시간은 준비위원회와 상의하여 변경할 수 있습니다.<br/>
          program@pycon.kr로 문의해주세요.
        </Paragraph>}
        {isAcceptedProposal && <Paragraph intlKey='contribution.paragraph'>
          <Link href={paths.account.profile}><a>발표자 프로필 수정하기</a></Link>
        </Paragraph>}
        {!stores.cfpStore.isInitialized
          ? <Loading width={50} height={50}/>
          : <CFPEdit cfpStore={cfpStore} scheduleStore={scheduleStore} t={t}/>
        }
      </PageTemplate>
    )
  }
}

export default CFP
