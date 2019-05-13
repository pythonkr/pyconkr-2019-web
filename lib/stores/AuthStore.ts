import { client } from 'lib/apollo_graphql/client'
import { getAuthToken } from 'lib/apollo_graphql/mutations/getAuthToken'
import { action, computed, configure, observable } from 'mobx'
import ProfileStore from './ProfileStore'
import _ from 'lodash'

// don't allow state modifications outside actions
configure({ enforceActions: 'observed' })

// DefinePlugin으로 초기화한 변수를 Typescript에서
// 인식하게 하기 위해 declare 구문을 추가했습니다
// next.config.js를 참고해주세요
declare var GITHUB_CLIENT_ID: clientIdEnum
declare var GOOGLE_CLIENT_ID: clientIdEnum
declare var FACEBOOK_CLIENT_ID: clientIdEnum
declare var NAVER_CLIENT_ID: clientIdEnum

export enum clientIdEnum {
  github = GITHUB_CLIENT_ID,
  google = GOOGLE_CLIENT_ID,
  facebook = FACEBOOK_CLIENT_ID,
  naver = NAVER_CLIENT_ID
}

const TOKEN_KEY = 'token'
const CODE = 'code'

export class AuthStore {
  @observable isInitialized = false
  @observable inProgress: boolean = false
  @observable state: string = 'pending'
  @observable oAuthType?: keyof typeof clientIdEnum
  @observable clientId?: clientIdEnum
  @observable accessToken?: string | null = null
  @observable code?: string | null = null
  @observable language?: string | null = null

  @action
  async login(oAuthType: keyof typeof clientIdEnum, code: string, redirect_url: string) {
    if (!oAuthType || !code) {
      return
    }
    this.oAuthType = oAuthType
    this.clientId = clientIdEnum[this.oAuthType]

    const localStorageCode = localStorage.getItem(CODE)
    const localStorageAccessCode = localStorage.getItem(TOKEN_KEY)

    if (!_.isEqual(localStorageCode, code) && !localStorageAccessCode) {
      // Get AuthToken
      const response = await getAuthToken(client)({
        clientId: this.clientId,
        oauthType: this.oAuthType,
        code,
        redirectUri: redirect_url
      })
      const accessToken = response.data.oAuthTokenAuth.token
      localStorage.setItem(TOKEN_KEY, accessToken)
      localStorage.setItem(CODE, code)
    }

    this.setAccessToken(localStorage.getItem(TOKEN_KEY))
    this.setCode(localStorage.getItem(CODE))
    this.isInitialized = true

    return ProfileStore.retrieveMe()
  }

  @action
  logout() {
    this.accessToken = null
    ProfileStore.clearUser()
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(CODE)
  }

  @action
  setCode(code: string | null) {
    this.code = code
  }

  @action
  setAccessToken(accessToken: string | null) {
    this.accessToken = accessToken
  }

  @computed
  get loggedIn() {
    return this.accessToken != null
  }

  @action
  syncToken() {
    this.accessToken = localStorage.getItem(TOKEN_KEY)
    // TODO: Check if token is valid
    this.isInitialized = true
  }

  @action
  setLanguage(language: string) {
    this.language = language
  }
}

export default new AuthStore()
