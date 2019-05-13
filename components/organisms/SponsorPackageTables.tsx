import intl from 'react-intl-universal'
import styled from '@emotion/styled'
import { ContentTableWrapper, isSmall, Table, TBody, Td, Th, THead, Tr, verticalAlignTop } from 'components/atoms/ContentWrappers'
import React from 'react'
import { TEAL } from 'styles/colors'

const SponsorTableWrapper = styled(ContentTableWrapper)`
margin: 40px 0;
${THead} ${Th} {
  border-top: solid 2px ${TEAL};
  border-bottom: solid 1px ${TEAL};
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
        <Th>{ intl.get('sponsor.prospectus.packages.level.header').d('등급') }</Th>
        <Th>{ intl.get('sponsor.prospectus.packages.level.keystone').d('키스톤') }</Th>
        <Th>{ intl.get('sponsor.prospectus.packages.level.diamond').d('다이아몬드') }</Th>
        <Th>{ intl.get('sponsor.prospectus.packages.level.sapphire').d('사파이어') }</Th>
        <Th>{ intl.get('sponsor.prospectus.packages.level.platinum').d('플래티넘') }</Th>
      </THead>
      <TBody>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.fee.header').d('후원금') }</Th>
          <Td>{ intl.get('common.unit.krw', { number: '20,000,000' }).d('20,000,000 원') }</Td>
          <Td>{ intl.get('common.unit.krw', { number: '15,000,000' }).d('15,000,000 원') }</Td>
          <Td>{ intl.get('common.unit.krw', { number: '10,000,000' }).d('10,000,000 원') }</Td>
          <Td>{ intl.get('common.unit.krw', { number: '8,000,000' }).d('8,000,000 원') }</Td>
        </Tr>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.availability.header').d('스폰서 수') }</Th>
          <Td>1</Td>
          <Td>2</Td>
          <Td>2</Td>
          <Td>6</Td>
        </Tr>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.conferencePasses.header').d('티켓 지원') }</Th>
          <Td>{ intl.get('common.unit.ea', { number: '20' }).d('20매') }</Td>
          <Td>{ intl.get('common.unit.ea', { number: '15' }).d('15매') }</Td>
          <Td>{ intl.get('common.unit.ea', { number: '10' }).d('10매') }</Td>
          <Td>{ intl.get('common.unit.ea', { number: '8' }).d('8매') }</Td>
        </Tr>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.booth.header').d('부스') }</Th>
          <Td>{ intl.get('common.unit.ea', { number: '5' }).d('5칸') }</Td>
          <Td>{ intl.get('common.unit.ea', { number: '3' }).d('3칸') }</Td>
          <Td>-</Td>
          <Td>{ intl.get('common.unit.ea', { number: '2' }).d('2칸') }</Td>
        </Tr>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.openlunch.header').d('열린점심') }</Th>
          <Td>20명 / 2일 (210호)</Td>
          <Td>30명 / 1일 (209A호)</Td>
          <Td>20명 / 1일 (209B호)</Td>
          <Td>20명 / 1일 (201-203호)</Td>
        </Tr>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.session.header').d('후원사 세션') }</Th>
          <Td>{ intl.get('common.unit.ea', { number: '2' }).d('2세션') }</Td>
          <Td>{ intl.get('common.unit.ea', { number: '1' }).d('1세션') }</Td>
          <Td>{ intl.get('common.unit.ea', { number: '1' }).d('1세션') }</Td>
          <Td>-</Td>
        </Tr>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.goods.header').d('증정품 지급') }</Th>
          <Td>✅</Td>
          <Td>✅</Td>
          <Td>✅</Td>
          <Td>✅</Td>
        </Tr>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.recruitment.header').d('채용 공고') }</Th>
          <Td>✅</Td>
          <Td>✅</Td>
          <Td>✅</Td>
          <Td>✅</Td>
        </Tr>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.logo.header').d('로고 노출 위치') }</Th>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
            { intl.get('sponsor.prospectus.packages.logo.attendeePass').d('참가자 네임택 줄') }<br/>
            { intl.get('sponsor.prospectus.packages.logo.hangingBanner').d('현수막') }<br/>
            { intl.get('sponsor.prospectus.packages.logo.standingBanner').d('스탠딩 배너') }<br/>
            { intl.get('sponsor.prospectus.packages.logo.website').d('웹사이트') }
          </Td>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
            { intl.get('sponsor.prospectus.packages.logo.hangingBanner').d('현수막') }<br/>
            { intl.get('sponsor.prospectus.packages.logo.standingBanner').d('스탠딩 배너') }<br/>
            { intl.get('sponsor.prospectus.packages.logo.website').d('웹사이트') }
          </Td>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
          { intl.get('sponsor.prospectus.packages.logo.hangingBanner').d('현수막') }<br/>
            { intl.get('sponsor.prospectus.packages.logo.standingBanner').d('스탠딩 배너') }<br/>
            { intl.get('sponsor.prospectus.packages.logo.website').d('웹사이트') }
          </Td>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
          { intl.get('sponsor.prospectus.packages.logo.hangingBanner').d('현수막') }<br/>
            { intl.get('sponsor.prospectus.packages.logo.standingBanner').d('스탠딩 배너') }<br/>
            { intl.get('sponsor.prospectus.packages.logo.website').d('웹사이트') }
          </Td>
        </Tr>
      </TBody>
    </Table>
  </SponsorTableWrapper>
  <SponsorTableWrapper>
    <Table>
      <THead>
        <Th>{ intl.get('sponsor.prospectus.packages.level.header').d('등급') }</Th>
        <Th>{ intl.get('sponsor.prospectus.packages.level.gold').d('골드') }</Th>
        <Th>{ intl.get('sponsor.prospectus.packages.level.silver').d('실버') }</Th>
        <Th>{ intl.get('sponsor.prospectus.packages.level.community').d('커뮤니티') }</Th>
        <Th></Th>
      </THead>
      <TBody>
        <Tr>
        <Th>{ intl.get('sponsor.prospectus.packages.fee.header').d('후원금') }</Th>
          <Td>{ intl.get('common.unit.krw', { number: '5,000,000' }).d('5,000,000 원') }</Td>
          <Td>{ intl.get('common.unit.krw', { number: '2,000,000' }).d('2,000,000 원') }</Td>
          <Td>{ intl.get('common.unit.minimumKrw', { number: '300,000' }).d('300,000원 이상') }</Td>
          <Td></Td>
        </Tr>
        <Tr>
        <Th>{ intl.get('sponsor.prospectus.packages.availability.header').d('스폰서 수') }</Th>
          <Td>10</Td>
          <Td>{ intl.get('sponsor.prospectus.packages.availability.unlimited').d('제한 없음') }</Td>
          <Td>{ intl.get('sponsor.prospectus.packages.availability.unlimited').d('제한 없음') }</Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.conferencePasses.header').d('티켓 지원') }</Th>
          <Td>{ intl.get('common.unit.ea', { number: '5' }).d('5매') }</Td>
          <Td>{ intl.get('common.unit.ea', { number: '4' }).d('4매') }</Td>
          <Td>-</Td>
          <Td></Td>
        </Tr>
        <Tr>
        <Th>{ intl.get('sponsor.prospectus.packages.booth.header').d('부스') }</Th>
          <Td>{ intl.get('common.unit.ea', { number: '1' }).d('1칸') }</Td>
          <Td>-</Td>
          <Td>{ intl.get('sponsor.prospectus.packages.booth.table').d('2층 로비 테이블') }</Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.openlunch.header').d('열린점심') }</Th>
          <Td>10명 / 1일 (201-203호)</Td>
          <Td>-</Td>
          <Td>-</Td>
        </Tr>
        <Tr>
          <Th>{ intl.get('sponsor.prospectus.packages.recruitment.header').d('채용 공고') }</Th>
          <Td>✅</Td>
          <Td>✅</Td>
          <Td>✅</Td>
        </Tr>
        <Tr className={`${isSmall} ${verticalAlignTop}`}>
          <Th>{ intl.get('sponsor.prospectus.packages.logo.header').d('로고 노출 위치') }</Th>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
            { intl.get('sponsor.prospectus.packages.logo.standingBanner').d('스탠딩 배너') }<br/>
            { intl.get('sponsor.prospectus.packages.logo.website').d('웹사이트') }
          </Td>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
          { intl.get('sponsor.prospectus.packages.logo.website').d('웹사이트') }
          </Td>
          <Td className={`${isSmall} ${verticalAlignTop}`}>
          { intl.get('sponsor.prospectus.packages.logo.website').d('웹사이트') }
          </Td>
          <Td></Td>
        </Tr>
      </TBody>
    </Table>
  </SponsorTableWrapper>
</>
