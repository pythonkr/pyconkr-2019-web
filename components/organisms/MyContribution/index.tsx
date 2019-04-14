import { Loading } from 'components/atoms/Loading'
import _ from 'lodash'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import { paths } from 'routes/paths'
import ContributionTable, { Contribution } from '../ContributionTable'

type PropsType = {
  stores: StoresType;
}

@observer
class MyContribution extends React.Component<PropsType> {

  // tslint:disable-next-line: member-ordering
  contributions: Contribution[] = []

  componentDidMount() {
    const { stores } = this.props
    const { schedule } = stores.scheduleStore

    this.contributions = [{
      title: '발표안 제안',
      intlKey: 'contribute.overview.table.talk',
      openDate: schedule.presentationProposalStartAt,
      closeDate: schedule.presentationProposalFinishAt,
      link: paths.contribute.proposingATalk,
      editLink: paths.account.editproposal.cfp
    }, {
      title: '스폰서 제안',
      intlKey: 'contribute.overview.table.talk',
      openDate: schedule.sponsorProposalStartAt,
      closeDate: schedule.sponsorProposalFinishAt,
      link: paths.sponsor.applicationForm,
      editLink: paths.account.editproposal.cfs
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
  }

  render() {
    const { stores } = this.props
    const { sponsorStore, cfpStore } = stores

    if (!cfpStore.isInitialized || !sponsorStore.isInitialized) {
      return <Loading width={50} height={50}/>
    }

    return (
      <>
        <ContributionTable
          stores={stores}
          contributions={this.contributions}
          isMyContribution
        />
      </>
    )
  }
}

export default MyContribution
