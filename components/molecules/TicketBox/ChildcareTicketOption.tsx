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

const TicketOptionWrapper = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  margin-left: 10px;

  .guide {
    margin-bottom: 10px;
  }

  .warning {
    color: red;
    font-size: 12px;
  }

  .terms {
    margin-top: auto;
  }

  textarea {
    height: 150px;
    width: 100%;
    margin-bottom: 5px;
    padding: 15px;
    resize: none;
  }
`

const RadioButtonGroup = styled.div`
  display: flex;
  margin-bottom: 10px;

  .radioButton {
    margin-right: 20px;
  }
`

const TicketOptionDivider = styled.div<{ marginTop: number; marginBottom: number }>`
  border: 0.5px dashed;
  margin-top: ${props => props.marginTop}px;
  margin-bottom: ${props => props.marginBottom}px;
  width: 100%;
`

const ChildInfoBox = styled.div`
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

class ChildcareTicketOption extends React.Component<PropsType> {

    componentDidMount () {
      const { onChangeOption } = this.props
      onChangeOption({ isRequireParkingDiscount: false })
    }

    render() {
        const { t, ticketOption, isTicketAgreed, onCancel, onChangeAgreed, onChangeOption } = this.props

        return (
            <TicketInformationWrapper>
                <h1>{t('ticket:childcare.option.title')}</h1>
                <ChildInfoBox>
                  <div className='name'>
                    <label className='required'>
                      {t('ticket:childcare.option.name')}
                    </label>
                    <input
                      type='text'
                      value={(ticketOption && ticketOption.childName) || ''}
                      aria-required={true}
                      required
                      placeholder={t('ticket:childcare.option.name')}
                      onChange={e => onChangeOption({ childName: e.target.value })}
                      maxLength={10}
                    />
                  </div>
                  <div className='birth'>
                    <label className='required'>
                      {t('ticket:childcare.option.birthDate')}
                    </label>
                    <input
                      type='text'
                      value={(ticketOption && ticketOption.childcareBirthDate) || ''}
                      aria-required={true}
                      required
                      placeholder={'YYYYMMDD'}
                      onChange={e => onChangeOption({ childcareBirthDate: e.target.value })}
                      maxLength={8}
                    />
                  </div>
                </ChildInfoBox>
                <TicketOptionDivider marginTop={20} marginBottom={20} />
                <TicketOptionWrapper>
                  <div className='guide'>{t('ticket:childcare.option.requireParkingDiscount')}</div>
                  <RadioButtonGroup>
                    <div className='radioButton'>
                      <input
                        type='radio'
                        id='radio_parking_1'
                        aria-checked={(ticketOption && ticketOption.isRequireParkingDiscount) || undefined}
                        checked={(ticketOption && ticketOption.isRequireParkingDiscount) || undefined}
                        onChange={() => onChangeOption({ isRequireParkingDiscount: true })}
                      >
                      </input>
                      <label>
                        {t('ticket:childcare.option.yes')}
                      </label>
                    </div>
                    <div className='radioButton'>
                      <input
                        type='radio'
                        id='radio_parking_2'
                        aria-checked={(ticketOption && !ticketOption.isRequireParkingDiscount) || undefined}
                        checked={(ticketOption && !ticketOption.isRequireParkingDiscount) || undefined}
                        onChange={() => onChangeOption({ isRequireParkingDiscount: false })}
                      >
                      </input>
                      <label>
                        {t('ticket:childcare.option.no')}
                      </label>
                    </div>
                  </RadioButtonGroup>
                </TicketOptionWrapper>
                <TicketOptionWrapper>
                  <div className='guide'>{t('ticket:childcare.option.keepInMind')}</div>
                  <textarea
                    value={(ticketOption && ticketOption.note) || ''}
                    onChange={e => onChangeOption({ note: e.target.value })}
                    placeholder={t('ticket:childcare.option.keepInMindPlaceHolder')}
                  />
                </TicketOptionWrapper>
                <TicketOptionDivider marginTop={0} marginBottom={20} />
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

export default ChildcareTicketOption
