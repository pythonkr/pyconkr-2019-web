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
          <div>
            <h1><IntlText intlKey='asdf'>얼리버드 티켓</IntlText></h1>
            <p><IntlText intlKey='asdf'>프로그램 상세 내용이 정해지기도 전에 파이콘에 대한 애정만으로 남들보다 일찍 티켓을 구매하시는 분들을 위한 할인 티켓입니다. 한정된 수량을 판매하며 일반 티켓 가격에서 할인된 가격으로 판매합니다. 매년 파이콘 얼리버드 티켓은 순식간에 매진되므로 티켓 판매가 시작되는 4월 30일 오후 2시를 놓치지 마세요!</IntlText></p>
            <p><IntlText intlKey='asdf'>얼리버드 등록은 환불되지 않습니다.</IntlText></p>
          </div>
          <div>
            <h1><IntlText intlKey='asdf'>얼리버드 티켓</IntlText></h1>
            <p><IntlText intlKey='asdf'>프로그램 상세 내용이 정해지기도 전에 파이콘에 대한 애정만으로 남들보다 일찍 티켓을 구매하시는 분들을 위한 할인 티켓입니다. 한정된 수량을 판매하며 일반 티켓 가격에서 할인된 가격으로 판매합니다. 매년 파이콘 얼리버드 티켓은 순식간에 매진되므로 티켓 판매가 시작되는 4월 30일 오후 2시를 놓치지 마세요!</IntlText></p>
            <p><IntlText intlKey='asdf'>얼리버드 등록은 환불되지 않습니다.</IntlText></p>
          </div>
          <div>
            <h1><IntlText intlKey='asdf'>얼리버드 티켓</IntlText></h1>
            <p><IntlText intlKey='asdf'>프로그램 상세 내용이 정해지기도 전에 파이콘에 대한 애정만으로 남들보다 일찍 티켓을 구매하시는 분들을 위한 할인 티켓입니다. 한정된 수량을 판매하며 일반 티켓 가격에서 할인된 가격으로 판매합니다. 매년 파이콘 얼리버드 티켓은 순식간에 매진되므로 티켓 판매가 시작되는 4월 30일 오후 2시를 놓치지 마세요!</IntlText></p>
            <p><IntlText intlKey='asdf'>얼리버드 등록은 환불되지 않습니다.</IntlText></p>
          </div>
        </Section>

        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
