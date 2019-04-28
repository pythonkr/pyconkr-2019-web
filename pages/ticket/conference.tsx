import { AlertBar } from 'components/atoms/AlertBar'
import { ContentTableWrapper, H1, H2, isBold, Paragraph, ScheduleTable, Section, TBody, Td, Tr, Ol, Ul, Li } from 'components/atoms/ContentWrappers'
import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { IntlText } from 'components/atoms/IntlText'
import { Loading } from 'components/atoms/Loading'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import CFPForm from 'components/organisms/CFPForm'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { isPast } from 'date-fns'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { ticketMenu, paths } from 'routes/paths'
import { DateDTO } from 'types/common'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { StoresType } from '../_app'

import styled from '@emotion/styled'
import { mobileWidth } from 'styles/layout'

export type IntlTextType = {
  intlKey: string;
  defaultText: string;
}

export type Schedule = {
  title: string;
  intlKey: string;
  date: DateDTO;
  desc?: IntlTextType;
}

const TicketBox = styled.div`
  border: 3px solid #088487;
  border-radius: 2px;
  display: flex;
  min-height: 300px;
  margin-bottom: 32px;
  
  // Not Open
  // border: 1px solid #999999;

  // SoldOut
  // border: solid 1px #ababab;
  // background-color: #f6f6f6;
  
  .description {
    flex: 2;
    display: flex;
    flex-direction: column;
    padding: 32px 0 20px 28px;

    @media (max-width: ${mobileWidth}) {
      display: block;
    }

    h1 {
      font-size: 26px;
      font-weight: bold;
      color: #088487;
      margin-bottom: 23px;

      // Not Open
      // color: #333;

      // SoldOut
      // color: #ababab;
    }

    p:nth-of-type(1) {
      font-size: 15px;
      line-height: 1.67;
      color: #088487;

      // Not Open
      // color: #333;

      // SoldOut
      // color: #ababab;
    }

    p:nth-of-type(2) {
      margin-top: auto;
      font-size: 15px;
      font-weight: bold;
      line-height: 1.47;
      color: #f95858;

      // SoldOut
      // color: #ababab;
    }
    
    // STEP1-STEP2
    // display: none;
  }

  .information {
    flex: 2;
    display: flex;
    flex-direction: column;
    padding: 32px 0 20px 28px;

    // STEP1-STEP2
    display: none;

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
  }

  .payment {
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

      // SoldOut
      // color: #ababab;
    
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

      // Not Open
      // opacity: 0.4;

      // SoldOut
      // background-color: #9e9e9e;
      // color: #FFF;

      // STEP1-STEP2
      // background: #f95858;
    }
  }

  @media (max-width: ${mobileWidth}) {
    display: block;

    .description {
      display: block;
      padding: 29px 28px;

      h1 {
        margin-bottom: 35px;
      }

      p:nth-of-type(1) {
        margin-bottom: 43px;
      }

      // STEP1-STEP2
      // display: none;
    }

    .information {
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

      // STEP1-STEP2
      // display: none;
    }

    .payment {
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

        // STEP1-STEP2
        // background: #f95858;
      }
    }
  }
`

@inject('stores')
@observer
export default class ProposingATalk extends React.Component<{ stores: StoresType }> {
  state = {
    isFormInitialized: false
  }

  render() {
    const { authStore, scheduleStore } = this.props.stores
    const { presentationProposalStartAt,  presentationProposalFinishAt } = scheduleStore.schedule
    const { presentationReviewStartAt, presentationReviewFinishAt, presentationAnnounceAt } = scheduleStore.schedule

    // const schedule: Schedule[] = [{
    //   title: '발표안 제안 오픈',
    //   intlKey: 'ticket.talkProposal.schedule.open',
    //   date: presentationProposalStartAt,
    // }, {
    //   title: '발표안 제안 마감',
    //   intlKey: 'ticket.talkProposal.schedule.close',
    //   date: presentationProposalFinishAt,
    // }, {
    //   title: '발표안 제안서 리뷰 시작',
    //   intlKey: 'ticket.talkProposal.schedule.reviewStart',
    //   date: presentationReviewStartAt,
    // }, {
    //   title: '발표안 제안서 리뷰 완료',
    //   intlKey: 'ticket.talkProposal.schedule.reviewFinish',
    //   date: presentationReviewFinishAt,
    // }, {
    //   title: '최종 발표자 확정',
    //   intlKey: 'ticket.talkProposal.schedule.announcement',
    //   date: presentationAnnounceAt,
    // }]

    return (
      <PageTemplate
        header={<Header title='컨퍼런스 티켓 :: 파이콘 한국 2019' intlKey='ticket.conference.pageTitle'/>}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1><IntlText intlKey='ticket.conference.title'>
          컨퍼런스 티켓
        </IntlText></H1>
        <StatusBar
        />
        <Paragraph><IntlText intlKey='ticket.conference.description'>
          파이콘 한국의 메인 행사인 8월 18-19일(토-일) 이틀 간의 컨퍼런스에 입장할 수 있는 티켓입니다.
        </IntlText></Paragraph>
        <Section>
          {<AlertBar text={<IntlText intlKey='common.alert'>발표 세션, 후원사 부스, 라이트닝 토크, 열린 세션을 포함합니다.</IntlText>}/>}
          {<AlertBar text={<IntlText intlKey='common.alert'>튜토리얼, 스프린트, 영코더, 아이 돌봄은 포함하지 않습니다.</IntlText>}/>}
        </Section>

        <Section>
          <TicketBox>
            <div className='description'>
              <h1>얼리버드 티켓</h1>
              <p>프로그램 상세 내용이 정해지기도 전에 파이콘에 대한 애정만으로<br />티켓을 구매하시는 분들을 위한 할인 티켓입니다.<br/>한정된 수량을 판매합니다.</p>
              <p>얼리버드 등록은 환불되지 않습니다.</p>
            </div>
            <div class='payment'>
              <p>₩ 50,000</p>
              <button>구매하기</button>
            </div>
          </TicketBox>
          <TicketBox>
            <div className='description'>
              <h1>일반 티켓</h1>
              <p>파이콘 한국 2019 일반 티켓은 한정된 수량만 판매됩니다. 조기 매진이 될 가능성이 있으니 서둘러 구매해주세요!</p>
              <p>취소, 환불 기한: 2019년 8월 17일 금 오후 6시까지</p>
            </div>
            <div class='payment'>
              <p>₩ 70,000</p>
              <button>구매하기</button>
            </div>
          </TicketBox>
          <TicketBox>
            <div className='description'>
              <h1>개인 후원 티켓</h1>
              <p>파이콘 후원 티켓 판매 대금은 재정 지원 예산으로 사용됩니다.<br/>후원 금액은 15만원 이상 자율적으로 지정할수 있습니다.<br/>후원 금액에 상관없이 1장의 파이콘 한국 2019 티켓을 제공합니다.</p>
              <p>후원 티켓은 양도나 취소, 환불할 수 없습니다.</p>
            </div>
            <div className='information'>
              <h1>개인 후원 티켓</h1>
              <p className='guide'>티셔츠 사이즈 *</p>
              <select>
                <option>XXL</option>
              </select>
              <p className='terms'>
                <input type='checkbox' id='payment-terms' style={{ verticalAlign: 'top' }}/> <label for='payment-terms'>상품과 가격, 유의사항을 확인하였으며 구매에 동의합니다.</label>
              </p>
              <button className='back'>&lt; 뒤로</button>
            </div>
            <div class='payment'>
              <p>₩ <input type='tel' placeholder='150000' min='150000' /></p>
              <button>결제하기</button>
            </div>
          </TicketBox>
        </Section>

        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
