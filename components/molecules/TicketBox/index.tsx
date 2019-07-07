import * as moment from 'moment'
import * as React from 'react'

import styled from '@emotion/styled'
import TicketDescription from 'components/molecules/TicketBox/TicketDescription'
import TicketPayment from 'components/molecules/TicketBox/TicketPayment'
import { isFuture, isPast } from 'date-fns'
import i18next from 'i18next'
import { VALIDATION_ERROR_TYPE } from 'lib/stores/Ticket/TicketStore'
import _ from 'lodash'
import { observer } from 'mobx-react'
import { RouterProps } from 'next/router'
import { toast } from 'react-toastify'
import { paths } from 'routes/paths'
import { mobileWidth } from 'styles/layout'

// step, isPaid, isTermsAgreed, onNextStep, onValidate
type PropsType = {
  t: i18next.TFunction;
  title: string;
  description: string;
  warning: string;
  price: number;
  isEditablePrice: boolean;
  options?: React.ReactElement | null;
  step: number;
  startDate: string;
  endDate: string;
  router: RouterProps;
  isPaid?: boolean | null;
  isTermsAgreed?: boolean | null;
  isSoldOut: boolean | null;
  onNextStep?(step: number): void;
  onValidate?(): VALIDATION_ERROR_TYPE | null;
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
    if (onNextStep) onNextStep(2)
  }

  onAgreeTerms = () => {
    const { onNextStep, isTermsAgreed, t } = this.props
    if (!isTermsAgreed) {
      toast.error(t('ticket:error.notAgreeToTerms'))

      return
    }
    if (onNextStep) onNextStep(3)
  }

  onPayTicket = () => {
    const { onValidate, setTicket, router, t } = this.props

    if (onValidate) {
      const error = onValidate()

      if (error === VALIDATION_ERROR_TYPE.NO_OPTION_SELECTED) {
        toast.error(t('ticket:error.noOptionSelected'))

        return
      }

      if (error === VALIDATION_ERROR_TYPE.NOT_AGREED_TO_OPTIONS) {
        toast.error(t('ticket:error.notAgreeToOptions'))

        return
      }
    }
    setTicket()
    router.push(paths.ticket.payment)

    return
  }

  renderTicketButtonTitle = () => {
    const { step, startDate, endDate, isPaid, isSoldOut, t } = this.props
    const { isTicketStep } = this.state
    const isBeforeOpening = startDate && isFuture(startDate)
    const isFinished = endDate && isPast(endDate)

    if (isBeforeOpening) return t('ticket:fromStartDate', { startDate: moment(startDate).format('MM-DD HH:mm') })
    if (isFinished) return t('ticket:closed')

    if (isSoldOut) return t('ticket:soldout')

    if (isPaid) {
      return isPaid ? t('ticket:purchased') : t('ticket:purchaseNotAvailable')
    }

    if (isTicketStep) {
      if (step === 1) return t('ticket:buying')
      if (step === 2) return t('ticket:agree')
      if (step === 3) return t('ticket:paying')
    }

    return t('ticket:paying')
  }

  renderTicketDescription = () => {
    const { title, description, step, warning, options } = this.props

    if (step === 1) {
      return (
        <TicketDescription
          title={title}
          description={description}
          warning={warning}
        />
      )
    }

    return options
  }

  onTicketStepForPayment = () => {
    const { step } = this.props
    const { isTicketStep } = this.state
    if (!isTicketStep) return  this.onPayTicket()
    if (isTicketStep) {
      if (step === 1) return this.onBuyTicket()
      if (step === 2) return this.onAgreeTerms()
      if (step === 3) return this.onPayTicket()
    }
  }

  render() {
      const {
        price, isEditablePrice,
        setPrice, startDate, endDate, isPaid, isSoldOut, t
      } = this.props

      const isBeforeOpening = startDate && isFuture(startDate)
      const isFinished = endDate && isPast(endDate)
      const disablePayment = isBeforeOpening || isFinished
      const buttonTitle = this.renderTicketButtonTitle()

      return (
        <TicketBoxWrapper>
          {this.renderTicketDescription()}
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
