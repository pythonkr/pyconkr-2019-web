import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { Loading } from 'components/atoms/Loading'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import YoungCoderTicketList from 'components/organisms/Ticket/YoungCoderTicketList'
import PageTemplate from 'components/templates/PageTemplate'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import { ticketMenu } from 'routes/paths'
import { PageDefaultPropsType } from 'types/PageDefaultPropsType'
import { withNamespaces } from '../../i18n'

@inject('stores')
@(withRouter as any)
@observer
class YoungcoderPage extends React.Component<PageDefaultPropsType> {
  static async getInitialProps() {
    return {
      namespacesRequired: ['ticket'],
    }
  }

  async componentDidMount () {
    const { stores } = this.props
    const { youngCoderProducts, retrieveYoungCoderProducts } = stores.ticketStore

    if (_.isEmpty(youngCoderProducts)) {
      await retrieveYoungCoderProducts()
    }
  }

  render() {
    const { stores, t, router } = this.props
    const { youngCoderProducts } = stores.ticketStore

    return (
      <PageTemplate
        header={<Header title='컨퍼런스 티켓 :: 파이콘 한국 2019' intlKey='ticket.youngcoder.pageTitle'/>}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1>
          {t('ticket:youngcoder.title')}
        </H1>
        <StatusBar
          text={t('ticket:youngcoder.title')}
          openDate={stores.scheduleStore.schedule.childcareTicketStartAt}
          closeDate={stores.scheduleStore.schedule.childcareTicketFinishAt}
        />
        <Section>
          {_.isNil(youngCoderProducts)
            ? <Loading width={50} height={50}/>
            : <YoungCoderTicketList stores={stores} t={t} router={router} />
          }
        </Section>
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['ticket'])(YoungcoderPage)
