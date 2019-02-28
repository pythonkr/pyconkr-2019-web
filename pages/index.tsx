import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import { parse } from 'qs'
import React from 'react'
import { StoresType } from './_app';
import { H1 } from 'components/atoms/H1';

@inject('stores')
@observer
class Index extends React.Component<{stores: StoresType}> {
    async componentDidMount () {
      const { stores } = this.props

      if (location.search.indexOf('code') === -1) return
      const { code } = parse(location.search, { ignoreQueryPrefix: true })
      await stores.authStore.login(code)
    }

    render () {
      return (
        <PageTemplate
          header={<Header title='파이콘 한국 2019' />}
          footer={<Footer />}
        >
          <H1 intlKey='homeTitle'>파이콘 홈페이지</H1>
        </PageTemplate>
      )
    }
}

export default Index
