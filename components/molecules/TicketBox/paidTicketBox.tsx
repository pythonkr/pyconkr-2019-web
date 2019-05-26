import * as React from 'react'

import styled from '@emotion/styled'
import TicketPaidDescription from 'components/molecules/TicketBox/TicketPaidDescription'
import TicketInfo from 'components/molecules/TicketBox/TicketInfo'
import {observer} from 'mobx-react'
import {RouterProps} from 'next/router'
import {mobileWidth} from 'styles/layout'
import {TicketNode} from 'lib/apollo_graphql/queries/getMyTickets'
import i18next from 'i18next'

type PropsType = {
  ticket: TicketNode;
  t: i18next.TFunction;
  router: RouterProps;
}

type StatesType = {}

// TODO : 티켓 border color 는 type 에 따라 정의해두기
const TicketBoxWrapper = styled.div`
  border: 3px solid #088487;
  border-radius: 2px;
  display: flex;
  min-height: 300px;
  margin-bottom: 32px;
  @media (max-width: ${mobileWidth}) {
    display: block;
  }
`

@observer
class PaidTicketBox extends React.Component<PropsType, StatesType> {
  state = {}

  componentDidMount() {
    // todo : implement here
  }

  render() {
    const {router, ticket} = this.props
    const {id, product, amount, status, paidAt, cancelledAt} = ticket
    const {type, nameKo, nameEn, warningEn, warningKo, descEn, descKo, startAt, finishAt, cancelableDate} = product
    const isLanguageKorean = i18next.language === 'ko'
    const title = isLanguageKorean ? nameKo : nameEn
    const desc = isLanguageKorean ? descKo : descEn
    const warning = isLanguageKorean ? warningKo : warningEn

    return (
      <TicketBoxWrapper>
        <TicketPaidDescription
          title={title}
          description={desc}
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
        />
      </TicketBoxWrapper>
    )
  }
}

export default PaidTicketBox
