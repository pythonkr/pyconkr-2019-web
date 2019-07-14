import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {PageDefaultPropsType} from 'types/PageDefaultPropsType'
import PageTemplate from 'components/templates/PageTemplate'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import {H1, H2, Section} from 'components/atoms/ContentWrappers'
import {withRouter} from 'next/router'
import {Loading} from 'components/atoms/Loading'
import styled from '@emotion/styled'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import { withNamespaces } from '../../i18n'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_SPONSOR = gql`
query Sponsor($id: ID!) {
  sponsor(id: $id) {
    id
    name
    level {
      name
    }
    desc
    url
    logoImage
  }
}
`

const SponsorLogo = styled.img`
  width: 50%;
  margin: 40px auto;
  display: block;
`

const SponsorContent = (props: any) => {
  const {t, sponsor} = props
  if(sponsor == null){
    return <Loading width={50} height={50}/>
  }
  return (<>
  <H1>{sponsor.name}</H1>
  <a href={sponsor.url} target="_blank">
    <SponsorLogo src={sponsor.logoImage} alt={sponsor.name}/>
  </a>
  <Section>
    <H2>{t('sponsor:detail.homepage')}</H2>
    <a href={sponsor.url} target="_blank">{sponsor.url}</a>
  </Section>
  <Section>
    <MarkdownWrapper contents={sponsor.desc}/>
  </Section>
  </>)
}

@(withRouter as any)
@inject('stores')
@observer
export class SponsorDetail extends React.Component<PageDefaultPropsType> {
  async componentDidMount() {
  }

  renderSponsor = () => {
    const id = this.props.router.query.id
    const {t} = this.props
    const title = t('sponsor:detail.title')
    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer/>}
      >
        <Query query={GET_SPONSOR} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading || error) return (<Loading width={50} height={50}/>);
            return (
              <SponsorContent sponsor={data.sponsor} t={t}/>
            )
          }}
        </Query>
        
      </PageTemplate>
    )
  }

  render() {
    return (
        this.renderSponsor()
    )
  }
}

export default withNamespaces(['sponsor'])(SponsorDetail)