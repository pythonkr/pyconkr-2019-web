import { types } from 'mobx-state-tree'
import { UserStore, UserStoreType } from 'stores/UserStore'

const TodoStore = types
  .model({
    name: types.optional(types.string, ''),
    done: types.optional(types.boolean, false),
    user: types.maybe(types.reference(types.late(() => UserStore))),
  })
  .actions(self => {
    function setName(newName: string) {
      self.name = newName;
    }
    function setUser(user: UserStoreType | '') {
      if (user === '') {
        // When selected value is empty, set as null
        self.user = null as any
      } else {
        self.user = user as UserStoreType
      }
    }
    function toggle() {
      self.done = !self.done
    }

    return { setName, setUser, toggle }
  })

type TodoStoreType = typeof TodoStore.Type

export { TodoStore, TodoStoreType }
