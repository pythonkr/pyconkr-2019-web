import {FormNeedsLogin} from 'components/atoms/FormNeedsLogin'
import {Loading} from 'components/atoms/Loading'
import PaidTicketBox from 'components/molecules/TicketBox/paidTicketBox'
import i18next from 'i18next'
import {observer} from 'mobx-react'
import {RouterProps} from 'next/router'
import {StoresType} from 'pages/_app'
import * as React from 'react'

type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
  router: RouterProps;
}

@observer
class MyTicketList extends React.Component<PropsType> {
  componentDidMount() {
    const {stores} = this.props
  }

  renderTicketBoxList = () => {
    const {stores, router, t} = this.props
    const {myTickets} = stores.ticketStore

    return myTickets.map(ticket => {
      return (
        <PaidTicketBox
          stores={stores}
          ticket={ticket}
          t={t}
          router={router}
        />
      )
    })
  }

  render() {
    const {stores} = this.props
    const {authStore} = stores
    const isAuthStoreInitialized = authStore.isInitialized
    const isLoggedIn = authStore.loggedIn

    if (!isAuthStoreInitialized) {
      return <Loading width={50} height={50}/>
    }

    return (
      !isLoggedIn
        ? <FormNeedsLogin/>
        : this.renderTicketBoxList()
    )
  }
}

export default MyTicketList
