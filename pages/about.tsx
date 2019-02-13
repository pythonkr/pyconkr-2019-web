import React from 'react'
import { inject, observer } from 'mobx-react'
import { IRootStore } from 'stores/RootStore'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'

@inject('stores')
@observer
class About extends React.Component<{stores: IRootStore}> {
    render () {
      const { stores } = this.props
      console.log(stores.pendingCount)
      return (
        <PageTemplate
          header={<Header />}
          footer={<Footer />}
        >
            <span>About Pycon</span>
        </PageTemplate>
      )
    }
}

export default About
