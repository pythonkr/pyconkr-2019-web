import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { ticketMenu } from 'routes/paths'
import { DateDTO } from 'types/common'
import { StoresType } from '../_app'

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

@inject('stores')
@observer
export default class ProposingATalk extends React.Component<{ stores: StoresType }> {
  state = {
    isFormInitialized: false
  }

  static async getInitialProps() {
    return {
        namespacesRequired: ['common', 'constant'],
    }
  }

  render() {
    return (
      <PageTemplate
        header={<Header title='컨퍼런스 티켓 :: 파이콘 한국 2019' intlKey='ticket.childcare.pageTitle'/>}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1><IntlText intlKey='ticket.childcare.title'>
          아이돌봄 티켓
        </IntlText></H1>

        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
