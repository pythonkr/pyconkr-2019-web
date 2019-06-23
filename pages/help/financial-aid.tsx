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
const FinancialAidTableRow = (props) => <>
  <Tr>
    <Td className={isHeader}>
      { props.header }
    </Td>
    <Td>
      { props.children }
    </Td>
  </Tr>
</>


@inject('stores')
@observer
export class Babycare extends React.Component<PropsType> {
  async componentDidMount() {
  }
  render() {
    const { stores, t } = this.props
    const title = t('help:financialAid.title')
    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          { title }
        </H1>
        <Section>
          <H2>{ t('help:financialAid.header1') }</H2>
          <Paragraph>
            { t('help:financialAid.desc1-1') }
          </Paragraph>
          <Paragraph>
            { t('help:financialAid.desc1-2') } 
            <a href='http://blog.pycon.kr/2017/06/14/everybody-pays/' target='_blank'>[(Ko)Everybody Pays] </a>
            <a href='http://jessenoller.com/blog/2011/05/25/pycon-everybody-pays' target='_blank'>[(En)Everybody Pays] </a>
          </Paragraph>
          <Paragraph>
            { t('help:financialAid.desc1-3') }
          </Paragraph>
          <Paragraph>
            { t('help:financialAid.desc1-4') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('help:financialAid.header2') }</H2>
          <Paragraph>
            { t('help:financialAid.desc2-1') }
          </Paragraph>
          <Paragraph>
            { t('help:financialAid.desc2-2') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('help:financialAid.header3') }</H2>
          <Paragraph>
            { t('help:financialAid.desc3-1') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('help:financialAid.header4') }</H2>
          <Ul>
            <Li>{ t('help:financialAid.desc4-1') }</Li>
            <Li>{ t('help:financialAid.desc4-2') }</Li>
            <Li>{ t('help:financialAid.desc4-3') }</Li>
            <Li>{ t('help:financialAid.desc4-3-1') }</Li>
          </Ul>
        </Section>
        <Section>
          <H2>{t('common:contact')}</H2>
          <Paragraph><a href='mailto:pyconkr@pycon.kr'>pyconkr@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['help'])(Babycare)
