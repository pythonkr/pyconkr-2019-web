import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import ContributionTable, { Contribution } from 'components/organisms/ContributionTable'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { ticketMenu, paths } from 'routes/paths'
import { StoresType } from '../_app'

export type PropsType = {
  stores: StoresType;
}

@inject('stores')
@observer
export default class CFPDetailedGuide extends React.Component<PropsType> {
  tickets: Contribution[] = []

  render() {
    const { stores } = this.props
    const { schedule } = stores.scheduleStore

    this.tickets = [{
      title: '컨퍼런스 얼리버드',
      intlKey: 'contribute.overview.table.keynote',
      openDate: schedule.keynoteRecommendationStartAt,
      link: paths.contribute.recommendingAKeynoteSpeaker,
    }, {
      title: '컨퍼런스 개인 후원',
      intlKey: 'contribute.overview.table.talk',
      openDate: schedule.presentationProposalStartAt,
      closeDate: schedule.presentationProposalFinishAt,
      link: paths.contribute.cfpDetailedGuide
    }, {
      title: '컨퍼런스 일반',
      intlKey: 'contribute.overview.table.tutorial',
      openDate: schedule.tutorialProposalStartAt,
      closeDate: schedule.tutorialProposalFinishAt,
      // link: paths.contribute.proposingATutorial
    }, {
      title: '튜토리얼',
      intlKey: 'contribute.overview.table.sprint',
      openDate: schedule.sprintProposalStartAt,
      // link: paths.contribute.proposingASprint
    }, {
      title: '스프린트',
      intlKey: 'contribute.overview.table.volunteer',
      openDate: schedule.volunteerRecruitingStartAt,
      closeDate: schedule.volunteerRecruitingFinishAt,
    }, {
      title: '영코더',
      intlKey: 'contribute.overview.table.volunteer',
      openDate: schedule.volunteerRecruitingStartAt,
      closeDate: schedule.volunteerRecruitingFinishAt,
    }, {
      title: '아이 돌봄',
      intlKey: 'contribute.overview.table.volunteer',
      openDate: schedule.volunteerRecruitingStartAt,
      closeDate: schedule.volunteerRecruitingFinishAt,
    }]

    return (
      <PageTemplate
        header={<Header title='파이콘 한국 티켓 종류 :: 파이콘 한국 2019' intlKey='ticket.overview.pageTitle' />}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1><IntlText intlKey='ticket.overview.title'>
          파이콘 한국 티켓 종류
        </IntlText></H1>
        <Paragraph><IntlText intlKey='ticket.overview.description'>
          파이콘 한국에는 발표 세션을 포함한 이틀 간의 컨퍼런스, 튜토리얼, 영코더 등 다양한 행사가 있습니다.
        </IntlText></Paragraph>
        <ContributionTable
          stores={stores}
          contributions={this.tickets}
        />
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
