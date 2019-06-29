import {
  ContentTableWrapper,
  H1,
  Section,
  TableList,
} from 'components/atoms/ContentWrappers'
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
import { Tag } from 'components/molecules/Program/List'
import { ProgramTableRow, SpeakerSpan } from 'components/molecules/Program/Detail'
import ProfileCard from 'components/molecules/ProfileCard'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

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
    
  }
}
`


const TutorialDetailContent = (props) => {
  const {t, tutorial} = props
  const pageTitle = t('common:pageTitle', { title: tutorial.name })
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
        </TableList>
      </ContentTableWrapper>
      <Section style={{ marginTop: '36px'}}>
        <MarkdownWrapper contents={ tutorial.desc }/>
      </Section>
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
    </PageTemplate>
  )
}

@(withRouter as any)
@inject('stores')
@observer
export class TutorialDetail extends React.Component<PageDefaultPropsType> {
  render() {
    const { t } = this.props
    const id = parseInt(this.props.router.query.id)
    return (
      <Query query={TUTORIAL} variables={{id}}>
        {
          ({ loading, error, data }) => {
            if (loading || error) return (<Loading width={50} height={50}/>);
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
