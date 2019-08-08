import {
  H1,
  Section,
} from 'components/atoms/ContentWrappers'
import { AlertBar } from 'components/atoms/AlertBar'
import {PageDefaultPropsType} from 'types/PageDefaultPropsType'
import { Loading } from 'components/atoms/Loading'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import styled from '@emotion/styled'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { withNamespaces } from '../../i18n'
import { SpeakerSpan } from 'components/molecules/Program/Detail'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const SPONSOR = gql`
query Sponsor($id: ID!) {
  sponsor(id: $id) {
    id
    name
    openLunchTitle
    openLunchDesc
    logoImage
    url
  }
}
`
const SponsorLogo = styled.img`
  width: 30%;
  margin: 40px auto;
  display: block;
`

const OpenlunchDetailContent = (props) => {
  const {t, sponsor} = props
  const { name, openLunchTitle, openLunchDesc, logoImage, url} = sponsor
  const pageTitle = t('common:pageTitle', { title: openLunchTitle })
  return (
    <PageTemplate
      header={<Header title={ pageTitle } intlKey='' />}
      footer={<Footer />}
    >
      <H1 style={{ maxWidth: '600px' }}>
        { openLunchTitle }<br/>
        <SpeakerSpan>{ name }</SpeakerSpan><br/>
      </H1>
      <a href={url} target="_blank">
        <SponsorLogo src={logoImage} alt={name}/>
      </a>
      <Section style={{ marginTop: '36px'}}>
        <MarkdownWrapper contents={ openLunchDesc }/>
      </Section>
    </PageTemplate>
  )
}

@(withRouter as any)
@inject('stores')
@observer
export class OpenlunchDetail extends React.Component<PageDefaultPropsType> {
  render() {
    const { t } = this.props
    const id = this.props.router.query.id
    return (
      <Query query={SPONSOR} variables={{id}}>
        {
          ({ loading, error, data }) => {
            if (loading) return (<Loading width={50} height={50}/>);
            if (error) return (<AlertBar text={error.message} />)
            return (
              <OpenlunchDetailContent t={t} sponsor={data.sponsor}/>
            )
          }
        }
      </Query>
    )
  }
}

export default withNamespaces(['program'])(OpenlunchDetail)
