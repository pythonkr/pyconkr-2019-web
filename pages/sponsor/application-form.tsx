import { AlertBar } from 'components/atoms/AlertBar'
import { FormNeedsLogin } from 'components/atoms/FormNeedsLogin'
import { Loading } from 'components/atoms/Loading'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import SponsorForm from 'components/organisms/SponsorForm'
import PageTemplate from 'components/templates/PageTemplate'
import { isPast } from 'date-fns'
import { callForSponsors } from 'dates'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'
import { TEAL } from 'styles/colors'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import {Button} from '../../components/atoms/Button'
import {
  ContentTableWrapper, H1, H2, Li, Paragraph, ScheduleTable,
  Section, TBody, Td, Tr, Ul
} from '../../components/atoms/ContentWrappers'
import {FlexCenterWrapper} from '../../components/atoms/FlexWrapper'
import {IntlText} from '../../components/atoms/IntlText'
import {paths, sponsorMenu} from '../../routes/paths'

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

        <H1><IntlText intlKey='sponsor.prospectus.title'>
          후원사 신청하기
        </IntlText></H1>
        <StatusBar
          title='후원사 모집'
          actionText='신청'
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
          <>제안서를 작성하시기 전에 <Link href={paths.sponsor.prospectus}>후원사 모집 안내</Link>를 꼭 읽어주세요.</>}/>}
          {this.props.stores.authStore.isInitialized
            ? authStore.loggedIn
              ? <SponsorForm />
              : <FormNeedsLogin />
            : <Loading width={50} height={50}/>
          }
        </Section>

        <Section>
          <p style={{ position: 'relative'}}>
              <input type='checkbox' />
              <label htmlFor='privacy-consent'>
                  <IntlText intlKey='agreement.agreePrivacyProtectionPolicy'>개인정보 처리 방침에 동의합니다.</IntlText>
                  <a
                      style={{ position: 'absolute', right: 0 }}
                      href={paths.account.privacyPolicy}
                      target='_blank'
                      rel='noreferrer'
                  ><IntlText intlKey='agreement.viewPrivacyProtectionPolicy'>개인정보 처리 방침 보기</IntlText></a>
              </label>
          </p>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.'>CoC</IntlText></H2>
          <Paragraph><IntlText intlKey='common.'>
              파이콘 한국은 다양한 사람들이 만나서 교류하는 곳입니다. 커뮤니티의 모든 참여자들이 신체적, 정신적 위협을 느끼지 않고 서로 존중받고 환영받는 경험을 하기 바랍니다. 이를 위해 후원사를 포함한 모든 참가자들은 파이콘 한국 행동 강령(CoC)을 준수해야 합니다. <a>행동 강령 전문 보기</a>
          </IntlText></Paragraph>
          <Paragraph>
            <input type='checkbox' />
            <label>위 내용을 확인 하였으며 파이콘 한국 행동 강령을 준수할 것을 약속합니다.</label>
          </Paragraph>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.'>개인 정보</IntlText></H2>
          <Paragraph><IntlText intlKey='common.'></IntlText></Paragraph>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.'>후원 혜택</IntlText></H2>
          <Paragraph><IntlText intlKey='common.'></IntlText></Paragraph>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.'>후원 진행 절차</IntlText></H2>
          <Paragraph><IntlText intlKey='common.'></IntlText></Paragraph>
        </Section>
        <FlexCenterWrapper style={{ marginTop: 80 }}>
            <Button
                type='submit'
                tag='button'
                intlKey='common.'
                color={TEAL}
                width={300}
            >
                난 정말로 다 읽었습니다 🙆‍♀️
            </Button>
        </FlexCenterWrapper>
        <Section>
          <H2><IntlText intlKey='common.'>CoC</IntlText></H2>
          <Paragraph><IntlText intlKey='common.'></IntlText></Paragraph>
        </Section>
          <FlexCenterWrapper style={{ marginTop: 80 }}>
            <Button
                type='submit'
                tag='button'
                intlKey='common.'
                color={TEAL}
                width={300}
            >
              위 정보로 후원사를 신청합니다
            </Button>
          </FlexCenterWrapper>
      </PageTemplate>
    )
  }
}
