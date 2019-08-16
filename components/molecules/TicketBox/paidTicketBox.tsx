import * as React from 'react'
import {TicketBoxWrapper} from 'components/molecules/TicketBox'
import TicketPaidDescription from 'components/molecules/TicketBox/TicketPaidDescription'
import TicketInfo from 'components/molecules/TicketBox/TicketInfo'
import {observer} from 'mobx-react'
import {RouterProps} from 'next/router'
import {TicketNode} from 'lib/apollo_graphql/queries/getMyTickets'
import i18next from 'i18next'
import { TicketStatus } from 'lib/apollo_graphql/__generated__/globalTypes'
import { TICKET_COLOR } from 'styles/colors'

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

  getTicketColor = (type: string, status: string) => {
    if (status === TicketStatus.CANCELLED) return TICKET_COLOR.DISABLE

    const lowerType = type.toLocaleLowerCase()
    switch (lowerType) {
      case 'conference':
        return TICKET_COLOR.CONFERENCE
      case 'tutorial':
        return TICKET_COLOR.TUTORIAL
      case 'youngcoder':
        return TICKET_COLOR.YOUNGCODER
      case 'childcare':
        return TICKET_COLOR.CHILD_CARE
      case 'sprint':
        return TICKET_COLOR.SPRINT
      default:
        return TICKET_COLOR.DISABLE
    }
  }

  render() {
    const {router, ticket, stores, t} = this.props
    const {id, ticketId, product, amount, status, paidAt, cancelledAt} = ticket
    const {type, name, warning, desc, startAt, finishAt, cancelableDate} = product
    return (
      <TicketBoxWrapper
        ticketColor={this.getTicketColor(type, status)}>

        <TicketPaidDescription
          ticketId={ticketId}
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
