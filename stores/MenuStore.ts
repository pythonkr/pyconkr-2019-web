import { types } from 'mobx-state-tree'

const MenuStore = types
  .model({
    name: types.optional(types.string, ''),
    openDate: types.maybe(types.Date),
    closeDate: types.maybe(types.Date),
  })

type MenuStoreType = typeof MenuStore.Type

export { MenuStore, MenuStoreType }
