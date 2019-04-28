
import { H1, Paragraph } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
<<<<<<< HEAD
import ContributionTableRow from 'components/molecules/ContributionTableRow'
import DefaultTable, { Contribution } from 'components/organisms/ContributionTable'
=======
import { Loading } from 'components/atoms/Loading'
import DefaultTable, { Contribution } from 'components/organisms/DefaultTable'
>>>>>>> 결제 가능한 티켓 금액 데이터 글자 색상 css 업데이트.
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import { RouterProps, withRouter } from 'next/router'
import React from 'react'
import { paths } from 'routes/paths'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

type PropsType = {
    stores: StoresType;
    router: RouterProps;
}

@inject('stores')
@(withRouter as any)
@observer
class ContributionPage extends React.Component<PropsType> {
    contributions: Contribution[] = []

    static async getInitialProps() {
      return {
        namespacesRequired: ['account'],
      }
    }
    async componentDidMount() {
      const { stores } = this.props

      if (!stores.cfpStore.isInitialized) await stores.cfpStore.initialize()
      if (!stores.sponsorStore.isInitialized) await stores.sponsorStore.initialize()
      if (!stores.scheduleStore.isInitialized) await stores.scheduleStore.initialize()
    }

    renderContributionTableRow = () => {
      return (
        this.contributions && this.contributions.map((contribution, index) => {
              return (
              <ContributionTableRow
                  key={contribution.title}
                  title={contribution.title || ''}
                  intlKey={contribution.intlKey || ''}
                  openDate={contribution.openDate || ''}
                  closeDate={contribution.closeDate || ''}
                  link={contribution.link || ''}
                  editLink={contribution.editLink || ''}
                  dateDescription={contribution.dateDescription}
              />
              )
          })
      )
  }

  render() {
    const { stores } = this.props
    const { sponsorStore, cfpStore, scheduleStore } = stores
    const { schedule } = scheduleStore

    this.contributions = [{
      title: '발표 제안',
      intlKey: 'contribute.overview.table.talk',
      openDate: schedule.presentationProposalStartAt,
      closeDate: schedule.presentationProposalFinishAt,
      link: paths.contribute.proposingATalk,
      editLink: paths.account.editproposal.cfp,
      isMyContribution: cfpStore.isProposalInitialized
    }, {
      title: '스폰서 제안',
      intlKey: 'contribute.overview.table.talk',
      openDate: schedule.sponsorProposalStartAt,
      closeDate: schedule.sponsorProposalFinishAt,
      link: paths.sponsor.applicationForm,
      editLink: paths.account.editproposal.cfs,
      isMyContribution: sponsorStore.isProposalInitialized
    }, {
      title: '튜토리얼 제안',
      intlKey: 'contribute.overview.table.tutorial',
      openDate: schedule.tutorialProposalStartAt,
      closeDate: schedule.tutorialProposalFinishAt,
    }, {
      title: '스프린트 제안',
      intlKey: 'contribute.overview.table.sprint',
      openDate: schedule.sprintProposalStartAt,
    }, {
      title: '자원봉사자 모집',
      intlKey: 'contribute.overview.table.volunteer',
      openDate: schedule.volunteerRecruitingStartAt,
      closeDate: schedule.volunteerRecruitingFinishAt,
    }, {
      title: '라이트닝 토크 신청',
      intlKey: 'contribute.overview.table.lightingtalk',
      openDate: schedule.lightningTalkProposalStartAt,
      closeDate: schedule.lightningTalkProposalFinishAt,
      dateDescription: {
        default: '컨퍼런스 당일',
        intlKey: 'common.status.conferenceDays'
      }
    }]

    return (
      <PageTemplate
        header={<Header title='제안 및 신청 내역 :: 파이콘 한국 2019' intlKey='contribution.pageTitle'/>}
        footer={<Footer />}
      >
        <H1>
          <IntlText intlKey='contribution.title'>제안 및 신청 내역</IntlText>
        </H1>
        <Paragraph intlKey='contribution.paragraph'>
          파이콘 한국 2019 에 제안 또는 신청한 내역입니다.<br/>
          파이콘 한국 준비위원회 내부 검토 이후 최종 확정 등의 절차 관련 내용은 메일로 다시 안내드리도록 하겠습니다.
        </Paragraph>
        <DefaultTable
          stores={stores}
          renderTableRow={this.renderContributionTableRow}
        />
      </PageTemplate>
    )
  }
}

export default withNamespaces('account')(ContributionPage)
