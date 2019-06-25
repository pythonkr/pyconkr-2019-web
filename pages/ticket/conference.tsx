import { AlertBar } from 'components/atoms/AlertBar'
import { H1, H2, H3, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
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
    const title = t('ticket:conference.title')
    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1>{ title }</H1>
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
          <H2>{ t('ticket:conference.header2') }</H2>
          <Paragraph>{t('ticket:conference.desc2')} </Paragraph>
          <H3>{ t('ticket:conference.header2-1') }</H3>
          <Paragraph>{ t('ticket:conference.desc2-1') }</Paragraph>
          <Ul>
            <Li>{ t('ticket:conference.desc2-1-1') }</Li>
            <Li>{ t('ticket:conference.desc2-1-2') }</Li>
          </Ul>
          <H3>{ t('ticket:conference.header2-2') }</H3>
          <Paragraph>{ t('ticket:conference.desc2-2') }</Paragraph>
          <Ul>
            <Li>{ t('ticket:conference.desc2-2-1') }</Li>
            <Li>{ t('ticket:conference.desc2-2-2') }</Li>
            <Li>{ t('ticket:conference.desc2-2-3') }</Li>
            <Li>{ t('ticket:conference.desc2-2-4') }</Li>
            <Li>{ t('ticket:conference.desc2-2-5') }</Li>
          </Ul>
        </Section>
        <Section>
          <H2>{ t('common:contact') }</H2>
          <Paragraph><a href='mailto:pyconkr@pycon.kr'>pyconkr@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['ticket'])(ConferenceTicket)
