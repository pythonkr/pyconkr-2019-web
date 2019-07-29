import { AlertBar } from 'components/atoms/AlertBar'
import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import TicketBox from 'components/molecules/TicketBox'
import TermsAgreement from 'components/molecules/TicketBox/TermsAgreement'
import TicketDescription from 'components/molecules/TicketBox/TicketDescription'
import i18next from 'i18next'
import { TicketTypeNode } from 'lib/apollo_graphql/__generated__/globalTypes'
import { TICKET_STEP, TicketStep, VALIDATION_ERROR_TYPE } from 'lib/stores/Ticket/TicketStep'
import _ from 'lodash'
import { observer } from 'mobx-react'
import { RouterProps } from 'next/router'
import { StoresType } from 'pages/_app'
import * as React from 'react'
import { toast } from 'react-toastify'
import { paths } from 'routes/paths'
import { TICKET_COLOR } from 'styles/colors'

type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
  router: RouterProps;
}

@observer
class TutorialTicketList extends React.Component<PropsType> {

  componentWillUnmount () {
    const { stores } = this.props
    const { clearTicketSteps } = stores.ticketStore
    clearTicketSteps()
  }

  getStepAction = (ticketStep: TicketStep) => {
    switch (ticketStep.ticketStepState) {
      case TICKET_STEP.BUYING:
        return null
      case TICKET_STEP.AGREE_TERMS:
        return () => this.onAgreeTerms(ticketStep)
      case TICKET_STEP.PAYING:
        return () => this.onPayTicket(ticketStep)
      default:
        return null
    }
  }

  getNextTicketStep = (ticketStepState: TICKET_STEP) => {
    switch (ticketStepState) {
      case TICKET_STEP.BUYING:
        return TICKET_STEP.AGREE_TERMS
      case TICKET_STEP.AGREE_TERMS:
        return TICKET_STEP.PAYING
      default:
        return TICKET_STEP.BUYING
    }
  }

  getTicketButtonTitle = (ticketStepState: TICKET_STEP) => {
    const { t } = this.props

    switch (ticketStepState) {
      case TICKET_STEP.BUYING:
        return t('ticket:buying')
      case TICKET_STEP.AGREE_TERMS:
        return t('ticket:agree')
      case TICKET_STEP.PAYING:
        return t('ticket:paying')
      default:
        return t('ticket:buying')
    }
  }

  onAgreeTerms = (ticketStep: TicketStep) => {
    const { t } = this.props

    if (!ticketStep.isTermsAgreed) {
      toast.error(t('ticket:error.notAgreeToTerms'))

      return false
    }

    return true
  }

  onPayTicket = async (ticketStep: TicketStep) => {
    const { stores, router, t } = this.props
    const { setPayingTicket, payTicket } = stores.ticketStore
    const { price } = stores.ticketStore

    // if (ticketStep.validateTicket) {
    //   const error = ticketStep.validateTicket(TicketTypeNode.TUTORIAL)
    //
    //   if (error === VALIDATION_ERROR_TYPE.NOT_AGREED_TO_OPTIONS) {
    //     toast.error(t('ticket:error.notAgreeToOptions'))
    //
    //     return false
    //   }
    // }
    setPayingTicket(ticketStep)
    if (price === 0) {
      const data = await payTicket()
      if (data.graphQLErrors) {
        const { message } = data.graphQLErrors[0]
        toast.error(message)

        return false
      }
      if (!_.isEmpty(data)) window.location.href = paths.ticket.myTickets
    } else {
      router.push(paths.ticket.payment)
    }

    return false
  }

  renderTicketBoxList = () => {
    const { stores, t } = this.props
    const {
      tutorialProducts,
      getIsTicketStepExist,
      setTicketStep,
      getTicketStep,
      setPrice,
    } = stores.ticketStore

    if (_.isEmpty(tutorialProducts)) {
      return (
        <AlertBar text={t('ticket:common.noTicketAlert')} />
      )
    }

    return tutorialProducts.map(tutorialProduct => {
      const {
        id,
        name,
        desc,
        warning,
        price,
        isEditablePrice,
        ticketOpenAt,
        ticketCloseAt,
        isSoldOut,
        available,
      } = tutorialProduct
      const isTicketStepExist = getIsTicketStepExist(id)
      if (!isTicketStepExist) setTicketStep(id, name)
      const ticketStep = getTicketStep(id)

      if (!ticketStep) return null

      let options = null
      const {
        ticketStepState,
        setTicketTermsAgreed,
        isTermsAgreed,
        setTicketStepState,
      } = ticketStep

      if (ticketStepState === TICKET_STEP.BUYING) {
        options = (
          <TicketDescription
            t={t}
            title={name || ''}
            description={desc}
            warning={warning}
          />
        )
      }

      if (ticketStepState === TICKET_STEP.AGREE_TERMS) {
        options = (
          <TermsAgreement
            t={t}
            title={name || ''}
            id={id}
            isTermsAgreed={isTermsAgreed}
            onCancel={() => setTicketStepState(TICKET_STEP.BUYING)}
            onChangeAgreed={setTicketTermsAgreed}
          />
        )
      }

      if (ticketStepState === TICKET_STEP.PAYING) {
        options = (
          <TicketDescription
            t={t}
            title={name || ''}
            description={desc}
            warning={warning}
            cancelButtonTitle={t('ticket:back')}
            onCancel={() => setTicketStepState(TICKET_STEP.AGREE_TERMS)}
          />
        )
      }

      return (
        <TicketBox
          t={t}
          key={`ticketBox_${id}`}
          ticketColor={TICKET_COLOR.TUTORIAL}
          ticketButtonTitle={this.getTicketButtonTitle(ticketStepState)}
          price={price}
          isEditablePrice={isEditablePrice}
          setPrice={setPrice}
          startDate={ticketOpenAt}
          endDate={ticketCloseAt}
          isSoldOut={isSoldOut}
          onNextStep={setTicketStepState}
          stepAction={this.getStepAction(ticketStep)}
          nextStep={this.getNextTicketStep(ticketStepState)}
          options={options}
          isPaid={!available}
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

    if (!isLoggedIn) {
      return <FormNeedsLogin />
    }

    return (
      this.renderTicketBoxList()
    )
  }
}

export default TutorialTicketList
