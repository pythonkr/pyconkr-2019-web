import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
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
export default class SprintDetail extends React.Component<{ stores: StoresType }> {
  state = {
    isFormInitialized: false
  }

  render() {
    return (
      <PageTemplate
        header={<Header title='컨퍼런스 티켓 :: 파이콘 한국 2019' intlKey='ticket.sprint.pageTitle'/>}
        footer={<Footer />}
      >
        <H1><IntlText intlKey='ticket.sprint.title'>
          스프린트 상세 보기
        </IntlText></H1>

        <H2>진행자</H2>
        <Paragraph></Paragraph>

        <H2>일시와 장소</H2>
        <Paragraph></Paragraph>

        <H2>언어</H2>
        <Paragraph></Paragraph>

        <H2>자세한 설명</H2>
        <Paragraph></Paragraph>

        <H2>프로젝트 공식 URL</H2>
        <Paragraph></Paragraph>

        <a href={paths.ticket.sprint}>목록으로</a> 
      </PageTemplate>
    )
  }
}
