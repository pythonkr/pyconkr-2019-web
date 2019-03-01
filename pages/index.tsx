import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import { parse } from 'qs'
import React from 'react'
import { StoresType } from './_app';
import { H1 } from 'components/atoms/H1';

@inject('stores')
@observer
class Index extends React.Component<{stores: StoresType}> {
    async componentDidMount () {
      this.handleOAuthCallback()
      this.retrieveProfileIfTokenExists()
    }

    async handleOAuthCallback () {
      const { stores } = this.props
      if (location.search.indexOf('code') === -1) return
      const { state, code } = parse(location.search, { ignoreQueryPrefix: true })
      await stores.authStore.login(state, code)
      Router.push('/')
    }

    async retrieveProfileIfTokenExists() {
      const { stores } = this.props
      if (stores.authStore.hasToken()){
        stores.profileStore.retrieveProfile()
      }
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
