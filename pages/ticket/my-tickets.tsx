import { AlertBar } from 'components/atoms/AlertBar'
import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import MyTicketList from 'components/organisms/Ticket/MyTicketList'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { ticketMenu } from 'routes/paths'
import { DateDTO } from 'types/common'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { withNamespaces } from '../../i18n'

export type IntlTextType = {
  intlKey: string;
  defaultText: string;
}

export type Schedule = {
  title: string;
  intlKey: string;
  date: DateDTO;
  desc?: IntlTextType;
}

@(withRouter as any)
@inject('stores')
@observer
export class MyTickets extends React.Component<PageDefaultPropsType> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['ticket'],
    }
  }

  async componentDidMount() {
    const { stores } = this.props
    if (!stores.ticketStore.isInitialized) await stores.ticketStore.initialize()
  }

  render() {
    const { stores, t, router } = this.props

    return (
      <PageTemplate
        header={<Header title={t('ticket:myTickets.headerTitle')}/>}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1>{t('ticket:myTickets.pageTitle')}</H1>
        <Section>
          <AlertBar text={t('ticket:myTickets.alert')} />
          <Paragraph>{t('ticket:myTickets.desc1')}</Paragraph>
          <Paragraph>{t('ticket:myTickets.desc2')}</Paragraph>
        </Section>
        <Section>
          <MyTicketList stores={stores} t={t} router={router}/>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['ticket'])(MyTickets)
