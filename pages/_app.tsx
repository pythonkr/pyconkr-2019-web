import withMstStore from "../lib/with-mst-store";
import App, { Container } from 'next/app'
import { Provider } from 'mobx-react'

export type PropsType = {
  stores: any;
}

class MyApp extends App<PropsType> {
  render () {
    const { Component, pageProps, stores } = this.props

    return (
      <Container>
        <Provider stores={stores}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )

  }
}

export default withMstStore(MyApp)