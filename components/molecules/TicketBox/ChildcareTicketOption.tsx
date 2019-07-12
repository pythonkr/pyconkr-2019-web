import styled from '@emotion/styled'
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
  padding: 32px 28px; 20px 28px;

  h1 {
    font-size: 26px;
    font-weight: bold;
    color: #088487;
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

const AddChildInfoButton = styled.button`
  width: 75px;
  border: solid 1px;
  font-size: 14px;
  padding: 10px;
  margin-bottom: 20px;
  margin-left: auto;
  color: #fff;
`

class ChildcareTicketOption extends React.Component<PropsType> {
    state = {
      isSibling: false,
      isTicketAgreed: false,
      inputVal: '',
    }

    setIsSibling = (isSibling: boolean) => this.setState({ isSibling })

    onChangeAgreed = (isChecked: boolean) => this.setState({ isChecked: !isChecked })

    onChangeInputValue = (inputVal: string) => this.setState({ inputVal })

    render() {
        const { t } = this.props
        const { isSibling, isTicketAgreed, inputVal } = this.state

        return (
            <TicketInformationWrapper>
                <h1>{'아이돌봄 티켓 옵션'}</h1>
                <AddChildInfoButton>
                  {'+ 추가'}
                </AddChildInfoButton>
                <ChildInfoBox>
                  <div className='name'>
                    <label className='required'>
                      {'이름'}
                    </label>
                    <input
                      type='text'
                      value={inputVal}
                      aria-required={true}
                      required
                      placeholder={'이름'}
                      onChange={e => this.onChangeInputValue(e.target.value)}
                      maxLength={8}
                    />
                  </div>
                  <div className='birth'>
                    <label className='required'>
                      {'생년월일'}
                    </label>
                    <input
                      type='text'
                      value={inputVal}
                      aria-required={true}
                      required
                      placeholder={'YYYYMMDD'}
                      onChange={e => this.onChangeInputValue(e.target.value)}
                      maxLength={8}
                    />
                  </div>
                </ChildInfoBox>
                <TicketOptionDivider marginTop={20} marginBottom={20} />
                <TicketOptionWrapper>
                  <div className='guide'>형제 및 자매 여부</div>
                  <RadioButtonGroup>
                    <div className='radioButton'>
                      <input
                        type='radio'
                        id='radio_sibling_1'
                        aria-checked={isSibling}
                        checked={isSibling}
                        onChange={() => this.setIsSibling(true)}
                      >
                      </input>
                      <label>
                        {'예'}
                      </label>
                    </div>
                    <div className='radioButton'>
                      <input
                        type='radio'
                        id='radio_sibling_1'
                        aria-checked={!isSibling}
                        checked={!isSibling}
                        onChange={() => this.setIsSibling(false)}
                      >
                      </input>
                      <label>
                        {'아니오'}
                      </label>
                    </div>
                  </RadioButtonGroup>
                  {/* <p className='warning'>{t('ticket:conference.option.tshirtWarning')}</p> */}
                </TicketOptionWrapper>
                <TicketOptionWrapper>
                  <div className='guide'>주차종일권 할인(50%) 필요여부</div>
                  <RadioButtonGroup>
                    <div className='radioButton'>
                      <input
                        type='radio'
                        id='radio_sibling_1'
                        aria-checked={isSibling}
                        checked={isSibling}
                        onChange={() => this.setIsSibling(true)}
                      >
                      </input>
                      <label>
                        {'예'}
                      </label>
                    </div>
                    <div className='radioButton'>
                      <input
                        type='radio'
                        id='radio_sibling_1'
                        aria-checked={!isSibling}
                        checked={!isSibling}
                        onChange={() => this.setIsSibling(false)}
                      >
                      </input>
                      <label>
                        {'아니오'}
                      </label>
                    </div>
                  </RadioButtonGroup>
                  {/* <p className='warning'>{t('ticket:conference.option.tshirtWarning')}</p> */}
                </TicketOptionWrapper>
                <TicketOptionDivider marginTop={0} marginBottom={20} />
                <p className='terms'>
                  <input
                    type='checkbox'
                    id={`payment-option-1`}
                    aria-checked={true}
                    style={{ verticalAlign: 'top' }}
                    checked={isTicketAgreed}
                    onChange={e => this.onChangeAgreed(e.target.checked)}
                  />
                  <label htmlFor={`payment-option-1`}>{t('ticket:agreeToOptions')}</label>
                </p>
                <button className='back'>&lt; {t('ticket:back')}</button>
            </TicketInformationWrapper>
        )
    }
}

export default ChildcareTicketOption
