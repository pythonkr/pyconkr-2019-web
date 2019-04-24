import styled from '@emotion/styled'
import * as React from 'react'
import Iamport from 'react-iamport'

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
`

const Button = styled.button`
  width: 200px;
  height: 40px;
`

class Earlybird extends React.Component {
    render() {
        return (
            <Wrapper>
                <Iamport
                    identificationCode='imp80859147'
                    params={{
                        pg: 'inicis',
                        pay_method: 'card',
                        merchant_uid: `merchant_${new Date().getTime()}`,
                        name: '주문명:결제테스트',
                        amount: 1,
                        buyer_email: 'jslee@pycon.kr',
                        buyer_name: '홍길동이',
                        buyer_tel: '010-1234-5678',
                        buyer_addr: '서울특별시 여러분',
                        buyer_postcode: '123-456',
                        m_redirect_url: 'https://dev.pycon.kr',
                    }}
                    jqueryLoaded={false}
                    onFailed={err => console.log(err)}
                    onSuccess={res => console.log(res)}
                    render={(renderProps) => (
                        <Button
                        type='button'
                        onClick={renderProps.onClick}
                        >
                        충전하기
                        </Button>
                    )}
                />
            </Wrapper>
        )
    }
}

export default Earlybird
