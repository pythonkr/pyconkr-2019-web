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
export class StaffPage extends React.Component<PageDefaultPropsType> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['contribute'],
    }
  }

  render() {
    const { t } = this.props
    const title = t('contribute:staff.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer />}
      >
        <H1>
          {title}
        </H1>
        <Section>
          <Paragraph>
            {t('contribute:staff.desc')}
          </Paragraph>
        </Section>
        <Section>
          <H2>{t('contribute:staff.pyconKoreaOrganizer.title')}</H2>
          <Paragraph>
            {t('contribute:staff.pyconKoreaOrganizer.desc')}
          </Paragraph>
          <H3>{t('contribute:staff.pyconKoreaOrganizer.listTitle')}</H3>
          <Paragraph style={{ fontWeight: 700, marginBottom: 0, marginTop: 5 }}>
            {t('contribute:staff.pyconKoreaOrganizer.list')}
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

export default withNamespaces(['contribute'])(StaffPage)
