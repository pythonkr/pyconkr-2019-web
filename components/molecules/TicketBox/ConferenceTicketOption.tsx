import styled from '@emotion/styled'
import { SelectBox } from 'components/atoms/SelectBox'
import i18next from 'i18next'
import * as React from 'react'
import { mobileWidth } from 'styles/layout'

type PropsType = {
    t: i18next.TFunction;
    title: string;
    id: string;
    tshirtsize?: string;
    isTicketAgreed: boolean;
    onCancel(): void;
    onChangeOption(ticketOption: { tshirtsize: any }): void;
    onChangeAgreed(isAgree: boolean): void;
}

const TicketInformationWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 32px 0 20px 28px;

  h1 {
    font-size: 26px;
    font-weight: bold;
    color: #088487;
    margin-bottom: 23px;
  }

  p.guide {
    font-size: 14px;
    color: #878d91;
  }

  p.warning {
    font-size: 12px;
    color: #ec5967;
    margin: 8px 0;
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

  input[type=text] {
    width: 80%;
    height: 54px;
    border-radius: 4px;
    border: solid 1px #ced3d6;
    margin: 5px 0 29px 0;
    background-color: #ffffff;
    padding: 17px 21px;
    font-size: 17px;
  }

  p.terms {
    font-size: 14px;
    line-height: 1.29;
    // color: #4d5256;
    margin-bottom: 35px;
  }

  button.back {
    margin-top: auto;
    margin-right: auto;
    width: 86px;
    height: 53px;
    border: solid 1px;
    font-size: 18px;
    // color: #088487;
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
const tshirtOptions = [
  {
    value: '',
    text: 'Select T-shirt size'
  },
  {
    value: 'S(90)',
    text: 'S(90)'
  },
  {
    value: 'M(95)',
    text: 'M(95)'
  },
  {
    value: 'L(100)',
    text: 'L(100)'
  },
  {
    value: 'XL(105)',
    text: 'XL(105)'
  },
  {
    value: '2XL(110)',
    text: '2XL(110)'
  },
  {
    value: '3XL(115)',
    text: '3XL(115)'
  },
]
class ConferenceTicketOption extends React.Component<PropsType> {
    render() {
        const { title, id, onCancel, tshirtsize, isTicketAgreed, onChangeOption, onChangeAgreed } = this.props
        const { t } = this.props

        return (
            <TicketInformationWrapper>
                <h1>{title}</h1>
                <p className='guide'>{t('ticket:conference.option.tshirtSize')}</p>
                <p className='warning'>{t('ticket:conference.option.tshirtWarning')}</p>
                <SelectBox
                  selectedValue={tshirtsize}
                  options={tshirtOptions}
                  onChange={value => onChangeOption({ tshirtsize: value })}
                />
                <p className='terms'>
                  <input
                    type='checkbox'
                    id={`payment-option-${id}`}
                    aria-checked={true}
                    style={{ verticalAlign: 'top' }}
                    checked={isTicketAgreed}
                    onChange={e => onChangeAgreed(e.target.checked)}
                  />
                  <label htmlFor={`payment-option-${id}`}>{t('ticket:agreeToOptions')}</label>
                </p>
                <button className='back' onClick={onCancel}>&lt; {t('ticket:back')}</button>
            </TicketInformationWrapper>
        )
    }
}

export default ConferenceTicketOption
