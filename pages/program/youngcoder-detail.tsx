import {
  ContentTableWrapper,
  H1,
  H2,
  Section,
  TableList,
} from 'components/atoms/ContentWrappers'
import styled from '@emotion/styled'
import ProfileCard from 'components/molecules/ProfileCard'
import { Loading } from 'components/atoms/Loading'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'
import { Tag } from 'components/molecules/Program/List'
import { ProgramTableRow, SpeakerSpan } from 'components/molecules/Program/Detail'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const YOUNGCODER = gql`
query YoungCoder($id: Int!) {
  youngCoder(id: $id) {
    id
    name
    companyName
    companyDesc
    companyLogo
    numOfParticipants
    scheduleDesc
    desc
    difficulty {
      id
      name
      nameEn
      nameKo
    }
    owner {
      profile {
        name
        bio
        image
      }
    }
  }
}
`


export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

const CompanyImg = styled.img`
width: 300px;
margin: 20px 0;
`

const YoungCoderContent = ({t, youngCoder}) => {
  return (<>
    <H1>{ youngCoder.name }</H1>
    <ContentTableWrapper>
      <TableList>
        <ProgramTableRow
          header={t('program:youngCoderDetail.companyName')}
        >
          { youngCoder.companyName }
        </ProgramTableRow>
        <ProgramTableRow
          header={t('program:youngCoderDetail.minimumAge')}
        >
          { youngCoder.difficulty.name }
        </ProgramTableRow>
        <ProgramTableRow
          header={t('program:youngCoderDetail.numOfParticipants')}
        >
          { youngCoder.numOfParticipants }
        </ProgramTableRow>
        <ProgramTableRow
          header={t('program:youngCoderDetail.scheduleDesc')}
        >
          { youngCoder.scheduleDesc }
        </ProgramTableRow>
      </TableList>
    </ContentTableWrapper>
    <Section>
      {
        youngCoder.owner && 
          <ProfileCard
            profileImg={youngCoder.owner.profile.image}
            name={youngCoder.owner.profile.name}
            organization={youngCoder.owner.profile.organization}
            bio={youngCoder.owner.profile.bio || ''}
          />
      }
    </Section>
    <Section style={{ marginTop: '36px'}}>
      <MarkdownWrapper contents={ youngCoder.desc }/>
    </Section>
    <Section>
      <H2>{t('program:youngCoderDetail.companyDescTitle')}</H2>
      <figure>
        <CompanyImg src={ youngCoder.companyLogo }></CompanyImg>
      </figure>
      <MarkdownWrapper contents={ youngCoder.companyDesc }/>
    </Section>
  </>)
}

@(withRouter as any)
@inject('stores')
@observer
export class YoungCoderDetail extends React.Component<PropsType> {
  render() {
    const { t } = this.props
    const id = parseInt(this.props.router.query.id)

    return (
      <Query query={YOUNGCODER} variables={{ id }}>
        {({ loading, error, data }) => {
            if (loading || error) return (<Loading width={50} height={50}/>)
            const youngCoder = data.youngCoder
            const title = youngCoder.name
            return (
              <PageTemplate
                header={<Header title={ t('common:pageTitle', { title }) } intlKey='' />}
                footer={<Footer />}>
                <YoungCoderContent youngCoder={youngCoder} t={t}/>
              </PageTemplate>
            )
        }}
      </Query>
    )
  }
}

export default withNamespaces(['program'])(YoungCoderDetail)
