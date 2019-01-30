import { applySnapshot, Instance, IStateTreeNode, types } from 'mobx-state-tree'

let store: IStateTreeNode = null as any

const Store = types
  .model({
    lastUpdate: types.Date,
    light: false,
  })
  .actions(self => {
    let timer: NodeJS.Timeout
    const start = () => {
      timer = setInterval(() => {
        // mobx-state-tree doesn't allow anonymous callbacks changing data
        // pass off to another action instead
        (self as any).update()
      },                  1000)
    }

    const update = () => {
      self.lastUpdate = new Date(Date.now())
      self.light = true
    }

    const stop = () => {
      clearInterval(timer)
    }

    return { start, stop, update }
  })

type IStore = Instance<typeof Store>
const aaa: IStore = null as any;

const initStore = (isServer: boolean, snapshot?: IStore) => {
  if (isServer) {
    store = Store.create({ lastUpdate: Date.now() })
  }
  if (store === null) {
    store = Store.create({ lastUpdate: Date.now() })
  }
  if (snapshot) {
    applySnapshot(store, snapshot)
  }

  return store
}

export { initStore, IStore }
