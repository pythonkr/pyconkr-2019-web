import { AlertBar } from 'components/atoms/AlertBar'
import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import { StatusBar } from 'components/atoms/StatusBar'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import SponsorForm from 'components/organisms/SponsorForm'
import PageTemplate from 'components/templates/PageTemplate'
import { isPast } from 'date-fns'
import i18next from 'i18next'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'
import ReactMarkdown from 'react-markdown'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import {
  alignCenter, ContentTableWrapper, H1, H2, Paragraph,
  ScheduleTable, Section, Table, TBody, Td, Th, THead, Tr
} from '../../components/atoms/ContentWrappers'
import { IntlText } from '../../components/atoms/IntlText'
import { withNamespaces } from '../../i18n'
import {paths} from '../../routes/paths'

@inject('stores')
@observer
export class ApplicationForm extends React.Component<{ 
  stores: StoresType;
  t: i18next.TFunction;
}> {  
  static async getInitialProps() {
    return {
      namespacesRequired: ['home', 'sponsor'],
    }
  }

  async componentDidMount() {
    const { sponsorStore, authStore } = this.props.stores
    if (authStore.loggedIn) await sponsorStore.retrieveMySponsorProposal()
  }

  render() {
    const { stores, t } = this.props
    const { authStore, sponsorStore } = this.props.stores
    const { sponsorProposalStartAt,  sponsorProposalFinishAt} = stores.scheduleStore.schedule

    const schedule = [{
      title: '후원사 모집 오픈',
      intlKey: 'sponsor.prospectus.schedule.open',
      date: sponsorProposalStartAt
    }, {
      title: '후원사 모집 마감',
      intlKey: 'sponsor.prospectus.schedule.deadline',
      date: sponsorProposalFinishAt
    }]

    return (
        <PageTemplate
            header={<Header title='후원사 신청하기 :: 파이콘 한국 2019' />}
            footer={<Footer />}
        >
          <H1><IntlText intlKey='sponsor.event.invitation'>
            후원사 신청하기
          </IntlText></H1>
          <StatusBar
              titleIntlKey='sponsor.event.invitation'
              actionIntlKey='common.apply'
              link={paths.sponsor.applicationForm}
              openDate={sponsorProposalStartAt}
              closeDate={sponsorProposalFinishAt}
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
          <H2>등급별 후원사 신청 현황</H2>
          <Paragraph>아래 테이블의 각 등급별 후원사 신청 현황은 <strong style={{ fontWeight: 'bold' }}>"신청수/스폰서수"</strong> 로 표시되었습니다.</Paragraph>
          <ContentTableWrapper>
            <Table>
              <THead>
                <Tr>
                  {sponsorStore.sponsorLevels.map(({id, name}) =>
                    <Th key={id} className={alignCenter}>{name}</Th>
                  )}
                </Tr>
              </THead>
              <TBody>
                <Tr>
                  {sponsorStore.sponsorLevels.map(({id, acceptedCount, limit}) =>
                    <Td key={id} className={alignCenter}>
                      { acceptedCount === limit ? 
                          '마감'
                          : ( 
                              limit < 100 ? 
                                `${acceptedCount}/${limit}` 
                                : acceptedCount)}
                    </Td>
                  )}
                </Tr>
              </TBody>
            </Table>
          </ContentTableWrapper>
          </Section>

          <Section>
            <H2><IntlText intlKey='sponsor.prospectus.faqTitle'>후원사 FAQ</IntlText></H2>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>{t('sponsor:prospectus.faq.question1')}</strong>
              <ReactMarkdown source={t('sponsor:prospectus.faq.answer1')} />
            </Paragraph>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>{t('sponsor:prospectus.faq.question2')}</strong>
              <ReactMarkdown source={t('sponsor:prospectus.faq.answer2')} />
            </Paragraph>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>{t('sponsor:prospectus.faq.question3')}</strong>
              <ReactMarkdown source={t('sponsor:prospectus.faq.answer3')} />
            </Paragraph>
            <Paragraph>
              <strong style={{ fontWeight: 'bold', display: 'block' }}>{t('sponsor:prospectus.faq.question4')}</strong>
              <ReactMarkdown source={t('sponsor:prospectus.faq.answer4')} />
            </Paragraph>
          </Section>
          <Section>
            <H2><IntlText intlKey='sponsor.guideTitle'>후원사 가이드</IntlText></H2>
            <Paragraph>
              <a target='_blank' rel='noreferrer' href='https://pythonkr.github.io/sponsor-guide/'>파이콘 한국 2019 후원사 가이드</a> 에서 상세 내용을 확인할 수 있습니다.<br/>
              후원 고려시 꼭 가이드를 읽어봐주시기를 부탁드립니다. 각 혜택별 상세 내용 등에 안내해드리고 있습니다.
            </Paragraph>
          </Section>
          <Section>
            <H2><IntlText intlKey='contribute.talkProposal.application.title'>신청서 작성</IntlText></H2>
            {isPast(sponsorProposalStartAt) && <AlertBar text={
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

export default withNamespaces(['home', 'sponsor'])(ApplicationForm)
