import { client } from 'lib/apollo_graphql/client'
import { getProfile, ProfileType } from 'lib/apollo_graphql/queries/getProfile'
import { action, configure, observable } from 'mobx'
import { updateProfile } from 'lib/apollo_graphql/mutations/updateProfile';

configure({ enforceActions: 'always' })

export class Profile {
    @observable name: string = '';
    @observable avatarUrl: string = '';
}

export class ProfileStore {
    @observable profile = {}

    @action
    async retrieveProfile() {
        var response = await getProfile(client)({})
        this.setProfile(response.data.profile)
    }

    @action
    setProfile(profile: ProfileType) {
        this.profile = {...profile}
    }

    @action
    logout() {
        this.profile = {}
    }

    @action
    async updateProfile(profile: ProfileType) {
        if(profile && profile.hasOwnProperty('__typename')){
            delete profile.__typename
        }
        const response = await updateProfile(client)({
            profileInput: profile
        })
        this.setProfile(response.data.updateProfile.profile)
    }
}

export default new ProfileStore()
