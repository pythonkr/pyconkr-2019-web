import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {PageDefaultPropsType} from 'types/PageDefaultPropsType'
import PageTemplate from 'components/templates/PageTemplate'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import {H1, H2, Paragraph, Section} from 'components/atoms/ContentWrappers'
import {IntlText} from 'components/atoms/IntlText'
import {toJS} from 'mobx'
import {withRouter} from 'next/router'
import {Loading} from 'components/atoms/Loading'
import styled from '@emotion/styled'

const SponsorLogo = styled.img`
  width: 50%;
  margin: 40px auto;
  display: block;
`

const SponsorContent = (props) => {
  const sponsor = props.sponsor
  if(sponsor == null){
    return <Loading width={50} height={50}/>
  }
  return (<>
  <H1>{sponsor.name} - {sponsor.level.name}</H1>
  <a href={sponsor.url} target="_blank">
    <SponsorLogo src={sponsor.logoImage} alt={sponsor.name}/>
  </a>
  <Section>
    <a href={sponsor.url} target="_blank">{sponsor.url}</a>
  </Section>
  <Section>
    <Paragraph>
      {sponsor.desc}
    </Paragraph>
  </Section>
  </>)
}

@(withRouter as any)
@inject('stores')
@observer
export default class SponsorDetail extends React.Component<PageDefaultPropsType> {
  async componentDidMount() {
    const {stores} = this.props
    await stores.sponsorStore.retrieveSponsor(this.props.router.query.id)
  }

  renderSponsor = () => {
    const {stores} = this.props
    const sponsor = toJS(stores.sponsorStore.currentSponsor)
    
    return (
      <PageTemplate
        header={<Header title='후원사 상세 :: 파이콘 한국 2019' intlKey='sponsor.detail.pageTitle'/>}
        footer={<Footer/>}
      >
        <SponsorContent sponsor={sponsor}/>
        
      </PageTemplate>
    )
  }

  render() {
    return (
        this.renderSponsor()
    )
  }
}
