import { Button } from 'components/atoms/Button'
import { ContentButtonWrapper, H1, Paragraph, Section } from 'components/atoms/ContentWrappers'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@inject('stores')
@observer
export class Sprint extends React.Component<PropsType> {
  render() {
    const { t } = this.props
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
        <ContentButtonWrapper>
            <Button
              intlKey='tempkey'
              to='https://forms.gle/6C5JCqGtC657DQ6i6'
              outlink
            >스프린트 진행 신청하기</Button>
          </ContentButtonWrapper>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(Sprint)
