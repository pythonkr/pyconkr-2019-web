import { client } from "lib/apollo_graphql/client";
import { getMe } from "lib/apollo_graphql/queries/getMe";
import { action, configure, observable } from "mobx";
import {
  updateProfile,
  ProfileNode
} from "lib/apollo_graphql/mutations/updateProfile";
import { uploadProfileImage } from "lib/apollo_graphql/mutations/uploadProfileImage";
import { updateAgreement } from "lib/apollo_graphql/mutations/updateAgreement";
import { setupMaster } from "cluster";

configure({ enforceActions: "always" });

export class ProfileStore {
  @observable user = {};
  @observable profile = {};

  @action
  async retrieveMe() {
    var response = await getMe(client)({});
    if (response.data.me) {
      await this.setUser(response.data.me);
    }
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
  setUser(user: any) {
    this.profile = { ...user.profile };
    delete user.profile;
    this.user = { ...user };
    console.log(this.profile);
    console.log(this.user);
  }

  @action
  clearUser() {
    this.user = {};
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
    return uploadProfileImage(client)({
      file
    }).then((result: any) => {
      const image = result.data.uploadProfileImage.image;
      this.setProfile({
        ...this.profile,
        image
      });
      return image;
    });
  }
}

export default new ProfileStore();
