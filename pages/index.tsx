
import { injectGlobal } from 'emotion'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import { NextContext } from 'next'
import React from 'react'
import Page from '../components/Page'
import { initStore } from '../store'

injectGlobal`
  html, body {
    padding: 3rem 1rem;
    margin: 0;
    background: papayawhip;
    min-height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 24px;
  }
`

export type PropsType = {
  isServer: boolean;
  initialState: any;
}

export default class Counter extends React.Component<PropsType> {
  store: any

  constructor (props: PropsType) {
    super(props)
    this.store = initStore(props.isServer, props.initialState)
  }
  static getInitialProps ({ req }: NextContext) {
    const isServer = !!req
    const store = initStore(isServer)

    return { initialState: getSnapshot(store), isServer }
  }

  render () {
    return (
      <Provider store={this.store}>
        <Page title='Index Page' linkTo='/other' />
      </Provider>
    )
  }
}
