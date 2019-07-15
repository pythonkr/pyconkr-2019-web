import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { Loading } from 'components/atoms/Loading'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import SprintTicketList from 'components/organisms/Ticket/SprintTicketList'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { paths, ticketMenu } from 'routes/paths'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { withNamespaces } from '../../i18n'

@inject('stores')
@(withRouter as any)
@observer
export class SprintTicket extends React.Component<PageDefaultPropsType> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['ticket'],
    }
  }

  async componentDidMount () {
    const { stores } = this.props
    const { sprintProducts, retrieveSprintProducts } = stores.ticketStore

    if (_.isEmpty(sprintProducts)) {
      await retrieveSprintProducts()
    }
  }

  render() {
    const { stores, t, router } = this.props
    const title = t('ticket:sprint.title')
    return (
      <PageTemplate
        header={<Header title={t('common:pageTitle', { title })} intlKey='' />}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1>
          { title }
        </H1>
        <StatusBar
          text={ title }
          openDate={stores.scheduleStore.schedule.sprintTicketStartAt}
          closeDate={stores.scheduleStore.schedule.sprintTicketFinishAt}
        />
        <Paragraph>
          <MarkdownWrapper contents={t('ticket:sprint.description1')}/>
        </Paragraph>
        <Paragraph>
          <MarkdownWrapper contents={t('ticket:sprint.description2')}/>
        </Paragraph>
        <Section>
          <H2>{ t('ticket:common.list') }</H2>
          <SprintTicketList stores={stores} t={t} router={router} />
        </Section>

        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['ticket'])(SprintTicket)
