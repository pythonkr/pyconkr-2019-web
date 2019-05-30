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
    stores.ticketStore.cleanupConferenceTicketOptions()
    if (_.isEmpty(stores.ticketStore.myTickets)) await stores.ticketStore.retrieveMyTickets()
    const myConferenceTicket = toJS(stores.ticketStore.getMyConferenceTickets()[0])
    if (!_.isEmpty(myConferenceTicket)) this.setState({ myConferenceTicket })
  }

  getTicketSteps = () => {
    const { stores } = this.props
    const {
      earlyBirdTicketOption, earlyBirdTicketOptionAgreed, earlyBirdTicketTermsAgreed,
      earlyBirdTicketStep, setEarlyBirdTicketStep, setEarlyBirdTicketOption, setEarlyBirdTicketOptionAgreed, setEarlyBirdTicketTermsAgreed,
      validateEarlyBirdTicket, setEarlyBirdTicket,
      patronTicketOption, patronTicketOptionAgreed, patronTicketTermsAgreed,
      patronTicketStep, setPatronTicketStep, setPatronTicketOption, setPatronTicketOptionAgreed, setPatronTicketTermsAgreed,
      validatePatronTicket, setPatronTicket,
    } = stores.ticketStore

    return [
      {
        ticketStepState: earlyBirdTicketStep,
        tshirtsize: earlyBirdTicketOption && earlyBirdTicketOption.tshirtsize,
        isTicketAgreed: earlyBirdTicketOptionAgreed,
        isTermsAgreed: earlyBirdTicketTermsAgreed,
        setTicketStepState: setEarlyBirdTicketStep,
        setTicketOption: setEarlyBirdTicketOption,
        setTicketOptionAgreed: setEarlyBirdTicketOptionAgreed,
        setTicketTermsAgreed: setEarlyBirdTicketTermsAgreed,
        validateTicket: validateEarlyBirdTicket,
        setTicket: setEarlyBirdTicket,
      },
      {
        ticketStepState: patronTicketStep,
        tshirtsize: patronTicketOption && patronTicketOption.tshirtsize,
        isTicketAgreed: patronTicketOptionAgreed,
        isTermsAgreed: patronTicketTermsAgreed,
        setTicketStepState: setPatronTicketStep,
        setTicketOption: setPatronTicketOption,
        setTicketOptionAgreed: setPatronTicketOptionAgreed,
        setTicketTermsAgreed: setPatronTicketTermsAgreed,
        validateTicket: validatePatronTicket,
        setTicket: setPatronTicket,
      }
    ]
  }

  renderTicketBoxList = () => {
    const { stores, router, t } = this.props
    const { myConferenceTicket } = this.state
    const { conferenceProducts, setPrice, cleanupConferenceTicketOptions } = stores.ticketStore
    const ticketSteps = this.getTicketSteps()

    return conferenceProducts.map((conferenceProduct, index) => {
      const { id, nameKo, nameEn, descKo, descEn, warningKo, warningEn, price, isEditablePrice, type, ticketOpenAt, ticketCloseAt, isSoldOut } = conferenceProduct
      const isLanguageKorean = i18next.language === 'ko'
      const title = isLanguageKorean ? nameKo : nameEn
      const desc = isLanguageKorean ? descKo : descEn
      const warning = isLanguageKorean ? warningKo : warningEn
      const {
        ticketStepState,
        setTicketStepState, setTicketOption, setTicketOptionAgreed, setTicketTermsAgreed,
        tshirtsize, isTicketAgreed, isTermsAgreed,
        validateTicket, setTicket
      } = ticketSteps[index]

      let options = null

      if (ticketStepState === 1 || ticketStepState === 2) {
        options = (
          <TermsAgreement
            t={t}
            title={title || ''}
            id={id}
            isTermsAgreed={isTermsAgreed}
            onCancel={cleanupConferenceTicketOptions}
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
            tshirtsize={tshirtsize || ''}
            isTicketAgreed={isTicketAgreed}
            onCancel={cleanupConferenceTicketOptions}
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
          setTicket={() => setTicket(id)}
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
