import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import TicketBox from 'components/molecules/TicketBox'
import ConferenceTicketOption from 'components/molecules/TicketBox/ConferenceTicketOption'
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

  renderTicketBoxList = () => {
    const { stores, router, t } = this.props
    const { myConferenceTicket } = this.state
    const {
      conferenceProducts, setPrice,
      earlyBirdTicketOption, earlyBirdTicketOptionAgreed,
      earlyBirdTicketStep, setEarlyBirdTicketStep, setEarlyBirdTicketOption, setEarlyBirdTicketOptionAgreed, validateEarlyBirdTicket, setEarlyBirdTicket,
      patronTicketOption, patronTicketOptionAgreed,
      patronTicketStep, setPatronTicketStep, setPatronTicketOption, setPatronTicketOptionAgreed, validatePatronTicket, setPatronTicket,
    } = stores.ticketStore
    const ticketSteps = [
      {
        ticketStepState: earlyBirdTicketStep,
        ticketOption: earlyBirdTicketOption,
        isTicketAgreed: earlyBirdTicketOptionAgreed,
        setTicketStepState: setEarlyBirdTicketStep,
        setTicketOption: setEarlyBirdTicketOption,
        setTicketOptionAgreed: setEarlyBirdTicketOptionAgreed,
        validateTicket: validateEarlyBirdTicket,
        setTicket: setEarlyBirdTicket,
      },
      {
        ticketStepState: patronTicketStep,
        ticketOption: patronTicketOption,
        isTicketAgreed: patronTicketOptionAgreed,
        setTicketStepState: setPatronTicketStep,
        setTicketOption: setPatronTicketOption,
        setTicketOptionAgreed: setPatronTicketOptionAgreed,
        validateTicket: validatePatronTicket,
        setTicket: setPatronTicket,
      }
    ]

    return conferenceProducts.map((conferenceProduct, index) => {
      const { id, nameKo, nameEn, descKo, descEn, warningKo, warningEn, price, isEditablePrice, type, startAt, finishAt } = conferenceProduct
      const isLanguageKorean = i18next.language === 'ko'
      const title = isLanguageKorean ? nameKo : nameEn
      const desc = isLanguageKorean ? descKo : descEn
      const warning = isLanguageKorean ? warningKo : warningEn
      const {
        ticketStepState,
        setTicketStepState, setTicketOption, setTicketOptionAgreed,
        ticketOption, isTicketAgreed,
        validateTicket, setTicket
      } = ticketSteps[index]
      const options = type === TicketTypeNode.CONFERENCE && (
        <ConferenceTicketOption
          t={t}
          title={title || ''}
          id={id}
          ticketOption={ticketOption}
          isTicketAgreed={isTicketAgreed}
          onCancel={() => setTicketStepState(1)}
          onChangeOption={setTicketOption}
          onChangeAgreed={setTicketOptionAgreed}
        />
      )
      let isPaid = null
      if (!_.isEmpty(myConferenceTicket)) {
        isPaid = myConferenceTicket.product.id === id
      }

      return (
        <TicketBox
          key={`ticketBox_${id}`}
          title={title || ''}
          description={desc || ''}
          warning={warning || ''}
          price={price}
          isEditablePrice={isEditablePrice}
          options={options || null}
          step={ticketStepState}
          onNextStep={() => setTicketStepState(2)}
          onValidate={validateTicket}
          setTicket={() => setTicket(id)}
          setPrice={setPrice}
          router={router}
          startDate={startAt}
          endDate={finishAt}
          isPaid={isPaid}
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
