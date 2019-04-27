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
        header={<Header title='컨퍼런스 티켓 :: 파이콘 한국 2019' intlKey='ticket.sprint.pageTitle'/>}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1><IntlText intlKey='ticket.sprint.title'>
          스프린트 티켓
        </IntlText></H1>

        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
