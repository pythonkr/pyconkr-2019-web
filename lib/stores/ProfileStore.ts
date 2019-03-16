import { client } from "lib/apollo_graphql/client";
import { getMe } from "lib/apollo_graphql/queries/getMe";
import { action, configure, observable } from "mobx";
import {
  updateProfile,
  ProfileNode
} from "lib/apollo_graphql/mutations/updateProfile";
import { uploadProfileImage } from "lib/apollo_graphql/mutations/uploadProfileImage";
import { updateAgreement } from "lib/apollo_graphql/mutations/updateAgreement";

configure({ enforceActions: "always" });

export class ProfileStore {
  // 약관에 동의했는지 여부를 저장합니다.
  @observable isAgreed = false;
  @observable isStaff = false;
  @observable isSuperuser = false;
  @observable profile = {};

  @action
  async retrieveMe() {
    var response = await getMe(client)({});
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
    var response = await updateAgreement(client)({
      ...agreements
    });
    if (response.updateAgreement.isActive) {
      await this.retrieveMe();
    }
  }


  @action
  clearUser() {
    this.isStaff = false;
    this.isAgreed = false;
    this.isSuperuser = false;
    this.profile = {};
  }

  @action
  setProfile(profile: ProfileNode) {
    this.profile = {
      ...profile
    };
  }

  @action
  async updateProfile(profile: ProfileNode) {
    if (profile && profile.hasOwnProperty("__typename")) {
      delete profile.__typename;
    }

    return updateProfile(client)({
      profileInput: profile
    }).then(response => {
      this.setProfile(response.data.updateProfile.profile);
      return response.data.updateProfile.profile;
    });
  }

  @action
  async uploadProfileImage(file: any) {
    let response = await uploadProfileImage(client)({
      file
    })
    const image = response.data.uploadProfileImage.image;
    this.profile = {
      ...this.profile,
      image
    }
    return image;
  }
}

export default new ProfileStore();
