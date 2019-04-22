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
import { contributionMenu, paths } from 'routes/paths'
import { StoresType } from '../_app'

export type PropsType = {
  stores: StoresType;
}

@inject('stores')
@observer
export default class CFPDetailedGuide extends React.Component<PropsType> {
  contributions: Contribution[] = []

  render() {
    const { stores } = this.props
    const { schedule } = stores.scheduleStore

    // todo : update 발표 제안 리뷰하기
    this.contributions = [{
      title: '키노트 발표자 추천',
      intlKey: 'contribute.overview.table.keynote',
      openDate: schedule.keynoteRecommendationStartAt,
      link: paths.contribute.recommendingAKeynoteSpeaker,
    }, {
      title: '발표안 제안',
      intlKey: 'contribute.overview.table.talk',
      openDate: schedule.presentationProposalStartAt,
      closeDate: schedule.presentationProposalFinishAt,
      link: paths.contribute.cfpDetailedGuide
    }, {
      title: '튜토리얼 제안',
      intlKey: 'contribute.overview.table.tutorial',
      openDate: schedule.tutorialProposalStartAt,
      closeDate: schedule.tutorialProposalFinishAt,
      // link: paths.contribute.proposingATutorial
    }, {
      title: '스프린트 제안',
      intlKey: 'contribute.overview.table.sprint',
      openDate: schedule.sprintProposalStartAt,
      // link: paths.contribute.proposingASprint
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
        header={<Header title='공헌 안내 :: 파이콘 한국 2019' intlKey='contribute.overview.pageTitle' />}
        footer={<Footer />}
      >
        <LocalNavigation list={contributionMenu.submenu} />
        <H1><IntlText intlKey='contribute.overview.title'>
          파이콘 한국에 공헌하는 다양한 방법
        </IntlText></H1>
        <Paragraph><IntlText intlKey='contribute.overview.intro'>
          파이콘 한국에는 발표, 튜토리얼 튜터 및 멘토, 스프린트 진행, 자원 봉사 등 다양한 형태로 공헌할 수 있습니다.
          각 항목은 아래와 같은 일정으로 모집합니다.
        </IntlText></Paragraph>
        <ContributionTable
          stores={stores}
          contributions={this.contributions}
        />
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
