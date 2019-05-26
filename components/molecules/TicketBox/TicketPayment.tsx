import styled from '@emotion/styled'
import { isStringNumber } from 'lib/util/common'
import _ from 'lodash'
import * as React from 'react'
import { toast } from 'react-toastify'
import { mobileWidth } from 'styles/layout'

type PropsType = {
    price: number;
    isEditablePrice: boolean;
    buttonTitle: string;
    disabled: boolean;
    minimunPrice: number;
    isPaid: boolean;
    onPayTicket(): void;
    setPrice(price: number): void;
}

const TicketPaymentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 29px 24px 20px 0;
    border-left: 1px dashed #85c0c1;

    p {
    text-align: right;
    font-size: 26px;
    font-weight: bold;
    color: #088487;

    input[type=tel] {
        width: 157px;
        height: 54px;
        border-radius: 4px;
        border: solid 1px #ced3d6;
        background-color: #ffffff;
        padding-right: 12px;
        font-size: 21px;
        text-align: right;
    }
    }

    button {
        width: 187px;
        height: 54px;
        background-color: #088487;
        color: #FFF;
        font-size: 18px;
        margin-top: auto;
        margin-left: auto;
        outline: none;
    }

    .disabledButton {
        opacity: 0.4
    }

    @media (max-width: ${mobileWidth}) {
        display: block;
        padding: 45px 0 36px 0;
        border-left: none;
        border-top: 1px dashed #85c0c1;
        text-align: center;

        p {
            text-align: center;
        }

        button {
            width: 85%;
            margin: 25px 0 0 0;
        }
    }
`

class TicketPayment extends React.Component<PropsType> {
    state = {
        adjustedPrice: 150000
    }

    onChangeAdjustedPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const price = _.replace(e.target.value, /,/g, '')

        if (!isStringNumber(price) && !_.isEmpty(price)) return

        const adjustedPrice = !_.isEmpty(price) ? parseInt(price, 10) : ''
        this.setState({ adjustedPrice })
    }

    onPay = () => {
        const { onPayTicket, setPrice, isEditablePrice, price, minimunPrice } = this.props
        const { adjustedPrice } = this.state
        if (isEditablePrice && minimunPrice > adjustedPrice) {
            toast.error(`후원 티켓 가격은 최소 ${minimunPrice.toLocaleString()} 이어야 합니다.`)
            return
        }

        setPrice(!isEditablePrice ? price : adjustedPrice)
        onPayTicket()
    }

    render() {
        const { price, isEditablePrice, buttonTitle, disabled, isPaid } = this.props
        const { adjustedPrice } = this.state

        return (
            <TicketPaymentWrapper>
                {!isEditablePrice
                    ?  <p>{`₩ ${price.toLocaleString()}`}</p>
                    :  <p>{'₩ '}
                        <input
                            type='tel'
                            placeholder={price.toLocaleString()}
                            min={price}
                            value={adjustedPrice.toLocaleString()}
                            onChange={this.onChangeAdjustedPrice}
                            disabled={disabled}
                        />
                       </p>
                }
                {!disabled && isPaid
                    ? <button onClick={this.onPay}>{buttonTitle}</button>
                    : <button className='disabledButton' disabled={disabled}>{buttonTitle}</button>
                }
            </TicketPaymentWrapper>
        )
    }
}

export default TicketPayment
