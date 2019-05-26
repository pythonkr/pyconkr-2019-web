import { AlertBar } from 'components/atoms/AlertBar'
import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import ConferenceTicketList from 'components/organisms/Ticket/ConferenceTicketList'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { paths, ticketMenu } from 'routes/paths'
import { DateDTO } from 'types/common'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'

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

@(withRouter as any)
@inject('stores')
@observer
export default class MyTickets extends React.Component<PageDefaultPropsType> {
  async componentDidMount() {
    const { stores } = this.props
    // TODO : my tickets 셋팅
  }

  render() {
    const { stores, t, router } = this.props

    return (
      <PageTemplate
        header={<Header title='컨퍼런스 티켓 :: 파이콘 한국 2019' intlKey='ticket.myTickets.pageTitle'/>}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1><IntlText intlKey='ticket.myTickets.title'>
          내 티켓
        </IntlText></H1>
        <Paragraph><IntlText intlKey='ticket.myTickets.description'>
          내가 구매한/취소한 티켓 내역을 확인합니다.
        </IntlText></Paragraph>
        <Section>
          <AlertBar text={'취소된 티켓은 유효하지 않으며 입장시 사용될 수 없습니다.'} />
        </Section>
        <Section>
          <ConferenceTicketList stores={stores} t={t} router={router}/>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
