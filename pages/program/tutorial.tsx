import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import React from 'react'
import { programMenu } from 'routes/paths'
import { withNamespaces } from '../../i18n'

export type PropsType = {
  t: i18next.TFunction;
}

export class Tutorial extends React.Component<PropsType> {
  render() {
    const { t } = this.props
    const title = t('program:tutorial.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', {title})} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={programMenu.submenu} />
        <H1>
          { title }
        </H1>
        <Section>
          <Paragraph>
            { t('program:tutorial.desc1') }
          </Paragraph>
          <Paragraph>
            { t('program:tutorial.desc2') }
          </Paragraph>
        </Section>
        <Section>
          <H2>{t('common:contact')}</H2>
          <Paragraph>
            <a href='mailto: program@pycon.kr'>program@pycon.kr</a>
          </Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['program'])(Tutorial)
