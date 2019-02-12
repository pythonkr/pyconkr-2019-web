import React from 'react'
import { initRootStore } from '../stores/RootStore'
import { getSnapshot } from 'mobx-state-tree'
import { IRootStore } from '../stores/RootStore'

const isServer = typeof window === 'undefined'
// const __NEXT_MST_STORE__ = '__NEXT_REDUX_STORE__'

// function getOrCreateStore () {
//   // Always make a new store if server, otherwise state is shared between requests
//   if (isServer) return initRootStore(isServer)

//   // Create store if unavailable on the client and set it on the window object
//   if (!window[__NEXT_MST_STORE__]) {
//     window[__NEXT_MST_STORE__] = initRootStore(isServer)
//   }
//   return window[__NEXT_MST_STORE__]
// }

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