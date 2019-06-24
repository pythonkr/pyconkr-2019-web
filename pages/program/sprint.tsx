import { Button } from 'components/atoms/Button'
import { ContentButtonWrapper, H1, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import _ from 'lodash'
import React from 'react'
import { programMenu } from 'routes/paths'
import { withNamespaces } from '../../i18n'

export type PropsType = {
  t: i18next.TFunction;
}

export class Sprint extends React.Component<PropsType> {
  render() {
    const { t } = this.props
    const title = t('program:sprint.title')

    return (
      <PageTemplate
        header={<Header title={ t('common:pageTitle', {title}) } intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={programMenu.submenu} />
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
          <ContentButtonWrapper>
            <Button
              intlKey='tempkey'
              to='https://forms.gle/6C5JCqGtC657DQ6i6'
              outlink
            >스프린트 진행 신청하기</Button>
          </ContentButtonWrapper>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(Sprint)
