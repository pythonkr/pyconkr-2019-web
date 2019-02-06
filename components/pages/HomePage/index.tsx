import { inject, observer } from 'mobx-react'
import React from 'react'
import { IRootStore } from '../../../stores/RootStore'
import Footer from '../../organisms/Footer'
import Header from '../../organisms/Header'
import PageTemplate from '../../templates/PageTemplate'

export type HomePagePropsType = {
  stores: IRootStore;
}

@inject('stores')
@observer
class HomePage extends React.Component<HomePagePropsType> {
  render() {
    const { stores } = this.props
    console.log(stores.completedCount)

    return (
      <PageTemplate
        header={<Header />}
        footer={<Footer />}
      >
          Pycon HomePage
      </PageTemplate>
    )
  }
}

export default HomePage
