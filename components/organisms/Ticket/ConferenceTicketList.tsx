import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import TicketBox from 'components/molecules/TicketBox'
import ConferenceTicketOption from 'components/molecules/TicketBox/ConferenceTicketOption'
import i18next from 'i18next'
import { TicketTypeNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import * as React from 'react'

type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@observer
class ConferenceTicketList extends React.Component<PropsType> {
  renderTicketBoxList = () => {
    const { stores } = this.props
    const { conferenceProducts, earlyBirdTicketStep, setEarlyBirdTicketStep, setEarlyBirdTicketOption, setEarlyBirdTicketOptionAgreed } = stores.ticketStore
    const ticketSteps = [
      { ticketStepState: earlyBirdTicketStep,  setTicketStepState: setEarlyBirdTicketStep, setTicketOption: setEarlyBirdTicketOption, setTicketOptionAgreed: setEarlyBirdTicketOptionAgreed}
    ]

    return conferenceProducts.map((conferenceProduct, index) => {
      const { nameEn, nameKo, descKo, descEn, price, isEditablePrice, type } = conferenceProduct
      const isLanguageKorean = i18next.language === 'ko'
      const title = isLanguageKorean ? nameKo : nameEn
      const desc = isLanguageKorean ? descKo : descEn
      const { ticketStepState, setTicketStepState, setTicketOption, setTicketOptionAgreed } = ticketSteps[index]
      const options = type === TicketTypeNode.CONFERENCE && (
        <ConferenceTicketOption
          title={title || ''}
          onCancel={() => setTicketStepState(1)}
          onChangeOption={setTicketOption}
          onChangeAgreed={setTicketOptionAgreed}
        />
      )

      return (
        <TicketBox
          title={title || ''}
          description={desc || ''}
          warning={'얼리버드 등록은 환불되지 않습니다.'}
          price={price}
          isEditablePrice={isEditablePrice}
          options={options || null}
          step={ticketStepState}
          onNextStep={() => setTicketStepState(2)}
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
