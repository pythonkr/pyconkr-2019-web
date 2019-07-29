import { AlertBar } from 'components/atoms/AlertBar'
import { H1, H2, H3, Li, Paragraph, Section, Ul } from 'components/atoms/ContentWrappers'
import { Loading } from 'components/atoms/Loading'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import ConferenceTicketList from 'components/organisms/Ticket/ConferenceTicketList'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { paths, ticketMenu } from 'routes/paths'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { withNamespaces } from '../../i18n'
import {FormNeedsLogin} from 'components/atoms/FormNeedsLogin'

@(withRouter as any)
@inject('stores')
@observer
export class ConferenceTicket extends React.Component<PageDefaultPropsType> {
  static async getInitialProps() {
      return {
          namespacesRequired: ['ticket'],
      }
  }

  async componentDidMount () {
    const { stores } = this.props
    const {
      isInitialized,
      initialize,
    } = stores.ticketStore

    if (!isInitialized) initialize()
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
        <AlertBar text={t('ticket:conference.alert1')} />
        <AlertBar text={t('ticket:conference.alert2')} />
        <Section>
          <H2>{ t('ticket:common.list') }</H2>
          <ConferenceTicketList stores={stores} t={t} router={router} />
        </Section>
        <Section>
          <H2>{ t('ticket:conference.header2') }</H2>
          <AlertBar text={t('ticket:conference.soldout')} />
          {/* <Paragraph>{t('ticket:conference.desc2')} </Paragraph>
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
          </Ul> */}
          <H3>{ t('ticket:conference.header2-3') }</H3>
          <Paragraph>
            <strong style={{ fontWeight: 'bold', display: 'block' }}>{t('ticket:conference.desc2-3-1')}</strong>
            { t('ticket:conference.desc2-3-1-1') }
          </Paragraph>
          <Paragraph>
            <strong style={{ fontWeight: 'bold', display: 'block' }}>{t('ticket:conference.desc2-3-2')}</strong>
            { t('ticket:conference.desc2-3-2-1') }
          </Paragraph>
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
