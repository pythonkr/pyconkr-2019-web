import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { H2 } from 'components/atoms/ContentWrappers'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import i18next from 'i18next'
import { CREDITCARD_TYPE } from 'lib/stores/Ticket/TicketStore'
import { creditCardFormatter, isStringNumber, removeWhiteSpaces } from 'lib/util/common'
import _ from 'lodash'
import * as React from 'react'
import { TEAL } from 'styles/colors'
import { mobileWidth } from 'styles/layout'

const FormHalfBox = styled.div`
display: inline-block;
margin-right: 5%;
width: 45%;
@media (max-width: ${mobileWidth}) {
  display: block;
  width: 100%;
  margin: 0;
}
}`

const CreditCardRadioButtons = styled.div`
display: flex;
margin-bottom: 40px;

.radioButton {
  margin-right: 20px;
}
`

const CreditCardNumberWrapper = styled.div`
input[type=text] {
  width: 325px;
  font-size: 20px;
  letter-spacing: 3px;
}
@media (max-width: ${mobileWidth}) {
  input[type=text] {
    width: 100%;
    font-size: 18px;
  }
}
`

type PropsType = {
  t: i18next.TFunction;
  isDomesticCard: boolean;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  birth: string;
  pwd2digit: string;
  isSubmitPayment: boolean;
  setIsDomesticCard(isDomestic: boolean): void;
  setCardNumber(cardNumber: string): void;
  setExpiryMonth(month: string): void;
  setExpiryYear(year: string): void;
  setBirth(birth: string): void;
  setPwd2Digit(pwd2digit: string): void;
  onSubmitPayment(event: React.FormEvent<HTMLInputElement | HTMLFormElement>): void;
  onClickCancel(): void;
}

class CreditCardInfo extends React.Component<PropsType> {

  onChangeInputValue = (value: string, valueHandler: (value: string) => void) => {
    const noWhitespacedValue = removeWhiteSpaces(value)
    if (!isStringNumber(noWhitespacedValue) && !_.isEmpty(noWhitespacedValue)) return
    valueHandler(noWhitespacedValue)
  }

  render() {
    const {
      t, isDomesticCard, cardNumber, expiryMonth, expiryYear, birth, pwd2digit,
      setIsDomesticCard, setCardNumber, setExpiryMonth, setExpiryYear, setBirth, setPwd2Digit, isSubmitPayment,
      onSubmitPayment, onClickCancel
    } = this.props

    return (
      <form onSubmit={onSubmitPayment}>
        <H2>{t('ticket:payment.creditCardInfo.title')}</H2>
        <hr className='margin-20' />
        <label className='required'>
          {t('ticket:payment.creditCardInfo.creditCardTypeLabel')}
        </label>
        <CreditCardRadioButtons>
          <div className='radioButton'>
            <input
              type='radio'
              id={CREDITCARD_TYPE.DOMESTIC}
              value={CREDITCARD_TYPE.DOMESTIC}
              aria-checked={isDomesticCard}
              checked={isDomesticCard}
              onChange={() => setIsDomesticCard(true)}
            >
            </input>
            <label htmlFor={CREDITCARD_TYPE.DOMESTIC}>
              {t('ticket:payment.creditCardInfo.domesticLabel')}
            </label>
          </div>
          <div className='radioButton'>
            <input
              type='radio'
              id={CREDITCARD_TYPE.FOREIGN}
              value={CREDITCARD_TYPE.FOREIGN}
              aria-checked={!isDomesticCard}
              checked={!isDomesticCard}
              onChange={() => setIsDomesticCard(false)}
            >
            </input>
            <label htmlFor={CREDITCARD_TYPE.FOREIGN}>
              {t('ticket:payment.creditCardInfo.foreignLabel')}
            </label>
          </div>
        </CreditCardRadioButtons>
        <CreditCardNumberWrapper>
          <label className='required'>
            {t('ticket:payment.creditCardInfo.cardNumberTitle')}
          </label>
          <input
            type='text'
            value={creditCardFormatter(cardNumber)}
            aria-required={true}
            required
            placeholder={t('ticket:payment.creditCardInfo.cardNumberPlaceholder')}
            onChange={e => this.onChangeInputValue(e.target.value, setCardNumber)}
          />
        </CreditCardNumberWrapper>
        <FormHalfBox>
          <label className='required'>
            {t('ticket:payment.creditCardInfo.expiryLabel')}
          </label>
          <input
            type='text'
            value={expiryMonth}
            style={{
              width: '80px',
              textAlign: 'center',
              fontSize: '20px',
              letterSpacing: '3px',
              marginRight: '10px'
            }}
            aria-required={true}
            required
            placeholder={'MM'}
            maxLength={2}
            onChange={e => this.onChangeInputValue(e.target.value, setExpiryMonth)}
          />
          <input
            type='text'
            value={expiryYear}
            style={{
              width: '80px',
              textAlign: 'center',
              fontSize: '20px',
              letterSpacing: '3px',
              marginRight: '10px'
            }}
            aria-required={true}
            required
            placeholder={'YY'}
            maxLength={2}
            onChange={e => this.onChangeInputValue(e.target.value, setExpiryYear)}
          />
        </FormHalfBox>
        <FormHalfBox>
          <label className='required'>
            {t('ticket:payment.creditCardInfo.birthLabel')}
          </label>
          <input
            type='text'
            value={birth || ''}
            aria-required={true}
            required
            placeholder={'YYMMDD'}
            onChange={e => this.onChangeInputValue(e.target.value, setBirth)}
            style={{
              width: '255px',
              fontSize: '20px',
              letterSpacing: '3px'
            }}
            maxLength={10}
            disabled={!isDomesticCard}
          />
        </FormHalfBox>
        <FormHalfBox>
          <label className='required'>
            {t('ticket:payment.creditCardInfo.pwd2digitLabel')}
          </label>
          <div>
            <input
              type='password'
              value={pwd2digit !== null && isDomesticCard
                ? pwd2digit
                : ''
              }
              aria-required={true}
              required
              placeholder={'**'}
              style={{
                width: '80px',
                textAlign: 'center',
                fontSize: '20px',
                letterSpacing: '3px',
                marginRight: '10px'
              }}
              maxLength={2}
              onChange={e => setPwd2Digit(e.target.value)}
              disabled={!isDomesticCard}
            />
            <span
              style={{
                color: '#088487',
                fontSize: '30px',
                verticalAlign: 'middle'
              }}
            >
            {'**'}
            </span>
          </div>
        </FormHalfBox>
        <FlexSpaceBetweenWrapper>
          <Button
            title={t('common:cancel')}
            tag='button'
            type='button'
            intlKey='contribute.talkProposal.application.stages.stages2.button1'
            color={TEAL}
            width={80}
            primary={false}
            margin='0 10px 0 auto'
            onClick={onClickCancel}
          >
            {t('common:cancel')}
          </Button>
          <Button
            title={t('ticket:pay')}
            tag='button'
            type='sumbit'
            intlKey='contribute.talkProposal.application.stages.stages2.button1'
            color={TEAL}
            width={80}
            onSubmit={onSubmitPayment}
            disabled={isSubmitPayment}
          >
            {t('ticket:pay')}
          </Button>
        </FlexSpaceBetweenWrapper>
      </form>
    )
  }
}

export default CreditCardInfo
