import { client } from 'lib/apollo_graphql/client'
import { getAuthToken } from 'lib/apollo_graphql/mutations/getAuthToken'
import { action, configure, observable } from 'mobx'
import ProfileStore from './ProfileStore'

// don't allow state modifications outside actions
configure({ enforceActions: 'observed' })

export enum clientIdEnum {
  github = 'bc6a4bddabaa55004090',
  google = '434664051101-ms06l6uja93lrjs3errmb73alb6dek1f.apps.googleusercontent.com',
  facebook = '373255026827477',
  naver = 'K1dzcT_4mOnrA7KTFVFq'
}

export class AuthStore {
  @observable inProgress: boolean = false
  @observable state: string = 'pending'
  @observable oAuthType?: keyof typeof clientIdEnum
  @observable clientId?: clientIdEnum

  @action
  async login (oAuthType: clientIdEnum, code: string) {
    if (oAuthType && code) {
      this.oAuthType = oAuthType
      this.clientId = clientIdEnum[this.oAuthType]

      // Get AuthToken
      const result = await getAuthToken(client)({
        clientId: this.clientId,
        oauthType: this.oAuthType,
        code,
        redirectUri: location.origin + '/',
      })
      // If error on getting a token
      if (result.errors) {
        throw new Error(`Authentication is failed: ${result.errors}`)
      }

      // Set Token
      const token = result.data.oAuthTokenAuth.token
      localStorage.setItem('token', token)

      // Set Profile
      await ProfileStore.retrieveProfile()
    }
  }
}

export default new AuthStore()
