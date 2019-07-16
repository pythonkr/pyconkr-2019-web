import { H1, H2, H3, Paragraph, Section } from 'components/atoms/ContentWrappers'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { withNamespaces } from '../../i18n'

@inject('stores')
@observer
export class FinancialAid extends React.Component<PageDefaultPropsType> {
  render() {
    const { t } = this.props
    const title = t('help:financialAid.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          {t('help:staff.title')}
        </H1>
        <Section>
          <Paragraph>
            {t('help:staff.desc')}
          </Paragraph>
        </Section>
        <Section>
          <H2>{t('help:staff.pyconKoreaOrganizer.title')}</H2>
          <Paragraph>
            {t('help:staff.pyconKoreaOrganizer.desc')}
          </Paragraph>
          <H3>{t('help:staff.pyconKoreaOrganizer.listTitle')}</H3>
          <Paragraph style={{ fontWeight: 700, marginBottom: 0, marginTop: 5 }}>
            {t('help:staff.pyconKoreaOrganizer.list')}
          </Paragraph>
        </Section>
        <Section>
          <H2>{t('help:staff.volunteer.title')}</H2>
          <Paragraph>
            {t('help:staff.volunteer.desc')}  
          </Paragraph>
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
