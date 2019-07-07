import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import TicketBox from 'components/molecules/TicketBox'
import i18next from 'i18next'
import _ from 'lodash'
import { observer } from 'mobx-react'
import { RouterProps } from 'next/router'
import { StoresType } from 'pages/_app'
import * as React from 'react'

type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
  router: RouterProps;
}

@observer
class SprintTicketList extends React.Component<PropsType> {

  renderTicketBoxList = () => {
    const { stores, t, router } = this.props
    const {
      sprintProducts,
      setPayingTicket,
      getIsTicketStepExist,
      setTicketStep,
      getTicketStep,
      setPrice,
    } = stores.ticketStore

    return sprintProducts.map(sprintProduct => {
      const { id, name, desc, warning, price, isEditablePrice, ticketOpenAt, ticketCloseAt, isSoldOut } = sprintProduct
      const isTicketStepExist = getIsTicketStepExist(id)
      if (!isTicketStepExist) setTicketStep(id, name)
      const ticketStep = getTicketStep(id)

      if (!ticketStep) return null

      return (
        <TicketBox
          t={t}
          key={`ticketBox_${id}`}
          title={name || ''}
          description={desc || ''}
          warning={warning || ''}
          price={price}
          isEditablePrice={isEditablePrice}
          setTicket={() => setPayingTicket(ticketStep)}
          setPrice={setPrice}
          router={router}
          startDate={ticketOpenAt}
          endDate={ticketCloseAt}
          isSoldOut={isSoldOut}
          step={1}
        />
      )
    })
  }

  render() {
    const { stores } = this.props
    const { authStore } = stores
    const isAuthStoreInitialized = authStore.isInitialized
    const isLoggedIn = authStore.loggedIn

    if (!isAuthStoreInitialized) {
      return <Loading width={50} height={50}/>
    }

    return (
      !isLoggedIn
      ? <FormNeedsLogin />
      :  this.renderTicketBoxList()
    )
  }
}

export default SprintTicketList
