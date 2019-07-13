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
import gql from 'graphql-tag'

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
  const sponsor = props.sponsor
  if(sponsor == null){
    return <Loading width={50} height={50}/>
  }
  return (<>
  <H1>{sponsor.name}</H1>
  <a href={sponsor.url} target="_blank">
    <SponsorLogo src={sponsor.logoImage} alt={sponsor.name}/>
  </a>
  <Section>
    <H2>홈페이지</H2>
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
  render() {
    const { id } = this.props.router.query
    const sponsor = this.props.stores.sponsorStore.sponsors.find(
      sponsor => sponsor.id === id
    )

    return (
      <PageTemplate
        header={<Header title='후원사 상세 :: 파이콘 한국 2019' intlKey='sponsor.detail.pageTitle'/>}
        footer={<Footer/>}
      >
        <SponsorContent sponsor={sponsor}/>

      </PageTemplate>
    )
  }
}
