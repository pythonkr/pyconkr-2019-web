import { AlertBar } from 'components/atoms/AlertBar'
import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import ConferenceTicketList from 'components/organisms/Ticket/ConferenceTicketList'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { paths, ticketMenu } from 'routes/paths'
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
export class ConferenceTicket extends React.Component<PageDefaultPropsType> {
  static async getInitialProps() {
      return {
          namespacesRequired: ['ticket'],
      }
  }

  async componentDidMount() {
    const { stores } = this.props
    if (!stores.ticketStore.isInitialized) stores.ticketStore.initialize()
  }

  render() {
    const { stores, t, router } = this.props

    return (
      <PageTemplate
        header={<Header title='컨퍼런스 티켓 :: 파이콘 한국 2019' intlKey='ticket.conference.pageTitle'/>}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1>{t('ticket:conference.pageTitle')}</H1>
        <StatusBar
          text={t('ticket:conference.ticket')}
          actionIntlKey='common.apply'
          link={paths.ticket.conference}
          openDate={stores.scheduleStore.schedule.conferenceTicketStartAt}
          closeDate={stores.scheduleStore.schedule.conferenceFinishAt}
        />
        <Paragraph>{t('ticket:conference.description')}</Paragraph>
        <Section>
          <AlertBar text={t('ticket:conference.alert1')} />
          <AlertBar text={t('ticket:conference.alert2')} />
        </Section>
        <Section>
          <ConferenceTicketList stores={stores} t={t} router={router}/>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['ticket'])(ConferenceTicket)
