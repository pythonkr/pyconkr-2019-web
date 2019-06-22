import { H1, H2, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
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
export class OpenSpaceTalk extends React.Component<PropsType> {
  async componentDidMount() {
  }
  render() {
    const { stores, t } = this.props
    return (
      <PageTemplate
        header={<Header title={t('program:openSpaceTalk.pageTitle')} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          {t('program:openSpaceTalk.title')}
        </H1>
        <Section>
          <Paragraph>
            {t('program:openSpaceTalk.desc1')}
          </Paragraph>
        </Section>

        <Section>
          <H2>{t('program:openSpaceTalk.header2')}</H2>
          <Paragraph>
            {t('program:openSpaceTalk.desc2-1')}
          </Paragraph>
          <Paragraph>
            {t('program:openSpaceTalk.desc2-2')}
          </Paragraph>
        </Section>

        <Section>
          <H2>{t('program:openSpaceTalk.header3')}</H2>
          <Paragraph>
            {t('program:openSpaceTalk.desc3')}
          </Paragraph>
        </Section>

        <Section>
          <H2>{t('program:openSpaceTalk.header4')}</H2>
          <Paragraph>
            {t('program:openSpaceTalk.desc4')}
          </Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(OpenSpaceTalk)
