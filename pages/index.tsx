import React from 'react'
import { inject, observer } from 'mobx-react'
import { IRootStore } from 'stores/RootStore'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'

export type IndexPagePropsType = {
  stores: IRootStore;
}

@inject('stores')
@observer
class Index extends React.Component<{stores: IRootStore}> {
    render () {
      return (
      <PageTemplate
        header={<Header />}
        footer={<Footer />}
      >
        <span>Pycon HomePage</span>
      </PageTemplate>
      )
    }
}

export default Index
