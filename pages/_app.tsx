import { injectGlobal } from 'emotion'
import emotionReset from 'emotion-reset'
import FontFaceObserver from 'fontfaceobserver'
import IntlPolyfill from 'intl'
import AuthStore, { AuthStore as AuthStoreType } from 'lib/stores/AuthStore'
import CFPStore, { CFPStore as CFPStoreType } from 'lib/stores/CFPStore'
import ProfileStore, { ProfileStore as ProfileStoreType } from 'lib/stores/ProfileStore'
import SponsorStore, { SponsorStore as SponsorStoreType } from 'lib/stores/SponsorStore'
import { LOCALE_KEY_KR, URL_LOCALE_KEY } from 'locales/constants'
import { Provider } from 'mobx-react'
import NProgress from 'next-nprogress/component'
import App, { Container } from 'next/app'
import 'rc-steps/assets/iconfont.css'
import 'rc-steps/assets/index.css'
import intl from 'react-intl-universal'
import { paths } from 'routes/paths'
import { CORAL } from 'styles/colors'
import { commonCSS } from 'styles/common'
import { fontCSS } from 'styles/font'

global.Intl = IntlPolyfill
require('intl/locale-data/jsonp/ko.js')

const intlWarningHandler = (message: string) => {
  if (message.includes('react-intl-universal key') &&
    message.includes(`not defined in ${LOCALE_KEY_KR}`)) {
    return
  }
  console.error(message)
}

injectGlobal`
  ${emotionReset}
  ${fontCSS}
  ${commonCSS}
`

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
      },
      warningHandler: intlWarningHandler
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

    this.handleOAuth()
  }

  async handleOAuth() {
    const { state, code } = this.props.router.query! as any

    if (!code) {
      this.stores.authStore.syncToken()

      if (this.stores.authStore.loggedIn) {
        this.stores.profileStore.retrieveMe()
      }

      return
    }

    await this.stores.authStore.login(state, code)

    if (!this.stores.profileStore.isAgreed) {
      this.props.router.push(paths.account.agreement)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <NProgress
          color={CORAL}
          options={{ trickleSpeed: 50 }}
          showAfterMs={300}
          spinner={false}
        />
        <Provider stores={this.stores}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default MyApp
