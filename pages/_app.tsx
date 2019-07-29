import { AlertBar } from 'components/atoms/AlertBar'
import { injectGlobal } from 'emotion'
import emotionReset from 'emotion-reset'
import FontFaceObserver from 'fontfaceobserver'
import IntlPolyfill from 'intl'
import AuthStore, { AuthStore as AuthStoreType } from 'lib/stores/AuthStore'
import CFPStore, { CFPStore as CFPStoreType } from 'lib/stores/CFP/CFPStore'
import ProfileStore, { ProfileStore as ProfileStoreType } from 'lib/stores/ProfileStore'
import ProgramStore, { ProgramStore as ProgramStoreType } from 'lib/stores/Program/ProgramStore'
import ProposalReviewStore, { ProposalReviewStore as ProposalReviewStoreType } from 'lib/stores/ProposalReview/ProposalReviewStore'
import ScheduleStore, { ScheduleStore as ScheduleStoreType } from 'lib/stores/Schedule/ScheduleStore'
import SponsorStore, { SponsorStore as SponsorStoreType } from 'lib/stores/Sponsor/SponsorStore'
import TicketStore, { TicketStore as TicketStoreType } from 'lib/stores/Ticket/TicketStore'
import withGA from 'next-ga'

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

import { client } from 'lib/apollo_graphql/client'
import _ from 'lodash'
import { ApolloProvider } from 'react-apollo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { appWithTranslation, i18n, withNamespaces } from '../i18n'

global.Intl = IntlPolyfill
require('intl/locale-data/jsonp/ko.js')

const locales = {
  'ko-KR': require('locales/ko-KR'),
  'en-US': require('locales/en-US')
}

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
  proposalReviewStore: ProposalReviewStoreType;
  ticketStore: TicketStoreType;
  programStore: ProgramStoreType;
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
      proposalReviewStore: ProposalReviewStore,
      ticketStore: TicketStore,
      programStore: ProgramStore,
    }

    const { router: { query } } = this.props
    const currentLocale = query![URL_LOCALE_KEY] as string || LOCALE_KEY_KR

    intl.init({
      currentLocale,
      locales,
      warningHandler: intlWarningHandler
    })

    i18n.changeLanguage(_.isEqual(LOCALE_KEY_KR, currentLocale) ? 'ko' : 'en')
    i18n.init({ fallbackLng: 'ko' })
  }

  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    const isServer = !!ctx.req

    return { pageProps, isServer, namespacesRequired: ['common', 'constant'] }
  }

  async componentDidMount() {
    const spoqaHanSans = new FontFaceObserver('Spoqa Han Sans')
    spoqaHanSans.load()
      .then(() => {
        document && document.body.classList.add('font-loaded')
      })
    this.initializeStores()
    await this.handleOAuth()
  }

  initializeStores() {
    this.stores.scheduleStore.initialize()
    this.stores.sponsorStore.initialize()
  }

  async handleOAuth() {
    const { router } = this.props
    const { state, code } = router.query! as any
    const { authStore, profileStore } = this.stores
    const redirect_url = `${location.origin}${this.props.router.route}`

    if (!code) {
      authStore.syncToken()

      if (authStore.loggedIn) {
        await profileStore.retrieveMe()
        if (profileStore.isAgreed && router.asPath) {
          router.push(router.asPath)
          authStore.setLanguage((router.query as any).lang)
        }
      }

      return
    }

    await authStore.login(state, code, redirect_url)

    if (!profileStore.isAgreed) {
      this.props.router.push(`${paths.account.agreement}?redirect_url=${Router.route}`)
    }
  }

  render() {
    const { Component, pageProps } = this.props
    const { authStore, profileStore } = this.stores
    const isLoggedIn = authStore.loggedIn || true
    const isTermsAgreed = profileStore.isAgreed || true

    return (
      <ApolloProvider client={client}>
        <Container>
          <NProgress
            color={CORAL}
            options={{ trickleSpeed: 50 }}
            showAfterMs={300}
            spinner={false}
          />
          {isLoggedIn && !isTermsAgreed && (
            <AlertBar
              text='회원 가입이 완료되지 않았습니다. 약관을 확인하고 회원 가입을 완료해주세요.'
              link={{
                title: '완료하러 가기',
                to: paths.account.agreement,
                outlink: false
              }}
              style={{ margin: 0 }}
            />
          )}
          <Provider stores={this.stores}>
            <Component {...pageProps} />
          </Provider>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
          />
        </Container>
      </ApolloProvider>
    )
  }
}

export default appWithTranslation(withNamespaces(['common', 'constant'])(withGA(GA_TRACKING_ID, Router)(MyApp)))
