import { ContentTableWrapper, H1, H2, isBold, Paragraph, ScheduleTable, Section, TBody, Td, Tr } from 'components/atoms/ContentWrappers'
import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { IntlText } from 'components/atoms/IntlText'
import { Loading } from 'components/atoms/Loading'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import CFPForm from 'components/organisms/CFPForm'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { talkProposal } from 'dates'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { contributionMenu, paths } from 'routes/paths'
import { DateDTO } from 'types/common'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
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

const schedule: Schedule[] = [{
  title: '발표안 제안 오픈',
  intlKey: 'contribute.talkProposal.schedule.open',
  date: talkProposal.open,
}, {
  title: '발표안 제안 마감',
  intlKey: 'contribute.talkProposal.schedule.close',
  date: talkProposal.close,
}, {
  title: '최종 발표자 확정',
  intlKey: 'contribute.talkProposal.schedule.announcement',
  date: talkProposal.announcement,
}]

@inject('stores')
@observer
export default class ProposingATalk extends React.Component<{ stores: StoresType }> {
  state = {
    isFormInitialized: false
  }

  render() {
    const { authStore } = this.props.stores

    return (
      <PageTemplate
        header={<Header title='발표안 제안하기 :: 파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <LocalNavigation list={contributionMenu.submenu} />
        <H1><IntlText intlKey='contribute.overview.title'>
          발표안 제안하기
        </IntlText></H1>
        <StatusBar
          title='발표안 모집'
          actionText='제안'
          link={paths.contribute.proposingATalk}
          openDate={talkProposal.open}
          closeDate={talkProposal.close}
        />
        <Paragraph><IntlText intlKey='contribute.talkProposal.description1'>
          파이썬에 대한 학술적 또는 상업적 프로젝트, 케이스 스터디 등
          다양한 파이썬 관련 발표를 아래와 같은 일정으로 모집합니다.
          자세한 내용은 발표안 작성 가이드를 참고해주세요.
        </IntlText></Paragraph>
        <Section>
          <H2><IntlText intlKey='common.schedule'>일정</IntlText></H2>
          <ContentTableWrapper>
            <ScheduleTable>
              <TBody>
                {schedule.map(({ title, date, desc, intlKey }) =>
                  <Tr key={title}>
                    <Td className={isBold}>
                      <IntlText intlKey={intlKey}>{title}</IntlText>
                    </Td>
                    <Td>
                      {desc
                          ? <IntlText intlKey={desc.intlKey}>{desc.defaultText}</IntlText>
                          : formatDateInWordsWithWeekdayAndTime(date!)
                      }
                    </Td>
                  </Tr>
                )}
              </TBody>
            </ScheduleTable>
          </ContentTableWrapper>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><IntlText intlKey='asdfasdfasdf'>program@pycon.kr</IntlText></Paragraph>
        </Section>
        <Section>
          <H2><IntlText intlKey='contribute.talkProposal.application.title'>제안서 작성</IntlText></H2>
          {this.props.stores.authStore.isInitialized
            ? authStore.loggedIn
              ? <CFPForm />
              : <FormNeedsLogin />
            : <Loading width={50} height={50}/>
          }
        </Section>
      </PageTemplate>
    )
  }
}
