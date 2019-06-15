import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import TicketBox from 'components/molecules/TicketBox'
import ConferenceTicketOption from 'components/molecules/TicketBox/ConferenceTicketOption'
import TermsAgreement from 'components/molecules/TicketBox/TermsAgreement'
import i18next from 'i18next'
import { TicketTypeNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { TicketNode } from 'lib/apollo_graphql/queries/getMyTickets'
import _ from 'lodash'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { RouterProps } from 'next/router'
import { StoresType } from 'pages/_app'
import * as React from 'react'

type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
  router: RouterProps;
}

type StatesType = {
  myConferenceTicket: TicketNode;
}
@observer
class ConferenceTicketList extends React.Component<PropsType, StatesType> {
  state = {
    myConferenceTicket: null as any
  }

  async componentDidMount () {
    const { stores } = this.props
    const {
      myTickets,
      retrieveMyTickets,
      getMyConferenceTickets,
    } = stores.ticketStore
    const myConferenceTicket = toJS(getMyConferenceTickets()[0])

    if (_.isEmpty(myTickets)) {
      await retrieveMyTickets()
    }


    if (!_.isEmpty(myConferenceTicket)) {
      this.setState({ myConferenceTicket })
    }
  }

  renderTicketBoxList = () => {
    const { stores, router, t } = this.props
    const { myConferenceTicket } = this.state
    const {
      conferenceProducts,
      setPrice,
      getTicketStep,
      getIsTicketStepExist,
      setTicketStep,
      setPayingTicket,
    } = stores.ticketStore

    return conferenceProducts.map((conferenceProduct) => {
      const { id, nameKo, nameEn, descKo, descEn, warningKo, warningEn, price, isEditablePrice, ticketOpenAt, ticketCloseAt, isSoldOut } = conferenceProduct
      const isLanguageKorean = i18next.language === 'ko'
      const title = isLanguageKorean ? nameKo : nameEn
      const desc = isLanguageKorean ? descKo : descEn
      const warning = isLanguageKorean ? warningKo : warningEn
      const isTicketStepExist = getIsTicketStepExist(id)
      if (!isTicketStepExist) setTicketStep(id, title)
      const ticketStep = getTicketStep(id)

      if (!ticketStep) return null

      const {
        ticketStepState,
        setTicketStepState, setTicketOption, setTicketOptionAgreed, setTicketTermsAgreed,
        ticketOption, isTicketOptionAgreed, isTermsAgreed,
        validateTicket, initConferenceTicketOptions
      } = ticketStep

      let options = null

      if (ticketStepState === 1 || ticketStepState === 2) {
        options = (
          <TermsAgreement
            t={t}
            title={title || ''}
            id={id}
            isTermsAgreed={isTermsAgreed}
            onCancel={initConferenceTicketOptions}
            onChangeAgreed={setTicketTermsAgreed}
          />
        )
      }
      if (ticketStepState === 3) {
        options = (
          <ConferenceTicketOption
            t={t}
            title={title || ''}
            id={id}
            tshirtsize={ticketOption && ticketOption.tshirtsize || ''}
            isTicketAgreed={isTicketOptionAgreed}
            onCancel={initConferenceTicketOptions}
            onChangeOption={setTicketOption}
            onChangeAgreed={setTicketOptionAgreed}
          />
        )
      }

      let isPaid = null
      if (!_.isEmpty(myConferenceTicket)) {
        isPaid = myConferenceTicket.product.id === id
      }

      return (
        <TicketBox
          t={t}
          key={`ticketBox_${id}`}
          title={title || ''}
          description={desc || ''}
          warning={warning || ''}
          price={price}
          isEditablePrice={isEditablePrice}
          options={options || null}
          step={ticketStepState}
          onNextStep={setTicketStepState}
          onValidate={validateTicket}
          setTicket={() => setPayingTicket(ticketStep)}
          setPrice={setPrice}
          router={router}
          startDate={ticketOpenAt}
          endDate={ticketCloseAt}
          isPaid={isPaid}
          isTermsAgreed={isTermsAgreed}
          isSoldOut={isSoldOut}
        />
      )
    })
  }
  render() {
    const { stores } = this.props
    const { authStore } = stores
    const isAuthStoreInitialized = authStore.isInitialized
    const isLoggedIn = authStore.loggedIn

    if (!isAuthStoreInitialized) {
      return <Loading width={50} height={50}/>
    }

    return (
      !isLoggedIn
      ? <FormNeedsLogin />
      :  this.renderTicketBoxList()
    )
  }
}

export default ConferenceTicketList
