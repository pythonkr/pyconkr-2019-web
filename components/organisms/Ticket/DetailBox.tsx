import { MyTicketNode } from 'lib/apollo_graphql/queries/getMyTicket'
import * as _ from 'lodash'
import { observer } from 'mobx-react'
import Link from 'next/link'
import * as React from 'react'
import { paths } from 'routes/paths'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import {
  ContentTableWrapper,
  Table, TBody,
  Td,
  Th,
  Tr
} from '../../atoms/ContentWrappers'

type PropsType = {
  ticket: MyTicketNode;
}

@observer
class DetailBox extends React.Component<PropsType> {
  render() {
    const { ticket } = this.props
    const {id, status, amount, paidAt, options, product, receiptUrl, cancelReceiptUrl} = ticket
    const {type, name, desc, cancelableDate, startAt, finishAt} = product
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
              <Td>{type} - {name}</Td>
            </Tr>
            <Tr>
              <Th>티켓 설명</Th>
              <Td>{desc}</Td>
            </Tr>
            <Tr>
              <Th>행사 기간</Th>
              <Td>{formatDateInWordsWithWeekdayAndTime(startAt)}-{formatDateInWordsWithWeekdayAndTime(finishAt)}</Td>
            </Tr>
            <Tr>
              <Th>가격</Th>
              <Td>{`₩ ${amount.toLocaleString()}`}</Td>
            </Tr>
            <Tr>
              <Th>구매일</Th>
              <Td>{formatDateInWordsWithWeekdayAndTime(paidAt)}</Td>
            </Tr>
            <Tr>
              <Th>취소 기한</Th> {/* cancelat 이 있으면 취소일*/}
              <Td>{cancelableDate ?
                formatDateInWordsWithWeekdayAndTime(cancelableDate) :
                '취소 불가(Unrefundable)'}
              </Td>
            </Tr>
            <Tr>
              <Th>등록 확인증</Th>
              <Td>
                <Link href={`${paths.ticket.receipt}?id=${id}`}>
                  <a target='_blank' rel='noreferrer'>
                    Link
                  </a>
                </Link>
              </Td>
            </Tr>
            <Tr>
              <Th>결제 영수증</Th>
              <Td>
                {receiptUrl && (
                  <Link href={receiptUrl}>
                    <a target='_blank' rel='noreferrer'>
                      Link
                    </a>
                  </Link>
                )}
              </Td>
            </Tr>
            {
              cancelReceiptUrl &&
              <Tr>
                <Th>결제 취소 영수증</Th>
                <Td>
                {cancelReceiptUrl && (
                  <Link href={cancelReceiptUrl}>
                    <a target='_blank' rel='noreferrer'>
                      Link
                    </a>
                  </Link>
                )}
              </Td>
              </Tr>
            }
            {
              parsedOptions['tshirtsize'] &&
              <Tr>
                <Th>티셔츠 사이즈</Th>
                <Td>{parsedOptions['tshirtsize']}</Td>
              </Tr>
            }
            {
              parsedOptions['youngCoderName'] &&
              <Tr>
                <Th>영코더 이름</Th>
                <Td>{parsedOptions['tshirtsize']}</Td>
              </Tr>
            }
            {
              parsedOptions['youngCoderBirthDate'] &&
              <Tr>
                <Th>영코더 생년월일</Th>
                <Td>{parsedOptions['youngCoderBirthDate']}</Td>
              </Tr>
            }
            {
              parsedOptions['childName'] &&
              <Tr>
                <Th>아이돌봄 아동이름</Th>
                <Td>{parsedOptions['childName']}</Td>
              </Tr>
            }
            {
              parsedOptions['childcareBirthDate'] &&
              <Tr>
                <Th>아이돌봄 생년월일</Th>
                <Td>{parsedOptions['childcareBirthDate']}</Td>
              </Tr>
            }
            {
              parsedOptions['isRequireParkingDiscount'] &&
              <Tr>
                <Th>주차증 필요 여부</Th>
                <Td>{parsedOptions['isRequireParkingDiscount']}</Td>
              </Tr>
            }
            {
              parsedOptions['note'] &&
              <Tr>
                <Th>아이돌봄 참고사항</Th>
                <Td>{parsedOptions['note']}</Td>
              </Tr>
            }
          </TBody>
        </Table>
      </ContentTableWrapper>
    )
  }
}

export default DetailBox
