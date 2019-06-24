import { AlertBar } from 'components/atoms/AlertBar'
import { ContentTableWrapper, H1, H2, isBold, Li, Ol, Paragraph, ScheduleTable, Section, TBody, Td, Tr, Ul } from 'components/atoms/ContentWrappers'
import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { IntlText } from 'components/atoms/IntlText'
import { Loading } from 'components/atoms/Loading'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import CFPForm from 'components/organisms/CFPForm'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { isPast } from 'date-fns'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { contributionMenu, paths } from 'routes/paths'
import { DateDTO } from 'types/common'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { withNamespaces } from '../../i18n'
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
export class ProposingATalk extends React.Component<{ stores: StoresType }> {
  state = {
    isFormInitialized: false
  }

  static async getInitialProps() {
    return {
        namespacesRequired: ['contribute'],
    }
  }

  render() {
    const { authStore, scheduleStore } = this.props.stores
    const { presentationProposalStartAt,  presentationProposalFinishAt } = scheduleStore.schedule
    const { presentationReviewStartAt, presentationReviewFinishAt, presentationAnnounceAt } = scheduleStore.schedule

    const schedule: Schedule[] = [{
      title: '발표 제안 오픈',
      intlKey: 'contribute.talkProposal.schedule.open',
      date: presentationProposalStartAt,
    }, {
      title: '발표 제안 마감',
      intlKey: 'contribute.talkProposal.schedule.close',
      date: presentationProposalFinishAt,
    }, {
      title: '발표 제안 리뷰 시작',
      intlKey: 'contribute.talkProposal.schedule.reviewStart',
      date: presentationReviewStartAt,
    }, {
      title: '발표 제안 리뷰 완료',
      intlKey: 'contribute.talkProposal.schedule.reviewFinish',
      date: presentationReviewFinishAt,
    }, {
      title: '최종 발표자 확정',
      intlKey: 'contribute.talkProposal.schedule.announcement',
      date: presentationAnnounceAt,
    }]

    return (
      <PageTemplate
        header={<Header title='발표 제안하기 :: 파이콘 한국 2019' intlKey='contribute.talkProposal.pageTitle'/>}
        footer={<Footer />}
      >
        <LocalNavigation list={contributionMenu.submenu} />
        <H1><IntlText intlKey='contribute.talkProposal.title'>
          발표 제안하기
        </IntlText></H1>
        <StatusBar
          titleIntlKey='contribute.talkProposal.title'
          actionIntlKey='common.apply'
          link={paths.contribute.proposingATalk}
          openDate={presentationProposalStartAt}
          closeDate={presentationProposalFinishAt}
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
          <H2><IntlText intlKey='contribute.talkProposal.process.title'>선정 절차</IntlText></H2>
          <Paragraph><IntlText intlKey='contribute.talkProposal.process.desc'>
            발표 제안 이후 선정 절차는 아래와 같으며, 관련 안내는 파이콘 홈페이지 또는 이메일로 진행됩니다.
          </IntlText></Paragraph>
          <Ol>
            <Li><IntlText intlKey='contribute.talkProposal.process.item1'>발표 제안 기간 마감 이후, 준비위원회에서 제안된 내용을 검토합니다.</IntlText>
              <Ul>
                <Li><IntlText intlKey='contribute.talkProposal.process.item1-1'>추가 정보가 필요한 경우 별도의 요청이 있을 수 있습니다.</IntlText></Li>
              </Ul>
            </Li>
            <Li><IntlText intlKey='contribute.talkProposal.process.item2'>발표안 리뷰를 시작합니다.</IntlText></Li>
            <Li><IntlText intlKey='contribute.talkProposal.process.item3'>발표안 리뷰가 완료된 이후에 최종 발표자가 확정됩니다.</IntlText>
              <Ul>
                <Li><IntlText intlKey='contribute.talkProposal.process.item3-1'>결과와 관계 없이 모든 분들께 결과 메일을 발송할 예정입니다</IntlText></Li>
              </Ul>
            </Li>
          </Ol>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
        <Section>
          <H2><IntlText intlKey='contribute.talkProposal.application.title'>제안서 작성</IntlText></H2>
          {isPast(presentationProposalStartAt) && <AlertBar text={
            <>
              <a href={paths.contribute.cfpDetailedGuide}>
                📙<IntlText intlKey='common.alert'>제안서를 작성하시기 전에 발표안 작성 가이드를 꼭 읽어주세요.</IntlText>
              </a>
            </>}/>}
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

export default withNamespaces(['contribute'])(ProposingATalk)
