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
export class Sprint extends React.Component<PropsType> {
  async componentDidMount() {
  }
  render() {
    const { stores, t } = this.props
    const title = t('program:sprint.title')
    return (
      <PageTemplate
        header={<Header title={ t('common:pageTitle', {title}) } intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          { title }
        </H1>
        <Section>
          <Paragraph>
            { t('program:sprint.desc1') }
          </Paragraph>
          <Paragraph>
            { t('program:sprint.desc2') }
          </Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(Sprint)
