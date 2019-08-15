import {
  ContentTableWrapper,
  Ul,
  Li,
  H1,
  Section,
  TableList,
} from 'components/atoms/ContentWrappers'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { Loading } from 'components/atoms/Loading'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import ProfileCard from 'components/molecules/ProfileCard'
import { ProgramTableRow, SpeakerSpan } from 'components/molecules/Program/Detail'
import { Tag } from 'components/molecules/Program/List'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import gql from 'graphql-tag'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { Query } from 'react-apollo'
import {PageDefaultPropsType} from 'types/PageDefaultPropsType'
import {formatDateInWordsWithWeekdayAndTime} from 'utils/formatDate'
import { withNamespaces } from '../../i18n'

const TUTORIAL = gql`
query Tutorial($id: Int!) {
  tutorial(id: $id) {
    id
    name
    desc
    language
    numOfParticipants
    startedAt
    finishedAt
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
    difficulty {
      name
      nameEn
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

const TutorialDetailContent = (props) => {
  const { t, tutorial } = props
  const pageTitle = t('common:pageTitle', { title: tutorial.name })
  const emails = tutorial.participants ? tutorial.participants.map((user) => {
    return user.email
  }).join(',') : ''

  return (
    <PageTemplate
      header={<Header title={ pageTitle } intlKey='' />}
      footer={<Footer />}
    >
      <H1 style={{ maxWidth: '600px' }}>
        { tutorial.name }<br/>
        <SpeakerSpan>{tutorial.owner? tutorial.owner.profile.name: ''}</SpeakerSpan><br/>
      </H1>
      <ContentTableWrapper>
        <TableList>
          {
            tutorial.difficulty &&
            <ProgramTableRow
              header={t('program:common.difficulty')} >
              <Tag className={tutorial.difficulty.nameEn.toLowerCase()}>
                {tutorial.difficulty.name}
              </Tag>
            </ProgramTableRow>
          }
          <ProgramTableRow
            header={t('program:common.language')} >
            { tutorial.language }
          </ProgramTableRow>
          {
            tutorial.startedAt &&
            <ProgramTableRow
              header={t('program:common.datetime')} >
              { `${formatDateInWordsWithWeekdayAndTime(tutorial.startedAt)}~${formatDateInWordsWithWeekdayAndTime(tutorial.finishedAt)}` }
            </ProgramTableRow>
          }
          {
            tutorial.place &&
            <ProgramTableRow
              header={t('program:common.place')} >
              { tutorial.place.name }
            </ProgramTableRow>
          }
          {
            tutorial.participants &&
            <>
              <ProgramTableRow
                header={t('program:common.participantCount')} >
                { `${tutorial.participants.length}` }
              </ProgramTableRow>
              <ProgramTableRow
                header={t('program:common.participantList')} >
                <CopyToClipboard text={emails}>
                  <button>Copy emails</button>
                </CopyToClipboard>
                <Ul>
                { tutorial.participants.map((user) => {
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
          tutorial.owner && 
            <ProfileCard
              profileImg={tutorial.owner.profile.image}
              name={tutorial.owner.profile.name}
              organization={tutorial.owner.profile.organization}
              bio={tutorial.owner.profile.bio || 'Thank you for your contribution.'}
            />
        }
      </Section>
      <Section style={{ marginTop: '36px'}}>
        <MarkdownWrapper contents={ tutorial.desc }/>
      </Section>
    </PageTemplate>
  )
}

@(withRouter as any)
@inject('stores')
@observer
export class TutorialDetail extends React.Component<PageDefaultPropsType> {

  static async getInitialProps() {
    return {
      namespacesRequired: ['program'],
    }
  }

  render() {
    const { t } = this.props
    const id = parseInt(this.props.router.query.id)

    return (
      <Query query={TUTORIAL} variables={{id}}>
        {
          ({ loading, error, data }) => {
            if (loading) return (<Loading width={50} height={50}/>)

            return (
              <TutorialDetailContent t={t} tutorial={data.tutorial}/>
            )
          }
        }
      </Query>
    )
  }
}

export default withNamespaces(['program'])(TutorialDetail)
