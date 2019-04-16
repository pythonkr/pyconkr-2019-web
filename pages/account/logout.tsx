import { H1 } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import PageTemplate from 'components/templates/PageTemplate'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import { RouterProps, withRouter } from 'next/router'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { paths } from 'routes/paths'
import { StoresType } from '../_app'

@inject('stores')
@(withRouter as any)
@observer
class Logout extends React.Component<{ stores: StoresType, router: RouterProps }> {
  componentWillMount() {
    const {stores, router} = this.props
    stores.authStore.logout()
    router.replace(paths.home)
  }

  render() {
    return (
      <PageTemplate
        header={<Header title='파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <H1><IntlText intlKey='homeTitle'>로그아웃</IntlText></H1>
      </PageTemplate>
    )
  }
}

export default Logout
