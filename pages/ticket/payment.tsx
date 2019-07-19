import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PaymentForm from 'components/organisms/PaymentForm'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import { RouterProps, withRouter } from 'next/router'
import React from 'react'
import { paths } from 'routes/paths'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

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

  componentWillUnmount () {
    const { stores } = this.props
    const { clearTicketOptions } = stores.ticketStore
    clearTicketOptions()
  }

  render() {
    const { t, stores, router } = this.props
    const { isPaying } = stores.ticketStore

    if (!isPaying) router.push(paths.ticket.overview)

    return (
      <PageTemplate
        header={<Header title='파이콘 한국 티켓 종류 :: 파이콘 한국 2019' intlKey='ticket.overview.pageTitle' />}
        footer={<Footer />}
      >
        <H1>
          {t('ticket:payment.title')}
        </H1>
        <PaymentForm
          stores={stores}
          t={t}
          router={router}
        />
        <Section>
          <H2>{t('common:contact')}</H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['ticket'])(Ticket)
