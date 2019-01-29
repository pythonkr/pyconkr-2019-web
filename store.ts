import { applySnapshot, types } from 'mobx-state-tree'

let store: any = null

const Store = types
  .model({
    lastUpdate: types.Date,
    light: false,
  })
  .actions((self) => {
    let timer: NodeJS.Timeout
    const start = () => {
      timer = setInterval(() => {
        // mobx-state-tree doesn't allow anonymous callbacks changing data
        // pass off to another action instead
        (self as any).update()
      },                  1000)
    }

    const update = () => {
      self.lastUpdate = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)
      self.light = true
    }

    const stop = () => {
      clearInterval(timer)
    }

    return { start, stop, update }
  })

export function initStore (isServer: boolean, snapshot = null) {
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
