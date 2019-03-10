import styled from '@emotion/styled'
import { ContentTableWrapper, isSmall, Table, TBody, Td, Th, THead, Tr, verticalAlignTop } from 'components/atoms/ContentWrappers'
import React from 'react'
import { TEAL_DARK } from 'styles/colors'

const SponsorTableWrapper = styled(ContentTableWrapper)`
margin: 40px 0;
${THead} ${Th} {
  border-top: solid 2px ${TEAL_DARK};
  border-bottom: solid 1px ${TEAL_DARK};
  padding: 18px 0 18px 10px;;
}
${TBody} {
  border-top: none;
}
${Th} {
  font-size: 14px;
  text-align: left;
  padding-left: 10px;
  font-weight: 700;
  &:first-of-type {
    background-color: #fcfcfc;
  }
}
${Td} {
  padding-left: 10px;
}
`

export const SponsorPackageTables = () => <>
  <SponsorTableWrapper>
    <Table>
      <THead>
        <Th>등급</Th>
        <Th>키스톤</Th>
        <Th>다이아몬드</Th>
        <Th>사파이어</Th>
        <Th>플래티넘</Th>
      </THead>
      <TBody>
        <Tr>
          <Th>후원금</Th>
          <Td>20,000,000원</Td>
          <Td>15,000,000원</Td>
          <Td>10,000,000원</Td>
          <Td>8,000,000원</Td>
        </Tr>
        <Tr>
          <Th>구좌</Th>
          <Td>1</Td>
          <Td>2</Td>
          <Td>2</Td>
          <Td>6</Td>
        </Tr>
        <Tr>
          <Th>티켓 지원</Th>
          <Td>20매</Td>
          <Td>15매</Td>
          <Td>10매</Td>
          <Td>2매</Td>
        </Tr>
        <Tr>
          <Th>부스</Th>
          <Td>5칸</Td>
          <Td>3칸</Td>
          <Td>-</Td>
          <Td>2칸</Td>
        </Tr>
        <Tr>
          <Th>후원사 명의 OST 방</Th>
          <Td>100명 공간</Td>
          <Td>24명 공간</Td>
          <Td>-</Td>
          <Td>12명 공간</Td>
        </Tr>
        <Tr>
          <Th>후원사 세션</Th>
          <Td>2세션</Td>
          <Td>1세션</Td>
          <Td>1세션</Td>
          <Td>-</Td>
        </Tr>
        <Tr>
          <Th>증정품 지급</Th>
          <Td>가능</Td>
          <Td>가능</Td>
          <Td>가능</Td>
          <Td>가능</Td>
        </Tr>
        <Tr>
          <Th>로고 노출 위치</Th>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
            현수막<br/>
            스탠딩 배너<br/>
            포스터<br/>
            웹사이트<br/>
            참가자 네임택 줄
          </Td>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
            현수막<br/>
            스탠딩 배너<br/>
            포스터<br/>
            웹사이트
          </Td>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
            현수막<br/>
            스탠딩 배너<br/>
            포스터<br/>
            웹사이트
          </Td>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
            현수막<br/>
            스탠딩 배너<br/>
            포스터<br/>
            웹사이트
          </Td>
        </Tr>
      </TBody>
    </Table>
  </SponsorTableWrapper>
  <SponsorTableWrapper>
    <Table>
      <THead>
        <Th>등급</Th>
        <Th>골드</Th>
        <Th>실버</Th>
        <Th>커뮤니티</Th>
        <Th></Th>
      </THead>
      <TBody>
        <Tr>
          <Th>후원금</Th>
          <Td>5,000,000원</Td>
          <Td>2,000,000원</Td>
          <Td>300,000원 이상</Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Th>구좌</Th>
          <Td>10</Td>
          <Td>4</Td>
          <Td>제한 없음</Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Th>티켓 지원</Th>
          <Td>5매</Td>
          <Td>4매</Td>
          <Td>-</Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Th>부스</Th>
          <Td>1칸</Td>
          <Td>-</Td>
          <Td>2층 로비 테이블</Td>
          <Td></Td>
        </Tr>
        <Tr className={`${isSmall} ${verticalAlignTop}`}>
          <Th>로고 노출 위치</Th>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
            스탠딩 배너<br/>
            포스터<br/>
            웹사이트<br/>
          </Td>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
            웹사이트
          </Td>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
            웹사이트
          </Td>
          <Td></Td>
        </Tr>
      </TBody>
    </Table>
  </SponsorTableWrapper>
</>
