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

import { paths } from '../../routes/paths'

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

  render() {
    return (
      <PageTemplate
        header={<Header title='컨퍼런스 티켓 :: 파이콘 한국 2019' intlKey='ticket.tutorial.pageTitle'/>}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1><IntlText intlKey='ticket.tutorial.title'>
          튜토리얼 티켓
        </IntlText></H1>
        <Paragraph><IntlText intlKey='ticket.tutorial.description1'>
        튜토리얼은 초보자들을 위해, 또는 새로운 것을 접하는 사람들을 위해 진행하는 교육 프로그램입니다. 튜토리얼 진행자와 도움을 주는 사람들이 여러분을 기다리고 있습니다. 프로그래밍을 처음 시작하거나 파이썬을 새롭게 시작하는 분들에게 튜토리얼 프로그램을 추천합니다.
        </IntlText></Paragraph>

        <Paragraph><IntlText intlKey='ticket.tutorial.description2'>
        기업에서 튜토리얼을 진행을 신청하는 경우, 파이콘 한국 준비위원회와 별도의 협의가 필요합니다. program@pycon.kr 로 연락주시면 안내해드리겠습니다.
        </IntlText></Paragraph>

        <H2>Tutorials</H2>
        <Paragraph><a href={paths.ticket.tutorial.detail}>자세히 보기</a></Paragraph>

        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
