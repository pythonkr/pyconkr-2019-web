import { AlertBar } from 'components/atoms/AlertBar'
import { ContentTableWrapper, H1, H2, Li, Paragraph, ScheduleTable, Section, TBody, Td, Tr, Ul } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { StatusBar } from 'components/atoms/StatusBar'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import { SponsorPackageTables } from 'components/organisms/SponsorPackageTables'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import intl from 'react-intl-universal'
import { paths } from 'routes/paths'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { StoresType } from '../_app'

@inject('stores')
@observer
export default class Prospectus extends React.Component<{ stores: StoresType }> {
  render() {
    const { sponsorProposalStartAt,  sponsorProposalFinishAt} = this.props.stores.scheduleStore.schedule

    return (
        <PageTemplate
            header={<Header title='후원사 안내 :: 파이콘 한국 2019' intlKey='sponsor.prospectus.pageTitle'/>}
            footer={<Footer />}
        >
          {/* <LocalNavigation list={sponsorMenu} /> */}

          <H1><IntlText intlKey='sponsor.prospectus.title'>
            후원사 안내
          </IntlText></H1>
          <StatusBar
              titleIntlKey='sponsor.event.invitation'
              actionIntlKey='common.apply'
              link={paths.sponsor.applicationForm}
              openDate={sponsorProposalStartAt}
              closeDate={sponsorProposalFinishAt}
          />
          <Paragraph><IntlText intlKey='home.differenceWithOthers.description'>
            파이콘은 커뮤니티 주관으로 이뤄지는 비영리 개발자 대상 행사로,
            여타 기업 및 기관에서 개최하는 개발자 행사와는 성격이 다릅니다.
            발표자와 튜토리얼 진행자를 포함하여, 자원봉사자와 준비위원회 담당자 등 모든 인원이 금전적 이득 없이
            순수히 오픈소스 프로그래밍 언어인 파이썬의 저변 확대와 커뮤니티 활성화를 위해 진행하는 행사입니다.
          </IntlText></Paragraph>
          <Paragraph><IntlText intlKey='sponsor.prospectus.description1'>
            따라서, 본 행사에 후원하심은 후원사 또는 개인의 오픈소스 커뮤니티 및 파이썬 사용자에 대한 방향과 태도를
            가장 솔직하게 보여주시는 것이라 할 수 있겠습니다.
            또한, 다양한 매체로의 홍보, 후원사 튜토리얼, 후원사 세션과 부스 구성 등을 지원해드리며,
            이를 우수한 개발자 모집의 장으로 활용하실 수 있습니다.
          </IntlText></Paragraph>
          <Section>
            <H2><IntlText intlKey='sponsor.prospectus.faqTitle'>후원사 FAQ</IntlText></H2>
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
            <H2><IntlText intlKey='sponsor.guideTitle'>후원사 가이드</IntlText></H2>
            <Paragraph>
              <a target='_blank' rel='noreferrer' href='https://pythonkr.github.io/sponsor-guide/'>파이콘 한국 2019 후원사 가이드</a> 에서 상세 내용을 확인할 수 있습니다.<br/>
              후원 고려시 꼭 가이드를 읽어봐주시기를 부탁드립니다. 각 혜택별 상세 내용 등에 안내해드리고 있습니다.
            </Paragraph>
          </Section>
          <Section>
            <H2><IntlText intlKey='sponsor.prospectus.packageTitle'>후원사 패키지</IntlText></H2>
            <Paragraph><IntlText intlKey='sponsor.prospectus.packageDesc'>
              개최지와 여건에 따라 등급별 지원 내용은 다소 달라질 수 있습니다. <br />
              또한, 후원사에 의해 제공되는 세션 및 튜토리얼, 증정품은 준비위원회와 사전 협의가 필요합니다.
            </IntlText></Paragraph>
            <AlertBar text={intl.get('sponsor.prospectus.boothDesc')
            .d('스폰서 부스는 8월 17-18일(토-일) 이틀 동안 진행하는 컨퍼런스에서만 운영됩니다.')
            }/>
            <SponsorPackageTables />
            <Ul>
              <Li>{ intl.get('sponsor.prospectus.packages.desc1').d('후원금은 VAT 별도 금액입니다.') }</Li>
              <Li>{ intl.get('sponsor.prospectus.packages.desc2').d('후원사 부스 1 칸의 크기는 3m x 2m x 2.5m 기준입니다.') }</Li>
              <Li>{ intl.get('sponsor.prospectus.packages.desc3').d('증정품 지급은 컨퍼런스 입장 시 참가자 전원에게 제공되는 에코백에 후원사의 증정품을 포함하는 것을 말합니다.') }</Li>
              <Li>{ intl.get('sponsor.prospectus.packages.desc4').d('세부 사항은 행사 전까지 다소 변경될 수 있습니다.') }</Li>
              <Li>{ intl.get('sponsor.prospectus.packages.desc5').d('커뮤니티 스폰서십은 비영리 단체에 한합니다.') }</Li>
              <Li>{ intl.get('sponsor.prospectus.packages.desc6').d('출판사 후원의 경우, 파이썬 관련 도서 출판 기록이 필요합니다.') }</Li>
              <Li>{ intl.get('sponsor.prospectus.packages.desc7').d('미디어 후원의 경우, 언론 보도 및 홍보 이력이 필요합니다.') }</Li>
            </Ul>
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
