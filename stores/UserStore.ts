import { types } from 'mobx-state-tree'

const UserStore = types.model({
    id: types.identifier,
    name: types.optional(types.string, ''),
})

type UserStoreType = typeof UserStore.Type

export { UserStore, UserStoreType }
