import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {
  ContentTableWrapper,
  TableList,
} from '../../components/atoms/ContentWrappers'
import { ProgramTableRow } from 'components/molecules/Program/Detail'
import {PageDefaultPropsType} from 'types/PageDefaultPropsType'
import PageTemplate from 'components/templates/PageTemplate'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import {H1, H2, Paragraph, Section} from 'components/atoms/ContentWrappers'
import {IntlText} from 'components/atoms/IntlText'
import {toJS} from 'mobx'
import {withRouter} from 'next/router'
import {Loading} from 'components/atoms/Loading'
import {FormNeedsLogin} from 'components/atoms/FormNeedsLogin'
import {formatDateInWordsWithWeekdayAndTime} from 'utils/formatDate'

@(withRouter as any)
@inject('stores')
@observer
export default class Receipt extends React.Component<PageDefaultPropsType> {
  async componentDidMount() {
    const {stores} = this.props
    await stores.ticketStore.retrieveMyTicket(this.props.router.query.id)
  }

  renderReceipt = () => {
    const {stores} = this.props
    const {currentTicket} = toJS(stores.ticketStore)
    const {profile} = toJS(stores.profileStore)

    return (
      <ContentTableWrapper>
        <TableList>
          <ProgramTableRow
            header={'Name'}
            bold>
            {profile.nameKo}({profile.nameEn})
          </ProgramTableRow>
          <ProgramTableRow
            header={'Ticket Type'}
            bold>
            PyCon Korea 2019 - {currentTicket.product.type} - {currentTicket.product.nameKo}({currentTicket.product.nameEn})
          </ProgramTableRow>
          <ProgramTableRow
            header={'Price'}
            bold>
            {currentTicket.amount}
          </ProgramTableRow>
          <ProgramTableRow
            header={'Registered At'}
            bold>
            {formatDateInWordsWithWeekdayAndTime(currentTicket.registeredAt)}
          </ProgramTableRow>
          <ProgramTableRow
            header={'Provider'}
            bold>
            Python Korea Inc.<br/>Chair man. Kwon-Han, Bae<br/>
            <img
              width='160px'
              height='160px'
              src='/static/images/stamp.jpg'
            />
          </ProgramTableRow>
          <ProgramTableRow
            header={'Provider Company Number'}
            bold>
            338-82-00046
          </ProgramTableRow>
        </TableList>
        
      </ContentTableWrapper>
    )
  }

  renderReceiptPage = () => {
    const {stores} = this.props
    const {currentTicket} = toJS(stores.ticketStore)

    return (
      <PageTemplate
        header={<Header title='티켓 상세 :: 파이콘 한국 2019' intlKey='ticket.myTickets.pageTitle'/>}
        footer={<Footer/>}
      >
        <H1><IntlText intlKey='ticket.myTickets.title'>
          등록/참석 확인증
        </IntlText></H1>
        <Paragraph><IntlText intlKey='ticket.myTickets.description'>
          구매한 티켓으로 등록하고 참석하였음을 확인합니다.
        </IntlText></Paragraph>
        <Section>
          {!currentTicket ? '잘못된 요청입니다' : this.renderReceipt()}
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
        : this.renderReceiptPage()
    )
  }
}
