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
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph>
            <a href='mailto: sponsor@pycon.kr'>sponsor@pycon.kr</a>
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
      </PageTemplate>
    )
  }
}
