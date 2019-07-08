import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import ContributionTableRow from 'components/molecules/ContributionTableRow'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import DefaultTable, { Contribution } from 'components/organisms/DefaultTable'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { contributionMenu, paths } from 'routes/paths'
import { StoresType } from '../_app'
import { withNamespaces } from '../../i18n'
import i18next from 'i18next'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@inject('stores')
@observer
class CFPDetailedGuide extends React.Component<PropsType> {
  contributions: Contribution[] = []

  renderContributionTableRow = () => {
      return (
          this.contributions && this.contributions.map((contribution) => {
              return (
              <ContributionTableRow
                  key={contribution.title}
                  title={contribution.title || ''}
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
    const { stores, t } = this.props
    const { schedule } = stores.scheduleStore

    // #TODO: update 발표 제안 리뷰하기
    this.contributions = [{
      title: t('contribute:overview.table.keynote'),
      openDate: schedule.keynoteRecommendationStartAt,
      closeDate: schedule.keynoteRecommendationFinishAt,
      link: paths.contribute.recommendingAKeynoteSpeaker,
    }, {
      title: t('contribute:overview.table.talk'),
      openDate: schedule.presentationProposalStartAt,
      closeDate: schedule.presentationProposalFinishAt,
      link: paths.contribute.cfpDetailedGuide
    }, {
      title: t('contribute:overview.table.reviewCfp'),
      openDate: schedule.presentationReviewStartAt,
      closeDate: schedule.presentationReviewFinishAt,
      link: paths.contribute.proposalReview
    }, {
      title: t('contribute:overview.table.tutorial') ,
      openDate: schedule.tutorialProposalStartAt,
      closeDate: schedule.tutorialProposalFinishAt,
      link: paths.contribute.proposingATutorial
    }, {
      title: t('contribute:overview.table.sprint'),
      openDate: schedule.sprintProposalStartAt,
    }, {
      title: t('contribute:overview.table.volunteer'),
      openDate: schedule.volunteerRecruitingStartAt,
      closeDate: schedule.volunteerRecruitingFinishAt,
    }, {
      title: t('contribute:overview.table.lightningtalk'),
      openDate: schedule.lightningTalkProposalStartAt,
      closeDate: schedule.lightningTalkProposalFinishAt,
      dateDescription: t('contribute:overview.table.conferenceDays'),
    }]

    const title = t('contribute:overview.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', {title})} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={contributionMenu.submenu} />
        <H1>{title}</H1>
        <Paragraph> {t('contribute:overview.intro')} </Paragraph>
        <DefaultTable
          stores={stores}
          renderTableRow={this.renderContributionTableRow}
        />
        <Section>
          <H2>{ t('common:contact') }</H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces('contribute')(CFPDetailedGuide)