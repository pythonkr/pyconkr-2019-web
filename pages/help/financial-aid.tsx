import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { ContentButtonWrapper, ContentTableWrapper, H1, H2, isHeader, Li, Paragraph, Section, Table, TBody, Td, Tr, Ul } from 'components/atoms/ContentWrappers'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import React from 'react'
import { withNamespaces } from '../../i18n'

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
export class FinancialAid extends React.Component<PropsType> {
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
            <a
              href='http://blog.pycon.kr/2017/06/14/everybody-pays/'
              target='_blank'
              rel='noreferrer'
            >
               [(Ko)Everybody Pays]
            </a>
            <a
              href='http://jessenoller.com/blog/2011/05/25/pycon-everybody-pays'
              target='_blank'
              rel='noreferrer'
            >
              [(En)Everybody Pays]
            </a>
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
          <Paragraph style={{ fontWeight: 700, marginBottom: 0, marginTop: 5 }}>
            { t('help:financialAid.desc2-3') }
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
          </Ul>
          <Paragraph style={{ fontWeight: 700, marginBottom: 0, marginTop: 5 }}>
            { t('help:financialAid.desc4-3-1') }
          </Paragraph>
          <ContentButtonWrapper>
            <Button
              intlKey='tempkey'
              to='https://forms.gle/PJ93TnWFgHTkEM7f7'
              outlink
            >재정지원 신청하기</Button>
          </ContentButtonWrapper>
        </Section>
        <Section>
          <H2>{t('common:contact')}</H2>
          <Paragraph><a href='mailto:pyconkr@pycon.kr'>pyconkr@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['help'])(FinancialAid)
