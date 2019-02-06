import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import { NextContext } from 'next'
import React from 'react'
import AboutPage, { AboutPagePropsType } from '../components/pages/AboutPage'
import { initRootStore } from '../stores/RootStore'
import { PagePropsType, PageStatesType } from './type'

class About extends React.Component<PagePropsType, PageStatesType> {

    constructor(props: PagePropsType) {
      super(props)
      this.state = {
          stores: initRootStore(props.isServer, props.initialState),
      }
    }

    public static async getInitialProps(context: NextContext) {
      const { req } = context
      const isServer = !!req
      const stores = initRootStore(isServer)

      return { initialState: getSnapshot(stores), isServer }
    }

    render () {
      const { stores } = this.state

      return (
        <Provider stores={stores}>
          <AboutPage {...{} as AboutPagePropsType} />
        </Provider>
      )
    }
}

export default About
