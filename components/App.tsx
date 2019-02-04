import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import React from 'react'
import { IRootStore } from '../stores/RootStore'

export type AppPropsType = {
  rootStore: IRootStore;
}

@inject('rootStore')
@observer
class App extends React.Component<AppPropsType> {
  render() {
    return (
      <div>
          Pycon Homepage
      </div>
    )
  }
}

export default App
