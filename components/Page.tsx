import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import React from 'react'
import Clock from './Clock'

export type PropsType = {
  store?: any;
  title: string;
  linkTo: string;
}

@inject('store')
@observer
class Page extends React.Component<PropsType> {
  componentDidMount () {
    const { store } = this.props
    store.start()
  }

  componentWillUnmount () {
    const { store } = this.props
    store.stop()
  }

  render () {
    const { store, title, linkTo } = this.props

    return (
      <div>
        <h1>{title}</h1>
        <Clock lastUpdate={store.lastUpdate} light={store.light} />
        <nav>
          <Link href={linkTo}><a>Navigate</a></Link>
        </nav>
      </div>
    )
  }
}

export default Page
