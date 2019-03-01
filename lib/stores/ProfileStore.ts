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

    @action
    logout() {
        this.email = ''
        this.profile = {}
        this.username = ''
    }

    @action
    async updateProfile({ name, phone, organization}) {
        const result = await updateProfile(client)({
            profileInput: {
                name,
                phone,
                organization
            }
        })
        debugger
    }
}

export default new ProfileStore()
