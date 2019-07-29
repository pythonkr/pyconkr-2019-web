import {
  ContentTableWrapper,
  Ul,
  Li,
  H1,
  Section,
  TableList
} from 'components/atoms/ContentWrappers'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {formatDateInWordsWithWeekdayAndTime} from 'utils/formatDate'
import {PageDefaultPropsType} from 'types/PageDefaultPropsType'
import { Loading } from 'components/atoms/Loading'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { withNamespaces } from '../../i18n'
import { ProgramTableRow, SpeakerSpan } from 'components/molecules/Program/Detail'
import ProfileCard from 'components/molecules/ProfileCard'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const SPRINT = gql`
query Sprint($id: Int!) {
  sprint(id: $id) {
    id
    name
    desc
    language
    programmingLanguage
    startedAt
    finishedAt
    opensourceDesc
    opensourceUrl
    owner {
      profile {
        name
        bio
        image
        avatarUrl
        blogUrl
        githubUrl
        facebookUrl
        twitterUrl
        linkedInUrl
        instagramUrl
      }
    }
    place {
      name
    }
    participants {
      email
    }
  }
}
`


const SprintDetailContent = (props) => {
  const {t, sprint} = props
  const pageTitle = t('common:pageTitle', { title: sprint.name })
  const emails = sprint.participants ? sprint.participants.map((user) => {
    return user.email
  }).join(',') : ''
  return (
    <PageTemplate
      header={<Header title={ pageTitle } intlKey='' />}
      footer={<Footer />}
    >
      <H1 style={{ maxWidth: '600px' }}>
        { sprint.name }<br/>
        <SpeakerSpan>{ sprint.owner? sprint.owner.profile.name: ''}</SpeakerSpan><br/>
      </H1>
      <ContentTableWrapper>
        <TableList>
          <ProgramTableRow
            header={t('program:common.language')} >
            { sprint.language }
          </ProgramTableRow>
          {
            sprint.place &&
            <ProgramTableRow
              header={t('program:common.place')} >
              { sprint.place.name }
            </ProgramTableRow>
          }
          {
            sprint.startedAt &&
            <ProgramTableRow
              header={t('program:common.datetime')} >
              { `${formatDateInWordsWithWeekdayAndTime(sprint.startedAt)}~${formatDateInWordsWithWeekdayAndTime(sprint.finishedAt)}` }
            </ProgramTableRow>
          }
          {
            sprint.programmingLanguage &&
            <ProgramTableRow
              header={t('program:sprint.programmingLanguage')} >
              { sprint.programmingLanguage }
            </ProgramTableRow>
          }
          {
            sprint.opensourceUrl &&
            <ProgramTableRow
              header={t('program:sprint.opensourceUrl')} >
              <a href={ sprint.opensourceUrl } target="_blank">
                { sprint.opensourceUrl }
              </a>
            </ProgramTableRow>
          }
          {
            sprint.opensourceDesc &&
            <ProgramTableRow
              header={t('program:sprint.opensourceDesc')} >
              { sprint.opensourceDesc }
            </ProgramTableRow>
          }
          {
            sprint.participants &&
            <>
              <ProgramTableRow
                header={t('program:common.participantCount')} >
                { `${sprint.participants.length}` }
              </ProgramTableRow>
              <ProgramTableRow
                header={t('program:common.participantList')} >
                <CopyToClipboard text={emails}>
                  <button>Copy emails</button>
                </CopyToClipboard>
                <Ul>
                { sprint.participants.map((user) => {
                  return (
                    <Li key={user.email}>{user.email}</Li>
                  )
                })}
                </Ul>
              </ProgramTableRow>
            </>
          }
        </TableList>
      </ContentTableWrapper>
      <Section>
        {
          sprint.owner && 
            <ProfileCard
              profileImg={sprint.owner.profile.image}
              name={sprint.owner.profile.name}
              organization={sprint.owner.profile.organization}
              bio={sprint.owner.profile.bio || 'Thank you for your contribution.'}
            />
        }
      </Section>
      <Section style={{ marginTop: '36px'}}>
        <MarkdownWrapper contents={ sprint.desc }/>
      </Section>
    </PageTemplate>
  )
}

@(withRouter as any)
@inject('stores')
@observer
export class SprintDetail extends React.Component<PageDefaultPropsType> {
  render() {
    const { t } = this.props
    const id = parseInt(this.props.router.query.id)
    return (
      <Query query={SPRINT} variables={{id}}>
        {
          ({ loading, error, data }) => {
            if (loading) return (<Loading width={50} height={50}/>);
            return (
              <SprintDetailContent t={t} sprint={data.sprint}/>
            )
          }
        }
      </Query>
    )
  }
}

export default withNamespaces(['program'])(SprintDetail)
