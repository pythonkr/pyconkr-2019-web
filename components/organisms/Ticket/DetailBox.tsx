import {observer} from 'mobx-react'
import * as React from 'react'
import {TicketNode} from 'lib/stores/Ticket/TicketNode'
import {
  ContentTableWrapper,
  TBody, Table,
  Td,
  Th,
  Tr
} from '../../atoms/ContentWrappers'
import { paths } from 'routes/paths'

type PropsType = {
  ticket: TicketNode;
}

@observer
class DetailBox extends React.Component<PropsType> {
  render() {
    const {ticket} = this.props
    const {id, status, amount, paidAt, options, product} = ticket
    const {type, nameKo, nameEn, descKo, descEn, cancelableDate} = product
    const parsedOptions = JSON.parse(options)

    return (
      <ContentTableWrapper>
        <Table>
          <TBody>
            <Tr>
              <Th>티켓 상태</Th>
              <Td>{status}</Td>
            </Tr>
            <Tr>
              <Th>티켓 종류</Th>
              <Td>{type} - {nameKo}({nameEn})</Td>
            </Tr>
            <Tr>
              <Th>티켓 설명</Th>
              <Td>{descKo}<br/>{descEn}</Td>
            </Tr>
            <Tr>
              <Th>가격</Th>
              <Td>{amount}</Td>
            </Tr>
            <Tr>
              <Th>구매일</Th>
              <Td>{paidAt}</Td>
            </Tr>
            <Tr>
              <Th>취소기한</Th> {/* cancelat 이 있으면 취소일*/}
              <Td>{cancelableDate ? cancelableDate : '취소 불가(Unrefundable)'}</Td>
            </Tr>
            <Tr>
              <Th>등록영수증</Th>
              <Td><a href={`${paths.ticket.receipt}?id=${id}`} target='_blank'>link</a></Td>
            </Tr>
            {Object.keys(parsedOptions).map(key => {
              return (
                <Tr>
                  <Th>{key}</Th>
                  <Td>{parsedOptions[key]}</Td>
                </Tr>
              )
            })}
          </TBody>
        </Table>
      </ContentTableWrapper>
    )
  }
}

export default DetailBox
