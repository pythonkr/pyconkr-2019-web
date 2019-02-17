import React from 'react'
import { initRootStore } from '../stores/RootStore'
import { getSnapshot } from 'mobx-state-tree'
import { IRootStore } from '../stores/RootStore'

const isServer = typeof window === 'undefined'

type PagePropsType = {
    isServer: boolean;
    initialState: IRootStore;
}

type PageStatesType = {
    stores: IRootStore;
}

export { PagePropsType, PageStatesType }


export default (App: any) => {
  return class AppWithMstStore extends React.Component<PagePropsType, PageStatesType> {
    constructor (props: PagePropsType) {
      super(props)
      this.state = {
        stores: initRootStore(props.isServer, props.initialState),
      }
    }

    static async getInitialProps (appContext: any) {
      const stores = initRootStore(isServer)

      // Provide the store to getInitialProps of pages
      appContext.ctx.stores = stores

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialState: getSnapshot(stores),
        isServer,
      }
    }

    render () {
      const { stores } = this.state

      return <App {...this.props} stores={stores} />
    }
  }
}
