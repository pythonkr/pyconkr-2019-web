import { AlertBar } from 'components/atoms/AlertBar'
import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import ConferenceTicketList from 'components/organisms/Ticket/ConferenceTicketList'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { ticketMenu } from 'routes/paths'
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

@inject('stores')
@observer
export default class ProposingATalk extends React.Component<PageDefaultPropsType> {
  async componentDidMount() {
    const { stores } = this.props
    if (!stores.ticketStore.isInitialized) stores.ticketStore.initialize()
  }

  render() {
    const { stores, t } = this.props

    return (
      <PageTemplate
        header={<Header title='컨퍼런스 티켓 :: 파이콘 한국 2019' intlKey='ticket.conference.pageTitle'/>}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1><IntlText intlKey='ticket.conference.title'>
          컨퍼런스 티켓
        </IntlText></H1>
        <StatusBar />
        <Paragraph><IntlText intlKey='ticket.conference.description'>
          파이콘 한국의 메인 행사인 8월 18-19일(토-일) 이틀 간의 컨퍼런스에 입장할 수 있는 티켓입니다.
        </IntlText></Paragraph>
        <Section>
          <AlertBar text={'발표 세션 , 후원사 부스, 라이트닝 토크, 열린 세션을 포함합니다.'} />
          <AlertBar text={'튜토리얼, 스프린트, 영코더, 아이 돌봄은 포함하지 않습니다.'} />
        </Section>
        <Section>
          <ConferenceTicketList stores={stores} t={t}/>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
