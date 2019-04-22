import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from '../_app'

@inject('stores')
@observer
export default class ProposingATalk extends React.Component<{ stores: StoresType }> {
  state = {
    // todo : implement here
  }

  render() {

    return (
      <PageTemplate
        header={<Header title='발표 제안 리뷰하기 :: 파이콘 한국 2019' intlKey=''/>}
        footer={<Footer />}
      >
        // todo : implement here
      </PageTemplate>
    )
  }
}
