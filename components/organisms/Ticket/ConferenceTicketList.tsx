import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import TicketBox from 'components/molecules/TicketBox'
import ConferenceTicketOption from 'components/molecules/TicketBox/ConferenceTicketOption'
import i18next from 'i18next'
import { TicketStatus, TicketTypeNode } from 'lib/apollo_graphql/__generated__/globalTypes'
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

@observer
class ConferenceTicketList extends React.Component<PropsType> {
  state = {
    paidProductId: null
  }

  componentDidMount () {
    const { stores } = this.props
    stores.ticketStore.cleanupConferenceTicketOptions()
    const myConferenceTicket = toJS(stores.ticketStore.getMyConferenceTickets()[0])
    if (myConferenceTicket) this.setState({ paidProductId: myConferenceTicket.product.id })
  }
 renderTicketBoxList = () => {
    const { stores, router, t } = this.props
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
