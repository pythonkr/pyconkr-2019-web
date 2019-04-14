import { AlertBar } from 'components/atoms/AlertBar'
import { injectGlobal } from 'emotion'
import emotionReset from 'emotion-reset'
import FontFaceObserver from 'fontfaceobserver'
import IntlPolyfill from 'intl'
import ScheduleStore, { ScheduleStore as ScheduleStoreType } from 'lib/stores/Schedule/ScheduleStore'
import AuthStore, { AuthStore as AuthStoreType } from 'lib/stores/AuthStore'
import CFPStore, { CFPStore as CFPStoreType } from 'lib/stores/CFP/CFPStore'
import ProfileStore, { ProfileStore as ProfileStoreType } from 'lib/stores/ProfileStore'
import SponsorStore, { SponsorStore as SponsorStoreType } from 'lib/stores/Sponsor/SponsorStore'

import { LOCALE_KEY_KR, URL_LOCALE_KEY } from 'locales/constants'
import { Provider } from 'mobx-react'
import NProgress from 'next-nprogress/component'
import App, { Container } from 'next/app'
import Router from 'next/router'
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
  scheduleStore: ScheduleStoreType;
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
      scheduleStore: ScheduleStore,
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
        // tslint:disable-next-line:non-literal-require
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
    this.initializeSchedule()
    this.handleOAuth()
  }

  initializeSchedule() {
    this.stores.scheduleStore.initialize()
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
    const redirect_url = `${location.origin}${this.props.router.route}`
    await this.stores.authStore.login(state, code, redirect_url)
    if (!this.stores.profileStore.isAgreed) {
      this.props.router.push(`${paths.account.agreement}?redirect_url=${Router.asPath}`)
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
        {this.stores.authStore.loggedIn && !this.stores.profileStore.isAgreed && <AlertBar
          text='회원 가입이 완료되지 않았습니다. 약관을 확인하고 회원 가입을 완료해주세요.'
          link={{
            title: '완료하러 가기',
            to: paths.account.agreement,
            outlink: false
          }}
          style={{ margin: 0 }}
        />}
        <Provider stores={this.stores}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default MyApp
