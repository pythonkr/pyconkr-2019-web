import styled from '@emotion/styled'
import i18next from 'i18next'
import { TicketOptionType } from 'lib/stores/Ticket/TicketStep'
import * as React from 'react'
import { mobileWidth } from 'styles/layout'

type PropsType = {
    t: i18next.TFunction;
    title: string;
    id: string;
    ticketOption: TicketOptionType | null;
    isTicketAgreed: boolean;
    onCancel(): void;
    onChangeOption(ticketOption: TicketOptionType): void;
    onChangeAgreed(isAgree: boolean): void;
}

const TicketInformationWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 32px 28px; 20px 28px;

  h1 {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 23px;
  }

  select {
    margin: 5px 0 29px 0;
    width: 80%;
    height: 54px;
    border-radius: 4px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.07);
    border: solid 1px #ced3d6;
    background-color: #f8fafb;
    font-size: 14px;
  }

  button.back {
    margin-top: auto;
    margin-right: auto;
    width: 86px;
    height: 53px;
    border: solid 1px;
    font-size: 18px;
  }

  .terms {
    margin-top: auto;
    font-size: 14px;
    margin-bottom: 20px;
  }

  @media (max-width: ${mobileWidth}) {
    display: block;
    padding: 29px 28px;

    h1 {
      margin-bottom: 35px;
    }

    select {
      width: 100%;
    }

    button.back {
      background-color: #FFF;
      width: 100%;
    }
  }
`

const YoungCoderInfoBox = styled.div`
  display: flex;
  margin-left: 10px;
  font-size: 14px;

  .name {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    margin-right: 20px;
    color: #878d91;

    input {
      height: 40px;
      border-radius: 4px;
      border: solid 1px #ced3d6;
      background-color: #ffffff;
      padding: 17px 21px;
      font-size: 17px;
      width: 150px;
      letter-spacing: 3px;
    }
  }

  .birth {
    display: flex;
    flex-direction: column;
    color: #878d91;

    input {
      height: 40px;
      border-radius: 4px;
      border: solid 1px #ced3d6;
      background-color: #ffffff;
      padding: 17px 21px;
      font-size: 17px;
      width: 165px;
      letter-spacing: 3px;
    }
  }

  label {
    margin-bottom: 10px;
  }

  @media (max-width: ${mobileWidth}) {
    display: block;
    width: 100%;
    margin: 0;
  }
}`

class YoungCoderTicketOption extends React.Component<PropsType> {
    render() {
        const { t, ticketOption, isTicketAgreed, onCancel, onChangeAgreed, onChangeOption } = this.props

        return (
            <TicketInformationWrapper>
                <h1>{t('ticket:youngcoder.option.title')}</h1>
                <YoungCoderInfoBox>
                  <div className='name'>
                    <label className='required'>
                      {t('ticket:youngcoder.option.name')}
                    </label>
                    <input
                      type='text'
                      value={(ticketOption && ticketOption.youngCoderName) || ''}
                      aria-required={true}
                      required
                      placeholder={t('ticket:youngcoder.option.name')}
                      onChange={e => onChangeOption({ youngCoderName: e.target.value })}
                      maxLength={10}
                    />
                  </div>
                  <div className='birth'>
                    <label className='required'>
                      {t('ticket:youngcoder.option.birthDate')}
                    </label>
                    <input
                      type='text'
                      value={(ticketOption && ticketOption.youngCoderBirthDate) || ''}
                      aria-required={true}
                      required
                      placeholder={'YYYYMMDD'}
                      onChange={e => onChangeOption({ youngCoderBirthDate: e.target.value })}
                      maxLength={8}
                    />
                  </div>
                </YoungCoderInfoBox>
                <div className='guide'></div>
                <p className='terms'>
                  <input
                    type='checkbox'
                    id={`payment-option-1`}
                    aria-checked={true}
                    style={{ verticalAlign: 'top' }}
                    checked={isTicketAgreed}
                    onChange={e => onChangeAgreed(e.target.checked)}
                  />
                  <label htmlFor={`payment-option-1`}>{t('ticket:agreeToOptions')}</label>
                </p>
                <button
                  className='back'
                  onClick={onCancel}
                >
                  &lt; {t('ticket:back')}
                </button>
            </TicketInformationWrapper>
        )
    }
}

export default YoungCoderTicketOption
