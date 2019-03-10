import styled from '@emotion/styled'
import { ContentTableWrapper } from 'components/atoms/ContentWrapper'
import { NoticeBar } from 'components/atoms/NoticeBar'
import { H1, H2, Paragraph } from 'components/atoms/withIntl'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { ALERT_BLUE_DARK, ALERT_YELLOW, ALERT_YELLOW_DARK, ALERT_YELLOW_SEMI_DARK, TEAL_DARK } from 'styles/colors'
import { StoresType } from '../_app'

const SponsorTable = styled(ContentTableWrapper)`
  padding:40px 0;
  thead th {
    border-top: solid 2px ${TEAL_DARK};
    border-bottom: solid 1px ${TEAL_DARK};
    padding: 18px 0 18px 10px;;
  }
  tbody {
    border-top: none;
  }
  th {
    text-align: left;
    padding-left: 10px;
    font-weight: 700;
    &:first-of-type {
      background-color: #fcfcfc;
    }
  }
  td {
    padding-left: 10px;
  }
  tbody tr th {
    font-size: 14px;
  }
`

// const sponsorshipBenefitKeys = [
//   'name',
//   'sponsorshipFee',
//   'limit',
//   'complimentaryTickets',
//   'boothSize',
//   'ostRoomCapacity',
//   'sponsorSession',
//   'canProvideGift',
//   'logoPlacement',
// ]

// type LogoPlacement = 'banner' | 'standingBanner' | 'poster' | 'website' | 'atendeePass'

// type SponsorshipBenefits = {
//   name: string;
//   sponsorShipFee: number;
//   limit: number;
//   complimentaryTickets: number;
//   booth: number;
//   ostRoom: number;
//   sponsorSession: number;
//   canProvideGift: boolean;
//   logoPlacement: LogoPlacement[];
// }

// type sponsorshipPackageMap = {
//   [index: string]: SponsorshipBenefits;
// }

// const sponsorTable: sponsorshipPackageMap = {
//   keystone: {
//     name: '키스톤',
//     sponsorShipFee: 20000000,
//     limit: 1,
//     complimentaryTickets: 20,
//     booth: 5,
//     ostRoom: 100,
//     sponsorSession: 2,
//     canProvideGift: true,
//     logoPlacement: [
//       'banner',
//       'standingBanner',
//       'poster',
//       'website',
//       'atendeePass',
//     ],
//   },
//   diamond: {
//     name: ' 다이아몬드',
//     sponsorShipFee: 20000000,
//     limit: 1,
//     complimentaryTickets: 20,
//     booth: 5,
//     ostRoom: 100,
//     sponsorSession: 2,
//     canProvideGift: true,
//     logoPlacement: []
//   },
//   sapire: {
//     name: '사파이어',
//     sponsorShipFee: 20000000,
//     limit: 1,
//     complimentaryTickets: 20,
//     booth: 5,
//     ostRoom: 100,
//     sponsorSession: 2,
//     canProvideGift: true,
//     logoPlacement: [
//       'banner',
//       'standingBanner',
//       'poster',
//       'website',
//       'atendeePass',
//     ],
//   },
//   platinum: {
//     name: '플래티넘',
//     sponsorShipFee: 20000000,
//     limit: 1,
//     complimentaryTickets: 20,
//     booth: 5,
//     ostRoom: 100,
//     sponsorSession: 2,
//     canProvideGift: true,
//     logoPlacement: [
//       'banner',
//       'standingBanner',
//       'poster',
//       'website',
//       'atendeePass',
//     ],
//   },
//   gold: {
//     name: '골드',
//     sponsorShipFee: 20000000,
//     limit: 1,
//     complimentaryTickets: 20,
//     booth: 5,
//     ostRoom: 100,
//     sponsorSession: 2,
//     canProvideGift: true,
//     logoPlacement: [
//       'banner',
//       'standingBanner',
//       'poster',
//       'website',
//       'atendeePass',
//     ],
//   },
//   silver: {
//     name: '실버',
//     sponsorShipFee: 20000000,
//     limit: 1,
//     complimentaryTickets: 20,
//     booth: 5,
//     ostRoom: 100,
//     sponsorSession: 2,
//     canProvideGift: true,
//     logoPlacement: [
//       'banner',
//       'standingBanner',
//       'poster',
//       'website',
//       'atendeePass',
//     ],
//   },
//   community: {
//     name: '커뮤니티',
//     sponsorShipFee: 20000000,
//     limit: 1,
//     complimentaryTickets: 20,
//     booth: 5,
//     ostRoom: 100,
//     sponsorSession: 2,
//     canProvideGift: true,
//     logoPlacement: [
//       'banner',
//       'standingBanner',
//       'poster',
//       'website',
//       'atendeePass',
//     ],
//   },
// }

@inject('stores')
@observer
export default class Prospectus extends React.Component<{ stores: StoresType }> {
  render() {
    return (
      <PageTemplate
        header={<Header title='후원사 안내 :: 파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <H1 intlKey='contribute.overview.title'>
          후원사 안내
        </H1>
        {/* Status Bar */}
        <Paragraph intlKey='asdfasdfasdf'>
          파이콘은 커뮤니티 주관으로 이뤄지는 비영리 개발자 대상 행사로,
          여타 기업 및 기관에서 개최하는 개발자 행사와는 성격이 다릅니다.
          발표자와 튜토리얼 진행자를 포함하여, 자원봉사자와 준비위원회 담당자 등 모든 인원이 금전적 이득 없이
          순수히 오픈소스 프로그래밍 언어인 파이썬의 저변 확대와 커뮤니티 활성화를 위해 진행하는 행사입니다.
        </Paragraph>
        <Paragraph intlKey='asdfasdfasdf'>
          따라서, 본 행사에 후원하심은 후원사 또는 개인의 오픈소스 커뮤니티 및 파이썬 사용자에 대한 방향과 태도를
          가장 솔직하게 보여주시는 것이라 할 수 있겠습니다.
          또한, 다양한 매체로의 홍보, 후원사 튜토리얼, 후원사 세션과 부스 구성 등을 지원해드리며,
          이를 우수한 개발자 모집의 장으로 활용하실 수 있습니다.
        </Paragraph>
        <section>
          <H2 intlKey='a'>문의</H2>
          <Paragraph intlKey='asdfasdfasdf'>
            <a href='mailto: sponsor@pycon.kr'>sponsor@pycon.kr</a><br />
            이메일로 문의 주시면 상세한 후원사 안내 문서를 보내드립니다.
          </Paragraph>
        </section>
        <section>
          <H2 intlKey='a'>후원사 패키지</H2>
          <Paragraph intlKey='asdfasdfasdf'>
            개최지와 여건에 따라 등급별 지원 내용은 다소 달라질 수 있습니다. <br />
            또한, 후원사에 의해 제공되는 튜토리얼이나 세션, 증정품은 준비위원회와 사전 협의가 필요합니다. <br />
            자세한 문의는 <a href='mailto: sponsor@pycon.kr'>sponsor@pycon.kr</a> 으로 주시기 바랍니다.
          </Paragraph>
          <NoticeBar
            color={ALERT_YELLOW}
            borderColor={ALERT_YELLOW_SEMI_DARK}
            textColor={ALERT_YELLOW_DARK}
            textLinkColor={ALERT_BLUE_DARK}
            text='스폰서 부스는 8월 18-19일(토-일) 이틀 동안 진행하는 컨퍼런스에서만 운영됩니다.'
          />
          <SponsorTable>
            <table>
              <thead>
                <th>등급</th>
                <th>키스톤</th>
                <th>다이아몬드</th>
                <th>사파이어</th>
                <th>플래티넘</th>
              </thead>
              <tbody>
                <tr>
                  <th>후원금</th>
                  <td>20,000,000원</td>
                  <td>15,000,000원</td>
                  <td>10,000,000원</td>
                  <td>8,000,000원</td>
                </tr>
                <tr>
                  <th>구좌</th>
                  <td>1</td>
                  <td>2</td>
                  <td>2</td>
                  <td>6</td>
                </tr>
                <tr>
                  <th>티켓 지원</th>
                  <td>20매</td>
                  <td>15매</td>
                  <td>10매</td>
                  <td>2매</td>
                </tr>
                <tr>
                  <th>부스</th>
                  <td>5칸</td>
                  <td>3칸</td>
                  <td>-</td>
                  <td>2칸</td>
                </tr>
                <tr>
                  <th>후원사 명의 OST 방</th>
                  <td>100명 공간</td>
                  <td>24명 공간</td>
                  <td>-</td>
                  <td>12명 공간</td>
                </tr>
                <tr>
                  <th>후원사 세션</th>
                  <td>2세션</td>
                  <td>1세션</td>
                  <td>1세션</td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>증정품 지급</th>
                  <td>가능</td>
                  <td>가능</td>
                  <td>가능</td>
                  <td>가능</td>
                </tr>
                <tr>
                  <th>로고 노출 위치</th>
                  <td className='small align-top'>
                    현수막<br/>
                    스탠딩 배너<br/>
                    포스터<br/>
                    웹사이트<br/>
                    참가자 네임택 줄
                  </td>
                  <td className='small align-top'>
                    현수막<br/>
                    스탠딩 배너<br/>
                    포스터<br/>
                    웹사이트
                  </td>
                  <td className='small align-top'>
                    현수막<br/>
                    스탠딩 배너<br/>
                    포스터<br/>
                    웹사이트
                  </td>
                  <td className='small align-top'>
                    현수막<br/>
                    스탠딩 배너<br/>
                    포스터<br/>
                    웹사이트
                  </td>
                </tr>
              </tbody>
            </table>
          </SponsorTable>
          <SponsorTable>
            <table>
              <thead>
                <th>등급</th>
                <th>골드</th>
                <th>실버</th>
                <th>커뮤니티</th>
                <th></th>
              </thead>
              <tbody>
                <tr>
                  <th>후원금</th>
                  <td>5,000,000원</td>
                  <td>2,000,000원</td>
                  <td>300,000원 이상</td>
                  <td></td>
                </tr>
                <tr>
                  <th>구좌</th>
                  <td>10</td>
                  <td>4</td>
                  <td>제한 없음</td>
                  <td></td>
                </tr>
                <tr>
                  <th>티켓 지원</th>
                  <td>5매</td>
                  <td>4매</td>
                  <td>-</td>
                  <td></td>
                </tr>
                <tr>
                  <th>부스</th>
                  <td>1칸</td>
                  <td>-</td>
                  <td>2층 로비 테이블</td>
                  <td></td>
                </tr>
                <tr className='small align-top'>
                  <th>로고 노출 위치</th>
                  <td className='small align-top'>
                    스탠딩 배너<br/>
                    포스터<br/>
                    웹사이트<br/>
                  </td>
                  <td className='small align-top'>
                    웹사이트
                  </td>
                  <td className='small align-top'>
                    웹사이트
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </SponsorTable>
          <ul>
            <li>후원금은 VAT 별도 금액입니다.</li>
            <li>후원사 부스 1 칸의 크기는 3m x 2m x 2.5m 기준입니다.</li>
            <li>증정품 지급은 컨퍼런스 입장 시 참가자 전원에게 제공되는 에코백에 후원사의 증정품을 포함하는 것을 말합니다.</li>
            <li>세부 사항은 행사 전까지 다소 변경될 수 있습니다.</li>
            <li>커뮤니티 스폰서십은 비영리 단체에 한합니다.</li>
            <li>출판사 후원의 경우, 파이썬 관련 도서 출판 기록이 필요합니다.</li>
            <li>미디어 후원의 경우, 언론 보도 및 홍보 이력이 필요합니다.</li>
          </ul>
        </section>
      </PageTemplate>
    )
  }
}
