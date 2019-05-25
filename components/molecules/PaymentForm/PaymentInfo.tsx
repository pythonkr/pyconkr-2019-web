import { ContentTableWrapper, H2, Table, TBody, Td, Tr } from 'components/atoms/ContentWrappers'
import * as React from 'react'

type PropsType = {
  title: string;
  ticketTypeTitle: string;
  paymentType: string;
  priceTitle: string;
  price: string;
  currency: string;
}

class PaymentInfo extends React.Component<PropsType> {
  render() {
    const { title, ticketTypeTitle, paymentType, priceTitle, price, currency } = this.props

    return (
      <>
        <H2>
          {title}
        </H2>
        <ContentTableWrapper>
          <Table>
            <colgroup>
              <col width='30%'/>
              <col width='70%'/>
            </colgroup>
            <TBody>
              <Tr>
                <Td>{ticketTypeTitle}</Td>
                <Td className='bold'>{paymentType}</Td>
              </Tr>
              <Tr>
                <Td>{priceTitle}</Td>
                <Td className='bold'>{`${price} ${currency}`}</Td>
              </Tr>
            </TBody>
          </Table>
        </ContentTableWrapper>
      </>
    )
  }
}

export default PaymentInfo
