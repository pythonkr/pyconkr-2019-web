import FontFaceObserver from 'fontfaceobserver'
import IntlPolyfill from 'intl'
import AuthStore, { AuthStore as AuthStoreType } from 'lib/stores/AuthStore'
import CFPStore, { CFPStore as CFPStoreType } from 'lib/stores/CFPStore'
import ProfileStore, { ProfileStore as ProfileStoreType } from 'lib/stores/ProfileStore'
import SponsorStore, { SponsorStore as SponsorStoreType } from 'lib/stores/SponsorStore'
import { LOCALE_KEY_KR, URL_LOCALE_KEY } from 'locales/constants'
import { Provider } from 'mobx-react'
import App, { Container } from 'next/app'
import intl from 'react-intl-universal'

global.Intl = IntlPolyfill
require('intl/locale-data/jsonp/ko.js')

export type StoresType = {
  authStore: AuthStoreType;
  profileStore: ProfileStoreType;
  sponsorStore: SponsorStoreType;
  cfpStore: CFPStoreType;
}
class MyApp extends App {

  stores: StoresType
  constructor(props: any) {
    super(props)
    this.stores = {
      authStore: AuthStore,
      profileStore: ProfileStore,
      sponsorStore: SponsorStore,
      cfpStore: CFPStore,
    }

    const { router: { query } } = this.props
    const currentLocale = query![URL_LOCALE_KEY] as string || LOCALE_KEY_KR
    intl.init({
      currentLocale,
      locales: {
        [currentLocale]: require(`locales/${currentLocale}`)
      }
    })
  }

  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    const isServer = !!ctx.req

    return { pageProps, isServer }
  }

  componentDidMount() {
    const spoqaHanSans = new FontFaceObserver('Spoqa Han Sans')
    spoqaHanSans.load()
      .then(() => {
        document && document.body.classList.add('font-loaded')
      })
    this.retrieveProfileIfTokenExists()
  }

  async retrieveProfileIfTokenExists() {
    if (this.stores.authStore.hasToken()) {
      this.stores.profileStore.retrieveProfile()
    }
  }

  render() {
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
