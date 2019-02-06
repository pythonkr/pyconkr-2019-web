import { applySnapshot, types } from 'mobx-state-tree'
import { TodoStore, TodoStoreType } from './TodoStore'
import { UserStore } from './UserStore'

// tslint:disable:object-literal-key-quotes
const snapShot: object = {
    users: {
        '1': {
            id: '1',
            name: 'mweststrate',
        },
        '2': {
            id: '2',
            name: 'mattiamanzati',
        },
        '3': {
            id: '3',
            name: 'johndoe',
        },
    },
    todos: {
        '1': {
        name: 'Eat a cake',
        done: true,
        },
    },
}

const RootStore = types
    .model({
        users: types.map(UserStore),
        todos: types.optional(types.map(TodoStore), {}),
    })
    .views(self => ({
        get pendingCount() {
            if (!self.todos) return null

            return Array.from(self.todos.values())
                .filter((todo: any) => {
                    return !todo.done;
                }).length
        },
        get completedCount() {
            return Array.from(self.todos.values())
                .filter((todo: TodoStoreType) => todo.done).length
        },
        getTodosWhereDoneIs(done: boolean) {
            return Array.from(self.todos.values())
                .filter((todo: TodoStoreType) => todo.done === done)
        },
    }))
    .actions(self => {
        function addTodo(id: string, name: string) {
            self.todos.set(id, TodoStore.create({ name }));
        }

        return { addTodo }
    })

type IRootStore = typeof RootStore.Type
let rootStore: IRootStore

function initRootStore(
  isServer: boolean,
  snapshot?: object,
): IRootStore {
  if (isServer) {
    rootStore = RootStore.create(snapShot)
  }
  if (rootStore == null) {
    rootStore = RootStore.create(snapShot)
  }
  if (snapshot) {
    applySnapshot(rootStore, snapshot)
  }

  return rootStore
}

export { IRootStore, initRootStore }
