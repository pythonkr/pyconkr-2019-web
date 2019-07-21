import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import * as React from 'react'

import { H1 } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'

import { timetableMenu } from 'routes/paths'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { withNamespaces } from '../../i18n'

@(withRouter as any)
@inject('stores')
@observer
class Sprint extends React.Component<PageDefaultPropsType> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['timetable'],
    }
  }

  render() {
    const { t } = this.props
    const _title = t('timetable:sprint.title')

    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title: _title })} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={timetableMenu.submenu} />
        <H1>{ _title }</H1>
      </PageTemplate >
    )
  }
}

export default  withNamespaces(['timetable'])(Sprint)
