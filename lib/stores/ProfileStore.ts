import { client } from 'lib/apollo_graphql/client'
import { getProfile, ProfileType } from 'lib/apollo_graphql/queries/getProfile'
import { action, configure, observable } from 'mobx'
import { updateProfile } from 'lib/apollo_graphql/mutations/updateProfile';
import { uploadProfileImage } from 'lib/apollo_graphql/mutations/uploadProfileImage';

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
    clearProfile() {
        this.profile = {}
    }

    @action
    async updateProfile(profile: ProfileType) {
        if(profile && profile.hasOwnProperty('__typename')){
            delete profile.__typename
        }
        
        return updateProfile(client)({
            profileInput: profile
        }).then((response) => {
            this.setProfile(response.data.updateProfile.profile)
            return response.data.updateProfile.profile
        })
    }

    async uploadProfileImage(file: any) {
        return uploadProfileImage(client)({
            file
        }).then((result: any)=>{
            const image = result.data.uploadProfileImage.image
            this.setProfile({
                ...this.profile,
                image
            })
            return image
        })
    }
}

export default new ProfileStore()
