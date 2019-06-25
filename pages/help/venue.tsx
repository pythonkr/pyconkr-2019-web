import { H1, H2, H3, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import styled from '@emotion/styled'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from '../_app'
import i18next from 'i18next'
import { withNamespaces } from '../../i18n'

const GoogleMapIFrame = styled.iframe`
  font-family: "Open Sans", "Helvetica Neue", "Apple SD Gothic Neo", "Nanum Gothic", Arial, "Apple Gothic", sans-serif;
  line-height: 24.08px;
  border-width: 0px;
  border-style: initial;
`

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}


@inject('stores')
@observer
export class Venue extends React.Component<PropsType> {
  async componentDidMount() {
  }

  render() {
    const { t } = this.props
    const title = t('help:venue.title')
    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          { title }
        </H1>
        <Section>
          <Paragraph>
            { t('help:venue.desc1') }
          </Paragraph>
          <Ul>
            <Li>{ t('help:venue.address') }</Li>
            <Li><a href="http://www.coex.co.kr/" target="_blank">http://www.coex.co.kr/</a></Li>
          </Ul>
          <GoogleMapIFrame 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.820434500639!2d127.05690121619708!3d37.51215307980805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d6bd01b%3A0x30702ebd32133065!2sCoex+Mall!5e0!3m2!1sen!2skr!4v1463414893518" 
            allowfullscreen="" frameborder="0" height="450" width="600">
          </GoogleMapIFrame>
        </Section>
        <Section>
          <H2>{ t('help:venue.header2') }</H2>
          <H3>{ t('help:venue.header2-1') }</H3>
          <Paragraph>
          <a href="http://www.coex.co.kr/tour-guide/traffic/location-1" target="_blank">
            [한글] http://www.coex.co.kr/tour-guide/traffic/location-1</a>
          </Paragraph>
          <Paragraph>
          <a href="https://www.coexcenter.com/directions-map-subway" target="_blank">
            [Eng] https://www.coexcenter.com/directions-map-subway</a>
          </Paragraph>
          <Ul>
            <Li>{ t('help:venue.desc2-1-1') }</Li>
            <Li>{ t('help:venue.desc2-1-2') }</Li>
            <Li>{ t('help:venue.desc2-1-3') }</Li>
          </Ul>
          <H3>{ t('help:venue.header2-2') }</H3>
          <Paragraph>
            <a href="http://www.coex.co.kr/tour-guide/traffic/location-2" target="_blank">
              [한글] http://www.coex.co.kr/tour-guide/traffic/location-2</a>
          </Paragraph>
          <Paragraph>
            <a href="https://www.coexcenter.com/directions-map-bus" target="_blank">
              [Eng] https://www.coexcenter.com/directions-map-bus</a>
          </Paragraph>
          <Paragraph>
            { t('help:venue.desc2-2-1') }
          </Paragraph>
          <Ul>
            <Li>{ t('help:venue.desc2-2-1-1') }</Li>
            <Li>{ t('help:venue.desc2-2-1-2') }</Li>
            <Li>{ t('help:venue.desc2-2-1-3') }</Li>
            <Li>{ t('help:venue.desc2-2-1-4') }</Li>
            <Li>{ t('help:venue.desc2-2-1-5') }</Li>
            <Li>{ t('help:venue.desc2-2-1-6') }</Li>
          </Ul>
          <Paragraph>
            { t('help:venue.desc2-2-2') }
          </Paragraph>
          <Ul>
            <Li>{ t('help:venue.desc2-2-2-1') }</Li>
            <Li>{ t('help:venue.desc2-2-2-2') }</Li>
            <Li>{ t('help:venue.desc2-2-2-3') }</Li>
            <Li>{ t('help:venue.desc2-2-2-4') }</Li>
            <Li>{ t('help:venue.desc2-2-2-5') }</Li>
          </Ul>
          <Paragraph>
            { t('help:venue.desc2-2-3') }
          </Paragraph>
          <Ul>
            <Li>{ t('help:venue.desc2-2-3-1') }</Li>
            <Li>{ t('help:venue.desc2-2-3-2') }</Li>
            <Li>{ t('help:venue.desc2-2-3-3') }</Li>
            <Li>{ t('help:venue.desc2-2-3-4') }</Li>
            <Li>{ t('help:venue.desc2-2-1-5') }</Li>
          </Ul>
          <Paragraph>
            { t('help:venue.desc2-2-4') }
          </Paragraph>
          <Ul>
            <Li>{ t('help:venue.desc2-2-4-1') }</Li>
            <Li>{ t('help:venue.desc2-2-4-2') }</Li>
            <Li>{ t('help:venue.desc2-2-4-3') }</Li>
          </Ul>
          <Paragraph>
            { t('help:venue.desc2-2-5') }
          </Paragraph>
          <Ul>
            <Li>{ t('help:venue.desc2-2-5-1') }</Li>
            <Li>{ t('help:venue.desc2-2-5-2') }</Li>
            <Li>{ t('help:venue.desc2-2-5-3') }</Li>
          </Ul>
          <H3>{ t('help:venue.header2-3') }</H3>
          <Paragraph>
            { t('help:venue.desc2-3-1') }
          </Paragraph>
          <Paragraph>
            { t('help:venue.desc2-3-2') }
          </Paragraph>
          <H3>{ t('help:venue.header2-4') }</H3>
          <Paragraph>
            { t('help:venue.desc2-4-1') }
          </Paragraph>
          <Paragraph>
            { t('help:venue.desc2-4-2') }
            (<a href="http://www.coex.co.kr/tour-guide/traffic/parking-1" target="_blank">
              http://www.coex.co.kr/tour-guide/traffic/parking-1</a>)
          </Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['help'])(Venue)
