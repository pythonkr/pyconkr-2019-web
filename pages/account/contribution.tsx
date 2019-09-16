
import { H1, Paragraph } from 'components/atoms/ContentWrappers'
import {PageDefaultPropsType} from 'types/PageDefaultPropsType'
import ContributionTableRow from 'components/molecules/ContributionTableRow'
import DefaultTable from 'components/organisms/DefaultTable'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { paths } from 'routes/paths'
import { withNamespaces } from '../../i18n'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import {Loading} from 'components/atoms/Loading'

const CONTRIBUTIONS = gql`
query Contributions {
  schedule {
    id
    presentationProposalStartAt
    presentationProposalFinishAt
    sponsorProposalStartAt
    sponsorProposalFinishAt
    tutorialProposalStartAt
    tutorialProposalFinishAt
    sprintProposalStartAt
    sprintProposalFinishAt
    volunteerRecruitingStartAt
    volunteerRecruitingFinishAt
    lightningTalkProposalStartAt
    lightningTalkProposalFinishAt
  }
  myPresentationProposal {
    id
    submitted
    accepted
  }
  isCfpReviewSubmitted
  mySponsor {
    id
    submitted
    accepted
  }
  myTutorials {
    id
    submitted
    accepted
  }
  mySprints {
    id
    submitted
    accepted
  }
}
`

const ContributionTable = (props: any) => {
  const {t, stores} = props
  return (
    <Query query={CONTRIBUTIONS}>
      {({ loading, error, data }) => {
        if (loading || error) {
          return (<Loading width={50} height={50}/>)
        }
        const { schedule, myPresentationProposal, mySponsor, myTutorials, mySprints} = data
        return (
          <DefaultTable stores={stores}>
            <ContributionTableRow
                title={ t('contribute:overview.table.talk') }
                openDate={schedule.presentationProposalStartAt || ''}
                closeDate={schedule.presentationProposalFinishAt || ''}
                link={paths.contribute.proposingATalk || ''}
                editLink={paths.account.editproposal.cfp || ''}
                isMyContribution={myPresentationProposal}
                isProposalSubmitted={myPresentationProposal? myPresentationProposal.submitted:false}
                isProposalAccepted={myPresentationProposal? myPresentationProposal.accepted:false}
            />
            <ContributionTableRow
                title={ t('contribute:overview.table.sponsor') }
                openDate={schedule.sponsorProposalStartAt || ''}
                closeDate={schedule.sponsorProposalFinishAt || ''}
                link={paths.sponsor.applicationForm || ''}
                editLink={paths.account.editproposal.cfs || ''}
                isMyContribution={mySponsor}
                isProposalSubmitted={mySponsor? mySponsor.submitted:false}
                isProposalAccepted={mySponsor? mySponsor.accepted:false}
            />
            <ContributionTableRow
                title={ t('contribute:overview.table.tutorial') } 
                openDate={schedule.tutorialProposalStartAt || ''}
                closeDate={schedule.tutorialProposalFinishAt || ''}
                link={paths.contribute.proposingATutorial || ''}
                editLink={paths.account.editproposal.tutorial || ''}
                isMyContribution={myTutorials && myTutorials.length > 0}
                isProposalSubmitted={ !_.isEmpty(myTutorials) && myTutorials[0].submitted }
                isProposalAccepted={ !_.isEmpty(myTutorials) && myTutorials[0].accepted }
            />
            <ContributionTableRow
                title={ t('contribute:overview.table.sprint') } 
                openDate={schedule.sprintProposalStartAt || ''}
                closeDate={schedule.sprintProposalFinishAt || ''}
                link={paths.contribute.proposingASprint || ''}
                editLink={paths.account.editproposal.sprint || ''}
                isMyContribution={mySprints && mySprints.length > 0}
                isProposalSubmitted={ !_.isEmpty(mySprints) && mySprints[0].submitted }
                isProposalAccepted={ !_.isEmpty(mySprints) && mySprints[0].accepted }
            />
            <ContributionTableRow
                title={ t('contribute:overview.table.volunteer') }
                openDate={schedule.volunteerRecruitingStartAt || ''}
                closeDate={schedule.volunteerRecruitingFinishAt || ''}
                link={paths.contribute.volunteer || ''}
            />
            <ContributionTableRow
                title={ t('contribute:overview.table.lightningtalk') }
                openDate={schedule.lightningTalkProposalStartAt || ''}
                closeDate={schedule.lightningTalkProposalFinishAt || ''}
                link={paths.program.lightningTalk || ''}
                dateDescription={t('contribute:overview.table.conferenceDays')}
            />
          </DefaultTable>
        )
      }}
    </Query>
  )
}


@inject('stores')
@(withRouter as any)
@observer
class ContributionPage extends React.Component<PageDefaultPropsType> {
  render() {
    const { stores, t } = this.props
    const title = t('account:contribution.title')
    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', {title})} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          { title }
        </H1>
        <Paragraph>
          {t('account:contribution.desc')}
        </Paragraph>
        <ContributionTable stores={stores} t={t}/>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['account', 'contribute'])(ContributionPage)
