import * as moment from 'moment'
import * as React from 'react'

import styled from '@emotion/styled'
import TicketPayment from 'components/molecules/TicketBox/TicketPayment'
import { isFuture, isPast } from 'date-fns'
import i18next from 'i18next'
import { TICKET_STEP } from 'lib/stores/Ticket/TicketStep'
import _ from 'lodash'
import { observer } from 'mobx-react'
import { TICKET_COLOR_TYPE} from 'styles/colors'
import { mobileWidth } from 'styles/layout'

type PropsType = {
  t: i18next.TFunction;
  ticketColor: TICKET_COLOR_TYPE;
  price: number;
  isEditablePrice: boolean;
  options?: React.ReactElement | null;
  startDate: string;
  endDate: string;
  isPaid?: boolean | null;
  isSoldOut: boolean | null;
  nextStep: TICKET_STEP;
  ticketButtonTitle: string;
  stepAction: (() => boolean) | (() => Promise<boolean>) | null;
  onNextStep?(step: TICKET_STEP): void;
  setPrice(price: number): void;
}

type StatesType = {
  isTicketStep: boolean | null;
}

export const TicketBoxWrapper = styled.div<{ ticketColor: TICKET_COLOR_TYPE }>`
  border: 3px solid #088487;
  border-radius: 2px;
  display: flex;
  min-height: 300px;
  margin-bottom: 32px;
  border-color: ${props => props.ticketColor};
  color: ${props => props.ticketColor};
  @media (max-width: ${mobileWidth}) {
    display: block;
  }

  h1,
  p,
  div  {
    color: ${props => props.ticketColor};
  }

  button:not(.back) {
    background-color: ${props => props.ticketColor};
  }
  button.back {
    color: ${props => props.ticketColor};
    border-color: ${props => props.ticketColor};
  }
`

@observer
class TicketBox extends React.Component<PropsType, StatesType> {
  getTicketButtonTitle = () => {
    const { ticketButtonTitle, startDate, endDate, isPaid, isSoldOut, t } = this.props
    const isBeforeOpening = startDate && isFuture(startDate)
    const isFinished = endDate && isPast(endDate)

    if (isBeforeOpening) return t('ticket:fromStartDate', { startDate: moment(startDate).format('MM-DD HH:mm') })
    if (isFinished) return t('ticket:closed')
    if (isSoldOut) return t('ticket:soldout')
    if (isPaid) return isPaid ? t('ticket:purchased') : t('ticket:purchaseNotAvailable')

    return ticketButtonTitle
  }

  onTicketStepForPayment = async () => {
    const { nextStep, onNextStep, stepAction } = this.props

    let stepActionResult = true
    if (stepAction) stepActionResult = await stepAction()
    if (stepActionResult && onNextStep) onNextStep(nextStep)
  }

  render() {
      const {
        price, isEditablePrice, ticketColor,
        setPrice, startDate, endDate, isPaid, isSoldOut, t, options
      } = this.props

      const isBeforeOpening = startDate && isFuture(startDate)
      const isFinished = endDate && isPast(endDate)
      const disablePayment = isBeforeOpening || isFinished
      const buttonTitle = this.getTicketButtonTitle()

      return (
        <TicketBoxWrapper
          ticketColor={ticketColor}>
          {options}
          <TicketPayment
            t={t}
            price={price}
            buttonTitle={buttonTitle || ''}
            isEditablePrice={isEditablePrice}
            onPayTicket={this.onTicketStepForPayment}
            setPrice={setPrice}
            disabled={(disablePayment !== '' && disablePayment) || isPaid || (!_.isNull(isSoldOut) && isSoldOut)}
            minimumPrice={150000}
          />
        </TicketBoxWrapper>
      )
  }
}

export default TicketBox
