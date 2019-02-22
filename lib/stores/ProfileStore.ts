import { client } from 'lib/apollo_graphql/client'
import { getProfile, ProfileType } from 'lib/apollo_graphql/queries/getProfile'
import { action, observable, configure } from 'mobx'

configure({ enforceActions: 'always' })

export class Profile {
    @observable name: string = '';
    @observable avatarUrl: string = '';
}

export class ProfileStore {
    @observable email: string = '';
    @observable profile = {}
    @observable username: string = '';

    @action
    getProfile() {
        return getProfile(client)({})
    }

    @action
    setProfile(profile: ProfileType) {
        this.email = profile.email
        this.profile = {...profile.profile}
        this.username = profile.username
    }
}

export default new ProfileStore()