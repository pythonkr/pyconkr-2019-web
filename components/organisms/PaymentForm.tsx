import { FormWrapper, Section } from 'components/atoms/ContentWrappers'
import CreditCardInfo from 'components/molecules/PaymentForm/CreditCardInfo'
import PaymentInfo from 'components/molecules/PaymentForm/PaymentInfo'
import i18next from 'i18next'
import _ from 'lodash'
import { observer } from 'mobx-react'
import { RouterProps } from 'next/router'
import { StoresType } from 'pages/_app'
import * as React from 'react'
import { toast } from 'react-toastify'
import { paths } from 'routes/paths'

type PropTypes = {
  stores: StoresType;
  t: i18next.TFunction;
  router: RouterProps;
}

@observer
class PaymentForm extends React.Component<PropTypes> {
  onClickCancel = () => {
    const { router } = this.props
    router.replace(paths.ticket.overview)
  }

  onSubmitPayment = async (event: React.FormEvent<HTMLInputElement | HTMLFormElement>) => {
    event.preventDefault()
    const { stores } = this.props
    stores.ticketStore.setExpiry()
    const data = await stores.ticketStore.payTicket()

    if (data.graphQLErrors) {
      const { message } = data.graphQLErrors[0]
      toast.error(message)

      return
    }

    if (!_.isEmpty(data)) window.location.href = paths.ticket.myTickets
  }

  onChangeDomesticCard = (isDomestic: boolean) => {
    const { stores } = this.props
    if (!isDomestic) stores.ticketStore.setPwd2Digit('')
    stores.ticketStore.setIsDomesticCard(isDomestic)
  }

  render() {
    const { stores, t } = this.props
    const {
      payingTicketTitle, expiryMonth, expiryYear,
      setCardNumber, setExpiryMonth, setExpiryYear, setBirth, setPwd2Digit,
    } = stores.ticketStore
    const { isDomesticCard, cardNumber, birth, pwd2digit } = stores.ticketStore.ticketInput

    return (
      <>
        <Section>
          <FormWrapper>
            <PaymentInfo
              title={t('ticket:payment.paymentInfo.title')}
              ticketTypeTitle={t('ticket:payment.paymentInfo.ticketTypeTitle')}
              priceTitle={t('ticket:payment.paymentInfo.priceTitle')}
              currency={t('ticket:payment.paymentInfo.currency')}
              paymentType={payingTicketTitle || ''}
              price={stores.ticketStore.price.toLocaleString()}
            />
          </FormWrapper>
        </Section>
        <Section>
          <FormWrapper>
            <CreditCardInfo
              t={t}
              isDomesticCard={isDomesticCard}
              cardNumber={cardNumber}
              expiryMonth={expiryMonth}
              expiryYear={expiryYear}
              birth={birth || ''}
              pwd2digit={pwd2digit || ''}
              setIsDomesticCard={this.onChangeDomesticCard}
              setCardNumber={setCardNumber}
              setExpiryMonth={setExpiryMonth}
              setExpiryYear={setExpiryYear}
              setBirth={setBirth}
              setPwd2Digit={setPwd2Digit}
              onSubmitPayment={this.onSubmitPayment}
              onClickCancel={this.onClickCancel}
              isSubmitPayment={stores.ticketStore.isSubmitPayment}
            />
          </FormWrapper>
        </Section>
      </>
    )
  }
}

export default PaymentForm
