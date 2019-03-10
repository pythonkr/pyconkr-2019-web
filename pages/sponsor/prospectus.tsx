import { ContentTableWrapper, H1, H2, Li, Paragraph, ScheduleTable, Section, TBody, Td, Tr, Ul } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { NoticeBar } from 'components/atoms/NoticeBar'
import { StatusBar } from 'components/atoms/StatusBar'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import { SponsorPackageTables } from 'components/organisms/SponsorPackageTables'
import PageTemplate from 'components/templates/PageTemplate'
import { callForSponsors } from 'dates'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { ALERT_BLUE_DARK, ALERT_YELLOW, ALERT_YELLOW_DARK, ALERT_YELLOW_SEMI_DARK } from 'styles/colors'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { StoresType } from '../_app'

const schedule = [{
  title: '후원사 모집 오픈',
  date: callForSponsors.open
}, {
  title: '후원사 모집 마감',
  desc: '마감 시까지'
}]

@inject('stores')
@observer
export default class Prospectus extends React.Component<{ stores: StoresType }> {
  render() {
    return (
      <PageTemplate
        header={<Header title='후원사 안내 :: 파이콘 한국 2019' />}
        footer={<Footer />}
      >
        {/* <LocalNavigation list={sponsorMenu} /> */}

        <H1><IntlText intlKey='sponsor.prospectus.title'>
          후원사 안내
        </IntlText></H1>
        <StatusBar
          title='후원사 모집'
          actionText='신청'
          // link={paths.sponsor.applicationForm}
          openDate={callForSponsors.open}
        />
        <Paragraph><IntlText intlKey='asdfasdfasdf'>
          파이콘은 커뮤니티 주관으로 이뤄지는 비영리 개발자 대상 행사로,
          여타 기업 및 기관에서 개최하는 개발자 행사와는 성격이 다릅니다.
          발표자와 튜토리얼 진행자를 포함하여, 자원봉사자와 준비위원회 담당자 등 모든 인원이 금전적 이득 없이
          순수히 오픈소스 프로그래밍 언어인 파이썬의 저변 확대와 커뮤니티 활성화를 위해 진행하는 행사입니다.
        </IntlText></Paragraph>
        <Paragraph><IntlText intlKey='asdfasdfasdf'>
          따라서, 본 행사에 후원하심은 후원사 또는 개인의 오픈소스 커뮤니티 및 파이썬 사용자에 대한 방향과 태도를
          가장 솔직하게 보여주시는 것이라 할 수 있겠습니다.
          또한, 다양한 매체로의 홍보, 후원사 튜토리얼, 후원사 세션과 부스 구성 등을 지원해드리며,
          이를 우수한 개발자 모집의 장으로 활용하실 수 있습니다.
        </IntlText></Paragraph>
        <Section>
          <H2><IntlText intlKey='aaa'>세부 일정</IntlText></H2>
          <ContentTableWrapper>
            <ScheduleTable>
              <TBody>
                {schedule.map(({ title, date, desc }) =>
                  <Tr key={title}>
                    <Td className='bold'>{title}</Td>
                    <Td>
                      {date
                        ? formatDateInWordsWithWeekdayAndTime(date)
                        : desc}
                    </Td>
                  </Tr>
                )}
              </TBody>
            </ScheduleTable>
          </ContentTableWrapper>
        </Section>
        <Section>
          <H2><IntlText intlKey='a'>문의</IntlText></H2>
          <Paragraph><IntlText intlKey='asdfasdfasdf'>
            <a href='mailto: sponsor@pycon.kr'>sponsor@pycon.kr</a><br />
            이메일로 문의 주시면 상세한 후원사 안내 문서를 보내드립니다.
          </IntlText></Paragraph>
        </Section>
        <Section>
          <H2><IntlText intlKey='a'>후원사 패키지</IntlText></H2>
          <Paragraph><IntlText intlKey='asdfasdfasdf'>
            개최지와 여건에 따라 등급별 지원 내용은 다소 달라질 수 있습니다. <br />
            또한, 후원사에 의해 제공되는 튜토리얼이나 세션, 증정품은 준비위원회와 사전 협의가 필요합니다.
          </IntlText></Paragraph>
          <NoticeBar
            color={ALERT_YELLOW}
            borderColor={ALERT_YELLOW_SEMI_DARK}
            textColor={ALERT_YELLOW_DARK}
            textLinkColor={ALERT_BLUE_DARK}
            text='스폰서 부스는 8월 18-19일(토-일) 이틀 동안 진행하는 컨퍼런스에서만 운영됩니다.'
          />
          <SponsorPackageTables />
          <Ul>
            <Li>후원금은 VAT 별도 금액입니다.</Li>
            <Li>후원사 부스 1 칸의 크기는 3m x 2m x 2.5m 기준입니다.</Li>
            <Li>증정품 지급은 컨퍼런스 입장 시 참가자 전원에게 제공되는 에코백에 후원사의 증정품을 포함하는 것을 말합니다.</Li>
            <Li>세부 사항은 행사 전까지 다소 변경될 수 있습니다.</Li>
            <Li>커뮤니티 스폰서십은 비영리 단체에 한합니다.</Li>
            <Li>출판사 후원의 경우, 파이썬 관련 도서 출판 기록이 필요합니다.</Li>
            <Li>미디어 후원의 경우, 언론 보도 및 홍보 이력이 필요합니다.</Li>
          </Ul>
        </Section>
      </PageTemplate>
    )
  }
}
