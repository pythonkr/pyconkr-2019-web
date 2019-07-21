import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import * as React from 'react'

import { H1 } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import TimeTable from 'components/organisms/Timetable'
import PageTemplate from 'components/templates/PageTemplate'

import { timetableMenu } from 'routes/paths'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { withNamespaces } from '../../i18n'

@(withRouter as any)
@inject('stores')
@observer
class Talks extends React.Component<PageDefaultPropsType> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['timetable'],
    }
  }

  async componentDidMount() {
    const { stores } = this.props
    const presentations = await stores.cfpStore.retrievePresentations()
    if (presentations) stores.cfpStore.setPresentations(presentations)
  }

  render() {
    const { t, stores } = this.props
    const _title = t('timetable:talks.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title: _title })} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={timetableMenu.submenu} />
        <H1>{ _title }</H1>
        <TimeTable stores={stores} t={t} />
      </PageTemplate >
    )
  }
}

export default  withNamespaces(['timetable'])(Talks)
