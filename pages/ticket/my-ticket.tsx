import {H1, H2, Paragraph, Section} from 'components/atoms/ContentWrappers'
import {IntlText} from 'components/atoms/IntlText'
import {LocalNavigation} from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import DetailBox from 'components/organisms/Ticket/DetailBox'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'next/router'
import React from 'react'
import {ticketMenu} from 'routes/paths'
import {DateDTO} from 'types/common'
import {PageDefaultPropsType} from 'types/PageDefaultPropsType'
import {Loading} from 'components/atoms/Loading'
import {FormNeedsLogin} from 'components/atoms/FormNeedsLogin'

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
    const {stores} = this.props
    await stores.ticketStore.retrieveMyTicket(this.props.router.query.id)
  }

  renderTicketPage = () => {
    const {stores} = this.props
    const {currentTicket} = stores.ticketStore

    return (
      <PageTemplate
        header={<Header title='티켓 상세 :: 파이콘 한국 2019' intlKey='ticket.myTickets.pageTitle'/>}
        footer={<Footer/>}
      >
        <LocalNavigation list={ticketMenu.submenu}/>
        <H1><IntlText intlKey='ticket.myTickets.title'>
          티켓 상세
        </IntlText></H1>
        <Paragraph>
          <IntlText intlKey='ticket.myTickets.description'>
            내가 구매한/취소한 티켓의 상세 내역을 확인합니다.
          </IntlText><br/>
          <IntlText intlKey='ticket:conference.option.tshirtWarning'>
            티셔츠 사이즈는 참고용이며 현장에서 상황에 따라 입력한 사이즈 제공이 어려울 수 있습니다.
          </IntlText>
        </Paragraph>
        <Section>
          {!currentTicket ? '잘못된 요청입니다' : <DetailBox ticket={currentTicket}/>}
        </Section>
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }

  render() {
    const {stores} = this.props
    const {authStore} = stores
    const isAuthStoreInitialized = authStore.isInitialized
    const isLoggedIn = authStore.loggedIn

    if (!isAuthStoreInitialized) {
      return <Loading width={50} height={50}/>
    }

    return (
      !isLoggedIn
        ? <FormNeedsLogin/>
        : this.renderTicketPage()
    )
  }
}
