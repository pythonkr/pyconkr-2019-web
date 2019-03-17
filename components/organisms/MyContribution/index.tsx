import { Empty } from 'components/atoms/Empty'
import { Loading } from 'components/atoms/Loading'
import { inject, observer } from 'mobx-react'
import { RouterProps, withRouter } from 'next/router'
import { StoresType } from 'pages/_app'
import React from 'react'

@inject('stores')
@withRouter
@observer
class MyContribution extends React.Component<{
  stores: StoresType;
  router: RouterProps;
}> {
  render() {
    const { stores } = this.props

    if (!stores.cfpStore.isInitialized) {
      return <Loading width={50} height={50}/>
    }

    if (stores.cfpStore.proposal === null) {
      return <Empty />
    }

    return <div>hohohohoh</div>
  }
}

export default MyContribution
