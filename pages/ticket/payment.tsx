import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { ContentTableWrapper, FormWrapper, H1, H2, Paragraph, Section, Table, TBody, Td, Tr } from 'components/atoms/ContentWrappers'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import { CREDITCARD_TYPE, PAYMENT_TYPE_ENUM } from 'lib/stores/Ticket/TicketStore'
import { creditCardFormatter, isStringNumber, removeWhiteSpaces } from 'lib/util/common'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import { RouterProps, withRouter } from 'next/router'
import React, { FormEvent } from 'react'
import { toast } from 'react-toastify'
import { paths } from 'routes/paths'
import { TEAL } from 'styles/colors'
import { withNamespaces } from '../../i18n'
import { mobileWidth } from '../../styles/layout'
import { StoresType } from '../_app'

const FormHalfBox = styled.div`
display: inline-block;
margin-right: 5%;
width: 45%;
@media (max-width: ${mobileWidth}) {
  display: block;
  width: 100%;
  margin: 0;
}
}`

const CreditCardRadioButtons = styled.div`
display: flex;
margin-bottom: 40px;

.radioButton {
margin-right: 20px;
}
`

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
  router: RouterProps;
}

@(withRouter as any)
@inject('stores')
@observer
export class Ticket extends React.Component<PropsType> {
  static async getInitialProps() {
      return {
          namespacesRequired: ['ticket'],
      }
  }

  componentDidMount () {
    const { router, stores } = this.props
    window.scrollTo(0, 0)
    if (!stores.ticketStore.isPaying) router.push(paths.ticket.overview)
    stores.ticketStore.cleanupPaymentInfo()
  }

  onSubmitPayment = async (event: FormEvent<HTMLInputElement | HTMLFormElement>) => {
    event.preventDefault()
    const { stores, router } = this.props
    stores.ticketStore.setExpiry()
    const data = await stores.ticketStore.payTicket()

    if (data.graphQLErrors) {
      const { message } = data.graphQLErrors[0]
      toast.error(message)

      return
    }

    if (!_.isEmpty(data)) router.push(paths.home)
  }

  onChangeInputValue = (value: string, valueHandler: (value: string) => void) => {
    const noWhitespacedValue = removeWhiteSpaces(value)
    if (!isStringNumber(noWhitespacedValue) && !_.isEmpty(noWhitespacedValue)) return
    valueHandler(noWhitespacedValue)
  }

  onChangeDomesticCard = (isDomestic: boolean) => {
    const { stores } = this.props
    if (!isDomestic) stores.ticketStore.setPwd2Digit('')
    stores.ticketStore.setIsDomesticCard(isDomestic)
  }

  render() {
    const { t, stores, router } = this.props
    const { isPaying } = stores.ticketStore
    const { payingType } = stores.ticketStore
    const loweredCasedPayingType = payingType && _.lowerCase(PAYMENT_TYPE_ENUM[payingType])

    if (!isPaying) router.push(paths.ticket.overview)

    // #TODO: 컴포넌트 정리 필요(styled-component, component 분리 등등)
    return (
      <PageTemplate
        header={<Header title='파이콘 한국 티켓 종류 :: 파이콘 한국 2019' intlKey='ticket.overview.pageTitle' />}
        footer={<Footer />}
      >
        <H1>
          {t('ticket:payment.title')}
        </H1>
        <Section>
          <FormWrapper>
            <H2>
              {'결제정보'}
            </H2>
            <ContentTableWrapper>
              <Table>
                <colgroup>
                  <col width='30%'/>
                  <col width='70%'/>
                </colgroup>
                <TBody>
                  <Tr>
                    <Td>{'티켓유형'}</Td>
                    <Td className='bold'>{`${t(`ticket:conference.${loweredCasedPayingType}.title`)} 티켓`}</Td>
                  </Tr>
                  <Tr>
                    <Td>{'가격'}</Td>
                    <Td className='bold'>{`${stores.ticketStore.price.toLocaleString()} 원`}</Td>
                  </Tr>
                </TBody>
              </Table>
            </ContentTableWrapper>
          </FormWrapper>
        </Section>
        <Section>
            <FormWrapper>
              <form onSubmit={this.onSubmitPayment}>
                <H2>
                  {'카드정보'}
                </H2>
                <hr className='margin-20' />
                <label className='required'>
                  {'국내/해외 카드'}
                </label>
                <CreditCardRadioButtons>
                  <div className='radioButton'>
                    <input
                      type='radio'
                      id={CREDITCARD_TYPE.DOMESTIC}
                      value={CREDITCARD_TYPE.DOMESTIC}
                      aria-checked={stores.ticketStore.ticketInput.isDomesticCard}
                      checked={stores.ticketStore.ticketInput.isDomesticCard}
                      onChange={() => this.onChangeDomesticCard(true)}
                    >
                    </input>
                    <label htmlFor={CREDITCARD_TYPE.DOMESTIC}>{'국내'}</label>
                  </div>
                  <div className='radioButton'>
                    <input
                      type='radio'
                      id={CREDITCARD_TYPE.FOREIGN}
                      value={CREDITCARD_TYPE.FOREIGN}
                      aria-checked={!stores.ticketStore.ticketInput.isDomesticCard}
                      checked={!stores.ticketStore.ticketInput.isDomesticCard}
                      onChange={() => this.onChangeDomesticCard(false)}
                    >
                    </input>
                    <label htmlFor={CREDITCARD_TYPE.FOREIGN}>{'해외'}</label>
                  </div>
                </CreditCardRadioButtons>
                <div>
                  <label className='required'>
                    {'카드번호'}
                  </label>
                  <input
                    type='text'
                    value={creditCardFormatter(stores.ticketStore.ticketInput.cardNumber)}
                    aria-required={true}
                    required
                    placeholder={'- 없이 입력'}
                    onChange={e => this.onChangeInputValue(e.target.value, stores.ticketStore.setCardNumber)}
                    style={{
                      width: '325px',
                      fontSize: '20px',
                      letterSpacing: '3px'
                    }}
                  />
                </div>
                <FormHalfBox>
                  <label className='required'>
                    {'유효기간'}
                  </label>
                  <input
                    type='text'
                    value={stores.ticketStore.expiryMonth}
                    style={{
                      width: '80px',
                      textAlign: 'center',
                      fontSize: '20px',
                      letterSpacing: '3px',
                      marginRight: '10px'
                    }}
                    aria-required={true}
                    required
                    placeholder={'MM'}
                    maxLength={2}
                    onChange={e => this.onChangeInputValue(e.target.value, stores.ticketStore.setExpiryMonth)}
                  />
                  <input
                    type='text'
                    value={stores.ticketStore.expiryYear}
                    style={{
                      width: '80px',
                      textAlign: 'center',
                      fontSize: '20px',
                      letterSpacing: '3px',
                      marginRight: '10px'
                    }}
                    aria-required={true}
                    required
                    placeholder={'YY'}
                    maxLength={2}
                    onChange={e => this.onChangeInputValue(e.target.value, stores.ticketStore.setExpiryYear)}
                  />
                </FormHalfBox>
                <FormHalfBox>
                  <label className='required'>
                    {'생년월일'}
                  </label>
                  <input
                    type='text'
                    value={stores.ticketStore.ticketInput.birth || ''}
                    aria-required={true}
                    required
                    placeholder={'6자리'}
                    onChange={e => this.onChangeInputValue(e.target.value, stores.ticketStore.setBirth)}
                    style={{
                      width: '255px',
                      fontSize: '20px',
                      letterSpacing: '3px'
                    }}
                    maxLength={6}
                  />
                </FormHalfBox>
                <FormHalfBox>
                  <label className='required'>
                    {'비밀번호'}
                  </label>
                  <div>
                    <input
                      type='text'
                      value={stores.ticketStore.ticketInput.pwd2digit !== null && stores.ticketStore.ticketInput.isDomesticCard
                        ? stores.ticketStore.ticketInput.pwd2digit
                        : ''
                     }
                      aria-required={true}
                     required
                      placeholder={'**'}
                      style={{
                        width: '80px',
                        textAlign: 'center',
                        fontSize: '20px',
                        letterSpacing: '3px',
                        marginRight: '10px'
                      }}
                      maxLength={2}
                      onChange={e => stores.ticketStore.setPwd2Digit(e.target.value)}
                      disabled={!stores.ticketStore.ticketInput.isDomesticCard}
                    />
                    <span
                      style={{
                        color: '#088487',
                        fontSize: '30px',
                        verticalAlign: 'middle'
                      }}
                    >
                    {'**'}
                    </span>
                  </div>
                </FormHalfBox>
                <FlexSpaceBetweenWrapper>
                  <Button
                    tag='button'
                    type='button'
                    intlKey='contribute.talkProposal.application.stages.stages2.button1'
                    color={TEAL}
                    width={80}
                    primary={false}
                    margin='0 10px 0 auto'
                  >
                  {'취소'}
                  </Button>
                  <Button
                    tag='button'
                    type='sumbit'
                    intlKey='contribute.talkProposal.application.stages.stages2.button1'
                    color={TEAL}
                    width={80}
                    onSubmit={this.onSubmitPayment}
                  >
                  {'결제'}
                  </Button>
                </FlexSpaceBetweenWrapper>
              </form>
            </FormWrapper>
        </Section>
        <Section>
          <H2>{t('common:contact')}</H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['ticket'])(Ticket)
