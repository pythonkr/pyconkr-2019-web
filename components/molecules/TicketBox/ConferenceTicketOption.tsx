import styled from '@emotion/styled'
import { SelectBox } from 'components/atoms/SelectBox'
import * as React from 'react'
import { mobileWidth } from 'styles/layout'

type PropsType = {
    title: string;
    onCancel(): void;
    onChangeOption(value: string): void;
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
    color: #4d5256;
    margin-bottom: 35px;
  }

  button.back {
    margin-top: auto;
    margin-right: auto;
    width: 86px;
    height: 53px;
    border: solid 1px #088487;
    font-size: 18px;
    color: #088487;
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

class ConferenceTicketOption extends React.Component<PropsType> {
    render() {
        const { title, onCancel, onChangeOption } = this.props

        return (
            <TicketInformationWrapper>
                <h1>{title}</h1>
                <p className='guide'>{'티켓 사이즈 선택'}</p>
                <SelectBox
                  options={['XS', 'S', 'M', 'L', 'XL', '2XL']}
                  onChange={onChangeOption}
                />
                <p className='terms'>
                  <input
                    type='checkbox'
                    id='payment-terms'
                    aria-checked={true}
                    style={{ verticalAlign: 'top' }}/>
                    <label htmlFor='payment-terms'>상품과 가격, 유의사항을 확인하였으며 구매에 동의합니다.</label>
                </p>
                <button className='back' onClick={onCancel}>&lt; 뒤로</button>
            </TicketInformationWrapper>
        )
    }
}

export default ConferenceTicketOption
