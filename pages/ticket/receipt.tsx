import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {
  ContentTableWrapper,
  TBody, Table,
  Td,
  Th,
  Tr
} from '../../components/atoms/ContentWrappers'
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
        <Table>
          <TBody>
            <Tr>
              <Th>Name</Th>
              <Td>{profile.nameKo}({profile.nameEn})</Td>
            </Tr>
            <Tr>
              <Th>Ticket Type</Th>
              <Td>PyCon Korea 2019 - {currentTicket.product.type} - {currentTicket.product.nameKo}({currentTicket.product.nameEn})</Td>
            </Tr>
            <Tr>
              <Th>Price</Th>
              <Td>{currentTicket.amount}</Td>
            </Tr>
            <Tr>
              <Th>Provider</Th>
              <Td>
                Python Korea Inc.<br/>Chair man. Kwon-Han, Bae
                {/*<img*/}
                {/*  width='160px'*/}
                {/*  height='160px'*/}
                {/*  src={this.state.stampUrl}*/}
                {/*/>*/}
              </Td>
            </Tr>
            <Tr>
              <Th>Provider Company Number</Th>
              <Td>338-82-00046</Td>
            </Tr>
          </TBody>
        </Table>
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
          등록 영수증
        </IntlText></H1>
        <Paragraph><IntlText intlKey='ticket.myTickets.description'>
          내가 구매한 티켓의 등록 영수증을 확인합니다.
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
