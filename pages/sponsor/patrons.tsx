import { AlertBar } from 'components/atoms/AlertBar'
import { H1, Section } from 'components/atoms/ContentWrappers'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PatronList from 'components/organisms/PatronList'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { withNamespaces } from '../../i18n'

@inject('stores')
@observer
export class Patrons extends React.Component<PageDefaultPropsType> {

  static async getInitialProps() {
    return {
        namespacesRequired: ['sponsor'],
    }
  }

  async componentDidMount() {
    const { stores } = this.props
    await stores.sponsorStore.retrievePatrons()
  }

  render() {
    const { t, stores } = this.props

    return (
      <PageTemplate
        header={<Header titleTranslated={t('sponsor:patron.headerTitle')}/>}
        footer={<Footer />}
      >
        <H1>{t('sponsor:patron.headerTitle')}</H1>
        {!stores.sponsorStore.patrons || _.isEmpty(stores.sponsorStore.patrons)
          ? <Section>
              <AlertBar text={t('sponsor:patron.waitingAlert')} />
            </Section>
          : <Section>
              <PatronList stores={stores} />
            </Section>
        }
      </PageTemplate>
    )
  }
}

export default withNamespaces(['sponsor'])(Patrons)
