import { getMe_me_profile } from 'lib/apollo_graphql/__generated__/getMe'
import { client } from 'lib/apollo_graphql/client'
import { updateAgreement } from 'lib/apollo_graphql/mutations/updateAgreement'
import { ProfileNode, updateProfile } from 'lib/apollo_graphql/mutations/updateProfile'
import { uploadProfileImage } from 'lib/apollo_graphql/mutations/uploadProfileImage'
import { getMe } from 'lib/apollo_graphql/queries/getMe'
import { action, configure, observable } from 'mobx'

configure({ enforceActions: 'always' })

export class ProfileStore {
  // 약관에 동의했는지 여부를 저장합니다.
  @observable isAgreed = false
  @observable isStaff = false
  @observable isSuperuser = false
  @observable profile: ProfileNode | {} = {}

  @action
  async retrieveMe() {
    const response = await getMe(client)({})
    if (response.data.me) {
      this.profile = {
        ...response.data.me.profile
      }
      this.isStaff = response.data.me.isStaff || false
      this.isSuperuser = response.data.me.isSuperuser || false
      this.isAgreed = response.data.me.isAgreed || false
    }

    return response.data.me
  }

  @action
  async updateAgreement(agreements: any) {
    const response = await updateAgreement(client)({
      ...agreements
    })
    if (response.data.updateAgreement.isAgreedAll) {
      await this.retrieveMe()
    } 
    return response.data.updateAgreement
  }

  @action
  clearUser() {
    this.isStaff = false
    this.isAgreed = false
    this.isSuperuser = false
    this.profile = {}
  }

  @action
  setProfile(profile: ProfileNode) {
    this.profile = {
      ...profile
    }
  }

  @action
  async updateProfile(profile: ProfileNode) {
    if (profile && profile.hasOwnProperty('__typename')) {
      delete profile.__typename
    }

    return updateProfile(client)({
      data: profile
    }).then(response => {
      this.setProfile(response.data.updateProfile.profile)

      return response.data.updateProfile.profile
    })
  }

  @action
  async uploadProfileImage(file: any) {
    const response = await uploadProfileImage(client)({
      file
    })
    const image = response.data.uploadProfileImage.image
    this.profile = {
      ...this.profile,
      image
    }

    return image
  }
}

export default new ProfileStore()
