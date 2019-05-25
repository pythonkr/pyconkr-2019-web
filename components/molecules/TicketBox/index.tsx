import * as moment from 'moment'
import * as React from 'react'

import styled from '@emotion/styled'
import TicketDescription from 'components/molecules/TicketBox/TicketDescription'
import TicketPayment from 'components/molecules/TicketBox/TicketPayment'
import { isFuture, isPast } from 'date-fns'
import { VALIDATION_ERROR_TYPE } from 'lib/stores/Ticket/TicketStore'
import { observer } from 'mobx-react'
import { RouterProps } from 'next/router'
import { toast } from 'react-toastify'
import { paths } from 'routes/paths'
import { mobileWidth } from 'styles/layout'

type PropsType = {
  title: string;
  description: string;
  warning: string;
  price: number;
  isEditablePrice: boolean;
  options: React.ReactElement | null;
  step: number;
  startDate: string;
  endDate: string;
  router: RouterProps;
  onNextStep(): void;
  onValidate(): VALIDATION_ERROR_TYPE | null;
  setTicket(): void;
  setPrice(price: number): void;
}

type StatesType = {
  isTicketStep: boolean | null;
  ticketStep: number;
}

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
class TicketBox extends React.Component<PropsType, StatesType> {
  state = {
    isTicketStep: false,
    ticketStep: 1,
  }

  componentDidMount () {
    const { options } = this.props
    this.setState({ isTicketStep: !!options })
  }

  onBuyTicket = () => {
    const { onNextStep } = this.props
    if (onNextStep) onNextStep()
  }

  onPayTicket = () => {
    const { onValidate, setTicket, router } = this.props
    const error = onValidate()
    // #TODO: 번역 필요
    if (error === VALIDATION_ERROR_TYPE.NO_OPTION_SELECTED) {
      toast.error('상품 옵션을 선택하지 않으셨습니다.')

      return
    }

    if (error === VALIDATION_ERROR_TYPE.NOT_AGREED) {
      toast.error('상품 구매에 동의하지 않으셨습니다.')

      return
    }

    if (error === VALIDATION_ERROR_TYPE.NONE) {
      setTicket()
      router.replace(paths.ticket.payment)
    }
  }

  renderTicketButtonTitle = () => {
    const { step, startDate, endDate } = this.props
    const { isTicketStep } = this.state
    const isBuying = isTicketStep && step === 1
    const isBeforeOpening = startDate && isFuture(startDate)
    const isFinished = endDate && isPast(endDate)
    // #TODO: 번역 필요
    if (isBeforeOpening) return `${moment(startDate).format('MM-DD hh:mm')} 부터`
    if (isFinished) return `마감`

    if (isBuying) return '구매하기'
    else return '결제하기'
  }

  render() {
      const { title, description, warning, price, isEditablePrice, options, step, setPrice, startDate, endDate } = this.props
      const { isTicketStep } = this.state
      const isBeforeOpening = startDate && isFuture(startDate)
      const isFinished = endDate && isPast(endDate)
      const disablePayment = isBeforeOpening || isFinished
      const buttonTitle = this.renderTicketButtonTitle()

      return (
        <TicketBoxWrapper>
          {step === 1
            ? <TicketDescription
                title={title}
                description={description}
                warning={warning}
              />
            : options
          }
          <TicketPayment
            price={price}
            buttonTitle={buttonTitle}
            isEditablePrice={isEditablePrice}
            onPayTicket={isTicketStep && step === 1 ? this.onBuyTicket :  this.onPayTicket}
            setPrice={setPrice}
            disabled={disablePayment !== '' && disablePayment}
            minimunPrice={150000}
          />
        </TicketBoxWrapper>
      )
  }
}

export default TicketBox
