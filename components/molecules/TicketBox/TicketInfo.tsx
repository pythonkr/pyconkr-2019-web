import styled from '@emotion/styled'
import * as React from 'react'
import {mobileWidth} from 'styles/layout'
import {formatDateInWordsWithWeekdayAndTime} from 'utils/formatDate'
import {isFuture} from 'date-fns'
import {paths} from 'routes/paths'
import {RouterProps} from 'next-server/router'
import { TicketStatus } from 'lib/apollo_graphql/__generated__/globalTypes'
import { StoresType } from 'pages/_app'
import { toast } from 'react-toastify'
import * as QRCode from 'qrcode.react'

type PropsType = {
  amount: number;
  status: any;
  paidAt: any;
  cancelledAt: any;
  cancelableDate: any;
  id: string;
  router: RouterProps;
  stores: StoresType;
  t: i18next.TFunction;
}

const TicketInfoWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 29px 10px 20px 10px;
    border-left: 1px dashed;

    p {
    text-align: right;
    font-size: 26px;
    font-weight: bold;
    color: #088487;

    input[type=tel] {
        width: 157px;
        height: 54px;
        border-radius: 4px;
        border: solid 1px #ced3d6;
        background-color: #ffffff;
        padding-right: 12px;
        font-size: 21px;
        text-align: right;
    }
    }

    button {
        width: 187px;
        height: 54px;
        background-color: #088487;
        color: #FFF;
        font-size: 18px;
        margin-top: 5px;
        margin-left: auto;
        outline: none;
    }

    .disabledButton {
        opacity: 0.4
    }

    @media (max-width: ${mobileWidth}) {
        display: block;
        padding: 45px 28px 36px;
        border-left: none;
        border-top: 1px dashed #85c0c1;
        text-align: center;

        p {
            text-align: center;
        }

        button {
            width: 85%;
            margin: 25px 0 0 0;
        }
    }
`

const InfoText = styled.div`
    margin-top: 8px;
    font-size: 14px;
    text-align: right;
`

const PriceText = styled.div`
    font-size: 20px;
    text-align: right;
    font-weight: bold;
`

const TicketQRCode = styled(QRCode)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`

const TicketButtonWrapper = styled.div`
  margin-top: auto;
  button {
    margin-left: auto;
    width: 100%;
  }
`

class TicketInfo extends React.Component<PropsType> {
  state = {
    adjustedPrice: 150000
  }

  onDetail = () => {
    const {router, id} = this.props
    const path = `${paths.ticket.myTicket}?id=${id}`
    router.push(path)
  }

  onRefund = async () => {
    const {t} = this.props
    const isRefund = confirm(t('ticket:common.refundWarning'))
    if(!isRefund){
      return
    }
    const {id} = this.props
    const {ticketStore} = this.props.stores
    const data = await ticketStore.cancelTicket(id)

    if (data.graphQLErrors) {
      const { message } = data.graphQLErrors[0]
      toast.error(message)
    }

    alert(t('ticket:common.refundSuccess'))
  }

  render() {
    const {id, amount, paidAt, status, cancelledAt, cancelableDate} = this.props
    const price = amount
    const ticketUrl = `${window.location.origin}/ticket/my-ticket?id=${id}`
    console.log(ticketUrl)
    return (
      <TicketInfoWrapper>
        <PriceText>{price !== 0 ? `₩ ${price.toLocaleString()}` : 'Free'}</PriceText>
        <InfoText>paid at {formatDateInWordsWithWeekdayAndTime(paidAt)}</InfoText>
        {status === TicketStatus.CANCELLED ? <InfoText>cancelled at {formatDateInWordsWithWeekdayAndTime(cancelledAt)}</InfoText> : ''}
        {status === TicketStatus.PAID && <TicketQRCode value={ticketUrl} size={156}/>}
        <TicketButtonWrapper>
          {(isFuture(cancelableDate) && status === TicketStatus.PAID) ? <button onClick={this.onRefund}>Refund</button> : ''}
          {status === TicketStatus.CANCELLED ? <button>Cancelled</button> : ''}
          <button onClick={this.onDetail}>More</button>
        </TicketButtonWrapper>
      </TicketInfoWrapper>
    )
  }
}

export default TicketInfo
