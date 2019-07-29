import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
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

export class OpenSpaceTalk extends React.Component<PropsType> {
  render() {
    const { t } = this.props
    const title = t('program:openSpaceTalk.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={programMenu.submenu} />
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
