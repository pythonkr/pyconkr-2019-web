import { inject, observer } from 'mobx-react'
import React from 'react'
import { IRootStore } from '../../../stores/RootStore'
import Footer from '../../organisms/Footer'
import Header from '../../organisms/Header'
import PageTemplate from '../../templates/PageTemplate'

export type AboutPagePropsType = {
  stores: IRootStore;
}

@inject('stores')
@observer
class AboutPage extends React.Component<AboutPagePropsType> {
  render() {
    return (
      <PageTemplate
        header={<Header />}
        footer={<Footer />}
      >
          About Pycon
      </PageTemplate>
    )
  }
}

export default AboutPage
