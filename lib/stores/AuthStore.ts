import { client } from 'lib/apollo_graphql/client'
import { getAuthToken } from 'lib/apollo_graphql/mutations/getAuthToken'
import { action, computed, configure, observable } from 'mobx'
import ProfileStore from './ProfileStore'

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

export class AuthStore {
  @observable isInitialized = false
  @observable inProgress: boolean = false
  @observable state: string = 'pending'
  @observable oAuthType?: keyof typeof clientIdEnum
  @observable clientId?: clientIdEnum
  @observable accessToken?: string | null = null

  @action
  async login(oAuthType: keyof typeof clientIdEnum, code: string) {
    if (!oAuthType || !code) {
      return
    }
    this.oAuthType = oAuthType
    this.clientId = clientIdEnum[this.oAuthType]

    // Get AuthToken
    const response = await getAuthToken(client)({
      clientId: this.clientId,
      oauthType: this.oAuthType,
      code,
      redirectUri: location.origin + '/'
    })
    const accessToken = response.data.oAuthTokenAuth.token
    this.setAccessToken(accessToken)
    this.isInitialized = true
    localStorage.setItem(TOKEN_KEY, accessToken)

    return ProfileStore.retrieveMe()
  }

  @action
  logout() {
    this.accessToken = null
    ProfileStore.clearUser()
    localStorage.removeItem(TOKEN_KEY)
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
    this.isInitialized = true
  }
}

export default new AuthStore()
