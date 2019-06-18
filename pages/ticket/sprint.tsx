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
        header={<Header title='컨퍼런스 티켓 :: 파이콘 한국 2019' intlKey='ticket.sprint.pageTitle'/>}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1><IntlText intlKey='ticket.sprint.title'>
          스프린트 티켓
        </IntlText></H1>
        <Paragraph><IntlText intlKey='ticket.sprint.description1'>
        스프린트는 관심있는 오픈소스 프로젝트를 같은 장소에 모여 집중적으로 개발하는 자리입니다. 새로운 동료를 만나고, 오픈소스에서 얻을 수 있는 경험과 지식을 나눌 수 있는 시간입니다. 처음 참여하신다고요? 문제 없습니다. 해당 프로젝트를 주도적으로 개발하는 분에게 배울 수 있는 시간이 될 것입니다.
        </IntlText></Paragraph>

        <Paragraph><IntlText intlKey='ticket.sprint.description2'>
        스프린트는 파이썬 뿐만 아니라 모든 언어의 오픈소스 프로젝트를 대상으로 진행됩니다.
        </IntlText></Paragraph>

        <H2>Sprints</H2>
        <Paragraph><a href={paths.ticket.sprint.detail}>자세히 보기</a></Paragraph>

        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
