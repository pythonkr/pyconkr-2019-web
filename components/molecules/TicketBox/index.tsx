import * as React from 'react'

import styled from '@emotion/styled'
import TicketDescription from 'components/molecules/TicketBox/TicketDescription'
import TicketPayment from 'components/molecules/TicketBox/TicketPayment'
import { observer } from 'mobx-react'
import Router from 'next/router'
import { paths } from 'routes/paths'

type PropsType = {
  title: string;
  description: string;
  warning: string;
  price: number;
  isEditablePrice: boolean;
  options: React.ReactElement | null;
  step: number;
  onNextStep(): void;
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
    Router.replace(paths.ticket.pay)
  }

  render() {
      const { title, description, warning, price, isEditablePrice, options, step } = this.props
      const { isTicketStep } = this.state
      const buttonTitle = isTicketStep && step === 1 ? '구매하기' : '결제하기'

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
          />
        </TicketBoxWrapper>
      )
  }
}

export default TicketBox
