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
export class Youngcoder extends React.Component<PropsType> {
  async componentDidMount() {
  }
  render() {
    const { stores, t } = this.props
    const title = t('program:youngCoder.title')
    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', {title})} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          { title }
        </H1>
        <Section>
          <H2>{ t('program:youngCoder.header1') }</H2>
          <Paragraph>
            { t('program:youngCoder.desc1-1') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc1-2') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc1-3') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('program:youngCoder.header2') }</H2>
          <Paragraph>
            { t('program:youngCoder.desc2-1') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc2-2') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc2-3') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc2-4') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{ t('program:youngCoder.header3') }</H2>
          <Paragraph>
            { t('program:youngCoder.desc3-1') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc3-2') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc3-3') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc3-4') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc3-5') }
          </Paragraph>
          <Paragraph>
            { t('program:youngCoder.desc3-6') }
          </Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(Youngcoder)
