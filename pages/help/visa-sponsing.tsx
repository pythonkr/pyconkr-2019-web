import { ContentTableWrapper, Td, Tr, Table, TBody, isHeader, H1, H2, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
import styled from '@emotion/styled'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from '../_app'
import i18next from 'i18next'
import { withNamespaces } from '../../i18n'
import Link from 'next/link'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}


@inject('stores')
@observer
export class VisaSponsing extends React.Component<PropsType> {
  async componentDidMount() {
  }
  render() {
    const { stores, t } = this.props
    const title = t('help:visaSponsing.title')
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
            { t('help:visaSponsing.desc1') }
          </Paragraph>
          <Paragraph>
            { t('help:visaSponsing.desc2') }
          </Paragraph>
          <Paragraph>
            { t('help:visaSponsing.desc3') }
            <Ul>
              <Li>{ t('help:visaSponsing.desc3-1') }</Li>
              <Li>{ t('help:visaSponsing.desc3-2') }</Li>
              <Li>{ t('help:visaSponsing.desc3-3') }</Li>
              <Li>{ t('help:visaSponsing.desc3-4') }</Li>
              <Li>{ t('help:visaSponsing.desc3-5') }</Li>
              <Li>{ t('help:visaSponsing.desc3-6') }</Li>
              <Li>{ t('help:visaSponsing.desc3-7') }</Li>
              <Li>{ t('help:visaSponsing.desc3-8') }</Li>
            </Ul>
          </Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['help'])(VisaSponsing)
