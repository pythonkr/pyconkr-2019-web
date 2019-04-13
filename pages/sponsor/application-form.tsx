import { AlertBar } from 'components/atoms/AlertBar'
import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import { StatusBar } from 'components/atoms/StatusBar'
import { IntlText } from '../../components/atoms/IntlText'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import SponsorForm from 'components/organisms/SponsorForm'
import PageTemplate from 'components/templates/PageTemplate'
import { isPast } from 'date-fns'
import { callForSponsors } from 'dates'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import {
  ContentTableWrapper, H1, H2, Paragraph, ScheduleTable,
  Section, TBody, Td, Tr
} from '../../components/atoms/ContentWrappers'
import {paths} from '../../routes/paths'

export type IndexPagePropsType = {
  stores: StoresType;
}

const schedule = [{
  title: '후원사 모집 오픈',
  intlKey: 'sponsor.prospectus.schedule.open',
  date: callForSponsors.open
}, {
  title: '후원사 모집 마감',
  intlKey: 'sponsor.prospectus.schedule.deadline',
  desc: {
    defaultText: '마감 시까지',
    intlKey: 'common.status.untilSelected'
  }
}]

@inject('stores')
@observer
export default class ApplicationForm extends React.Component<{ stores: StoresType }> {
  render() {
    const { stores } = this.props
    const { authStore } = this.props.stores
    const { sponsors } = toJS(stores.sponsorStore)

    return (
        <PageTemplate
            header={<Header title='후원사 신청하기 :: 파이콘 한국 2019' />}
            footer={<Footer />}
        >
          {/* <LocalNavigation list={sponsorMenu.submenu} /> */}

          <H1><IntlText intlKey='sponsor.event.invitation'>
            후원사 신청하기
          </IntlText></H1>
          <StatusBar
              titleIntlKey='sponsor.event.invitation'
              actionIntlKey='common.apply'
              link={paths.sponsor.applicationForm}
              openDate={callForSponsors.open}
          />
          <Section>
            <H2><IntlText intlKey='common.schedule'>세부 일정</IntlText></H2>
            <ContentTableWrapper>
              <ScheduleTable>
                <TBody>
                  {schedule.map(({ title, intlKey, date, desc }) =>
                      <Tr key={title}>
                        <Td className='bold'>
                          { intl.get(intlKey).d(title)}
                        </Td>
                        <Td>
                          {
                            date
                                ? formatDateInWordsWithWeekdayAndTime(date)
                                : desc
                                ? intl.get(desc.intlKey).d(desc.defaultText)
                                : '-'
                          }
                        </Td>
                      </Tr>
                  )}
                </TBody>
              </ScheduleTable>
            </ContentTableWrapper>
          </Section>
          <Section>
            <H2><IntlText intlKey='common.guideTitle'>후원사 FAQ</IntlText></H2>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 후원 비용은 어디에 쓰이나요?</strong>
              A. 행사 운영비로 사용되게 됩니다. 장소대여비, 부스 운영비, 각종 프로그램 진행비, 해외 스피커 항공료및 호텔, 스피커와 운영팀 식사, 비디오녹화, 기념티셔츠 및 책자 제작 등 입니다.
            </Paragraph>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 세금계산서 발행이 가능한가요?</strong>
              A. 네. 사단법인 파이썬사용자모임 명의로 세금계산서 발행이 가능합니다.
            </Paragraph>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 후원사 신청 시 여러 후원 등급에 중복 신청도 가능한가요?</strong>
              A. 아니요, 중복 신청은 불가능합니다. 후원사 선정은 입금순으로 이루어 지기 때문에 후원하고자 하시는 등급에 빠르게 신청하시는 걸 추천드립니다.
              해당 후원 등급의 잔여 후원사 수가 궁금하신 경우에는 <a href='mailto: sponsor@pycon.kr'>sponsor@pycon.kr</a> 로 문의주시면 최대한 빨리 답변드리겠습니다.
            </Paragraph>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 후원사 선정의 절차는 어떻게 되나요?</strong>
              A. 후원사 선정 절차는 아래와 같으며, 대부분의 과정은 파이콘 홈페이지 또는 이메일로 진행됩니다.<br/>
              (1) 홈페이지로 후원사 신청 접수 및 접수 확인 이메일 발송<br/>
              (2) 파이콘 한국 준비위원회에서 접수된 내용에 대해 확인 및 검토 (누락된 내용 / 오기입된 내용이 없는지 확인합니다)<br/>
              - 일부 정보가 누락되거나 추가 정보가 필요한 경우 파이콘 한국 준비위원회에서 별도의 요청이 있을 수 있습니다<br/>
              (3) 신청서에 이상이 없다면, 신청서에 적어주신 담당자 연락처로 입금 계좌 및 금액 안내<br/>
              (4) 해당 등급의 후원금의 입금이 확인되면, 후원사 등록 확정<br/>
            </Paragraph>
          </Section>
          <Section>
            <H2><IntlText intlKey='common.guideTitle'>후원사 가이드</IntlText></H2>
            <Paragraph>
              <a target='_blank' rel='noreferrer' href='https://pythonkr.github.io/sponsor-guide/'>파이콘 한국 2019 후원사 가이드</a> 에서 상세 내용을 확인할 수 있습니다.<br/>
              후원 고려시 꼭 가이드를 읽어봐주시기를 부탁드립니다. 각 혜택별 상세 내용 등에 안내해드리고 있습니다.
            </Paragraph>
          </Section>
          <Section>
            <H2><IntlText intlKey='contribute.talkProposal.application.title'>신청서 작성</IntlText></H2>
            {isPast(callForSponsors.open) && <AlertBar text={
              <>
                <a href={paths.sponsor.prospectus}>
                  📙<IntlText intlKey='common.alert'>제안서를 작성하시기 전에 후원사 모집 안내를 꼭 읽어주세요.</IntlText>
                </a>
              </>}/>}
            {this.props.stores.authStore.isInitialized
                ? authStore.loggedIn
                    ? <SponsorForm />
                    : <FormNeedsLogin />
                : <Loading width={50} height={50}/>
            }
          </Section>
          <Section>
            <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
            <Paragraph>
              <a href='mailto: sponsor@pycon.kr'>sponsor@pycon.kr</a>
            </Paragraph>
          </Section>
        </PageTemplate>
    )
  }
}
