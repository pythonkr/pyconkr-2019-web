import AuthStore, { AuthStore as AuthStoreType } from 'lib/stores/AuthStore'
import ProfileStore, { ProfileStore as ProfileStoreType } from 'lib/stores/ProfileStore'
import SponsorStore, { SponsorStore as SponsorStoreType } from 'lib/stores/SponsorStore'
import { Provider } from 'mobx-react'
import App, { Container } from 'next/app'

export type StoresType = {
  authStore: AuthStoreType;
  profileStore: ProfileStoreType;
  sponsorStore: SponsorStoreType;
}
class MyApp extends App {

  stores: StoresType
  constructor (props: any) {
    super(props)
    this.stores = {
      authStore: AuthStore,
      profileStore: ProfileStore,
      sponsorStore: SponsorStore,
    }
  }

  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {}

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }
    const isServer = !!ctx.req

    return { pageProps, isServer }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Provider stores={this.stores}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default MyApp
