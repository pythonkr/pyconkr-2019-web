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

export class Youngcoder extends React.Component<PropsType> {
  render() {
    const { t } = this.props
    const title = t('program:youngCoder.title')

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
