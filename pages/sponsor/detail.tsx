import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {PageDefaultPropsType} from 'types/PageDefaultPropsType'
import PageTemplate from 'components/templates/PageTemplate'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import {H1, H2, Paragraph, Section} from 'components/atoms/ContentWrappers'
import {withRouter} from 'next/router'
import {Loading} from 'components/atoms/Loading'
import styled from '@emotion/styled'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_SPONSOR = gql`
query Sponsor($id: ID!) {
  sponsor(id: $id) {
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
  const sponsor = props.sponsor
  if(sponsor == null){
    return <Loading width={50} height={50}/>
  }
  return (<>
  <H1>{sponsor.name} - {sponsor.level.name}</H1>
  <H2 align="center">{sponsor.level.name}</H2>
  <a href={sponsor.url} target="_blank">
    <SponsorLogo src={sponsor.logoImage} alt={sponsor.name}/>
  </a>
  <Section>
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
export default class SponsorDetail extends React.Component<PageDefaultPropsType> {
  async componentDidMount() {
  }

  renderSponsor = () => {
    const id = this.props.router.query.id
    return (
      <PageTemplate
        header={<Header title='후원사 상세 :: 파이콘 한국 2019' intlKey='sponsor.detail.pageTitle'/>}
        footer={<Footer/>}
      >
        <Query query={GET_SPONSOR} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading || error) return (<Loading width={50} height={50}/>);
            return (
              <SponsorContent sponsor={data.sponsor}/>
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
