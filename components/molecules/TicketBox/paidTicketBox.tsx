import * as React from 'react'
import {TicketBoxWrapper} from 'components/molecules/TicketBox'
import TicketPaidDescription from 'components/molecules/TicketBox/TicketPaidDescription'
import TicketInfo from 'components/molecules/TicketBox/TicketInfo'
import {observer} from 'mobx-react'
import {RouterProps} from 'next/router'
import {TicketNode} from 'lib/apollo_graphql/queries/getMyTickets'
import i18next from 'i18next'
import { TicketStatus } from 'lib/apollo_graphql/__generated__/globalTypes'
import { CONFERENCE, SPRINT, TUTORIAL, YOUNGCODER, CHILD_CARE} from 'styles/colors'

type PropsType = {
  stores: StoresType;
  ticket: TicketNode;
  t: i18next.TFunction;
  router: RouterProps;
}

type StatesType = {}


@observer
class PaidTicketBox extends React.Component<PropsType, StatesType> {
  state = {}

  getTicketColor = (type: string) => {
    const lowerType = type.toLocaleLowerCase()
    switch(lowerType){
      case 'conference':
        return CONFERENCE
      case 'tutorial':
        return TUTORIAL
      case 'youngcoder':
        return YOUNGCODER
      case 'childcare':
        return CHILD_CARE
      case 'sprint':
        return SPRINT
    }
  }

  render() {
    const {router, ticket, stores, t} = this.props
    const {id, product, amount, status, paidAt, cancelledAt} = ticket
    const {type, name, warning, desc, startAt, finishAt, cancelableDate} = product

    return (
      <TicketBoxWrapper
        ticketColor={this.getTicketColor(type)}>
        <TicketPaidDescription
          title={status === TicketStatus.CANCELLED ? `[Cancelled] ${name}` : name }
          description={desc}
          status={status}
          warning={warning}
          startAt={startAt}
          finishAt={finishAt}
        />
        <TicketInfo
          amount={amount}
          paidAt={paidAt}
          cancelledAt={cancelledAt}
          status={status}
          cancelableDate={cancelableDate}
          id={id}
          router={router}
          stores={stores}
          t={t}
        />
      </TicketBoxWrapper>
    )
  }
}

export default PaidTicketBox
