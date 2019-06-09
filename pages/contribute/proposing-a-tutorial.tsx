import { Button } from 'components/atoms/Button'
import {
  ContentButtonWrapper, ContentTableWrapper, H1, H2, isBold, Paragraph, ScheduleTable,
  Section, TBody, Td, Tr
} from 'components/atoms/ContentWrappers'
import {
  IntlText
} from 'components/atoms/IntlText'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import intl from 'react-intl-universal'
import { contributionMenu, paths } from 'routes/paths'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'
import { StatusBar } from '../../components/atoms/StatusBar'
import { StoresType } from '../_app'

@inject('stores')
@observer
export default class CFPDetailedGuide extends React.Component<{ stores: StoresType }> {
  render() {
    const { tutorialProposalStartAt, tutorialProposalFinishAt, tutorialProposalAnnounceAt } = this.props.stores.scheduleStore.schedule

    const schedule = [{
      title: '튜토리얼 제안 모집 시작',
      intlKey: 'contribute.tutorial.schedule.open',
      date: tutorialProposalStartAt
    }, {
      title: '튜토리얼 제안 마감',
      intlKey: 'contribute.tutorial.schedule.deadline',
      date: tutorialProposalFinishAt
    }, {
      title: '튜토리얼 프로그램 발표',
      intlKey: 'contribute.tutorial.schedule.announce',
      date: tutorialProposalAnnounceAt
    }]

    return (
      <PageTemplate
        header={<Header title='튜토리얼 제안하기 :: 파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <LocalNavigation list={contributionMenu.submenu} />
        <H1><IntlText intlKey='contribute.tutorial.title'>
          튜토리얼 제안하기
        </IntlText></H1>
        <StatusBar
          titleIntlKey='contribute.tutorial.title'
          actionIntlKey='common.recommend'
          link={paths.contribute.proposingATutorial}
          openDate={tutorialProposalStartAt}
          closeDate={tutorialProposalFinishAt}
        />
        <Paragraph><IntlText intlKey='contribute.tutorial.description1'>
          파이콘 한국 2019에서 튜토리얼을 진행해주실 분들의 제안을 기다리고 있습니다. 튜토리얼은 초보자들뿐 아니라 숙련자들도 포함하여 새로운 파이썬 기술을 접하는 사람들을 위해 진행하는 교육 프로그램입니다.
        </IntlText></Paragraph>
        <Paragraph><IntlText intlKey='contribute.tutorial.description2'>
          {/*튜토리얼에서는 2~4시간 동안 파이썬에 대한 새로운 기술이나 라이브러리를 참여자들에게 직접 알려줍니다. 참여자가 직접 컴퓨터를 가져와서 실습하며, 현장에서 질문하고 해결하는 만큼 발표 세션보다는 해당 기술에 대해 좀 더 깊게 소개할 수 있습니다. 진행하시는 분들과 보조 진행자 분들께는 소정의 금액을 지급해드립니다.*/}
          튜토리얼에서는 파이썬에 대한 새로운 기술이나 라이브러리를 참여자들에게 직접 알려줍니다. 참여자가 직접 컴퓨터를 가져와서 실습하며, 현장에서 질문하고 해결하는 만큼 발표 세션보다는 해당 기술에 대해 좀 더 깊게 소개할 수 있습니다. 진행하시는 분들과 보조 진행자 분들께는 소정의 금액을 지급해드립니다.
        </IntlText></Paragraph>
        <Paragraph><IntlText intlKey='contribute.tutorial.description3'>
          여러분들의 경험과 지식을 새로운 방법으로 공유할 수 있는 좋은 기회입니다. 교육에 관심이 있는 분들은 튜토리얼 진행자로 많이 지원해주시기 바랍니다.
        </IntlText></Paragraph>
        <Section>
          <H2><IntlText intlKey='contribute.tutorial.eventDate.title'>프로그램 일시 및 장소</IntlText></H2>
          <Paragraph style={{ fontWeight: 700, marginBottom: 0 }}><IntlText intlKey='contribute.tutorial.eventDate.date'>
            2019년 8월 16일 (금)
          </IntlText></Paragraph>
          <Paragraph style={{ fontWeight: 700, marginBottom: 0, marginTop: 5 }}>
            10:00-18:00
          </Paragraph>
          <Paragraph style={{ marginTop: 5 }}><IntlText intlKey='contribute.tutorial.eventDate.venue'>
            코엑스 그랜드볼룸 2층
          </IntlText></Paragraph>
          <ContentButtonWrapper>
            <Button
              intlKey='contribute.tutorial.proposeButton'
              to='https://forms.gle/XXGMVASUNMqT3mDL8'
              outlink
            >튜토리얼 제안하기</Button>
          </ContentButtonWrapper>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.schedule'>모집 일정</IntlText></H2>
          <ContentTableWrapper>
            <ScheduleTable>
              <TBody>
                {schedule.map(({ title, date, desc, intlKey }) =>
                  <Tr key={title}>
                    <Td className={isBold}>{intl.get(intlKey).d(title)}</Td>
                    <Td>
                      {
                        desc ?
                        <IntlText intlKey={desc.intlKey}>{desc.defaultText}</IntlText>
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
          <H2>FAQ</H2>
          <Paragraph>
            <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 튜토리얼은 몇 시간 동안 진행하나요?</strong>
            A. 최소 2시간, 최대 8시간까지 진행이 가능하며 프로그램 진행과 적절한 시간을 직접 결정하셔서 진행해주시면 됩니다.
          </Paragraph>
          <Paragraph>
            <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 꼭 파이썬과 관련된 내용이어야 하나요?</strong>
            A. 네, 파이콘의 큰 목적 중 하나가 파이썬 커뮤니티에 도움을 주는 것이므로 튜토리얼에서는 파이썬과 관련된 내용을 다룹니다. 혹시 다른 언어와 관련된 프로젝트를 진행하고 싶다면 스프린트 제안을 기다려주세요! :)
          </Paragraph>
          <Paragraph>
            <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 어떤 내용을 하면 좋을지 감이 안 와요.</strong>
            A. 기존 프로그램들을 살펴보면 어떨까요? <br />
            - <a href='https://archive.pycon.kr/2018/program/tutorial/'>파이콘 한국 2018 튜토리얼 프로그램</a><br />
            - <a href='https://archive.pycon.kr/2017/program/tutorials/'>파이콘 한국 2017 튜토리얼 프로그램</a><br />
            - <a href='https://us.pycon.org/2019/schedule/tutorials/list/'>PyCon US 2019</a><br />
            - <a href='http://blog.pycon.kr/2017/07/11/tutorial-and-sprint/'>스프린트/튜토리얼의 대장이 되어보자</a><br />
          </Paragraph>
          <Paragraph>
            <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 기업에서도 튜토리얼을 진행할 수 있나요?</strong>
            A. 네, 기업에서도 튜토리얼을 진행할 수 있습니다. 단, 기업에서 제공하는 서비스나 기술과 관련된 튜토리얼의 경우 일정 금액을 파이콘 한국에 후원하는 형태로 진행합니다.<br/>
            파이콘 한국은 파이썬 사용자들을 모아 기술을 보급하고 다시 돌려주는 역할을 하고 있습니다. 튜토리얼 프로그램에서는 이 역할을 위하여 공간과 편의 사항 등을 제공합니다. 그러므로 기업의 기술 보급을 위한 목적으로 튜토리얼을 진행할 경우, 일정 비용을 지급하여 파이콘에서 공간과 편의를 제공받고 참가자들에게 해당 기술을 보급하게 됩니다. 파이콘 한국 준비위원회는 제공된 금액을 사용하여 다시 파이썬 개발자들에게 혜택을 주고 있습니다. 물론 해당 기술은 파이썬을 사용하거나 파이썬에 연관된 것이어야 합니다.<br/>
            개인, 개발그룹이나 비영리 단체가 아닌 모든 주체는 기업으로 간주됩니다. 특정 기술이나 플랫폼을 제공하는 회사의 유저 그룹도 해당 회사의 지원을 받고 있다면 기업과 같이 간주합니다.<br/>
            기업 튜토리얼 진행 관련 문의는 program@pycon.kr로 메일주시기 바랍니다.
          </Paragraph>
          <Paragraph>
            <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 튜토리얼 참가자는 컨퍼런스 티켓을 구매해야 하나요?</strong>
            A. 아니요, 파이콘 한국 컨퍼런스 티켓을 구매하지 않더라도 참가가 가능합니다. (반대로 말하면, 컨퍼런스 티켓에는 튜토리얼 참가가 포함되어 있지 않습니다.)
          </Paragraph>
          <Paragraph>
            <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 튜토리얼 참가 비용을 받나요?</strong>
            A. 네, 노쇼 방지를 위한 최소한의 금액을 받고 있습니다. 참고로 2018년에는 1시간당 5천원이었습니다. (예: 2시간의 튜토리얼은 참가비 1만원)
          </Paragraph>
          <Paragraph>
            <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 참가 비용은 어떻게 쓰이나요?</strong>
            {/*A. 참가 비용은 파이콘 한국에서 준비한 예산과 합쳐져 튜토리얼 진행자 분들의 수고비로 사용됩니다. 1 튜터, 1 튜토리얼 세션 당 20만원을 드립니다. 보조 진행자 분들께는 5만원이 지급되며, 모든 분들께 세금 신고를 위한 신분증을 요청드립니다. 기업 튜토리얼의 경우 세션 내용에 따라 별도로 협의를 거칩니다.*/}
            A. 참가 비용은 파이콘 한국에서 준비한 예산과 합쳐져 튜토리얼 진행자 분들의 수고비 및 장소대관료 등으로 사용됩니다. 1 튜터, 1 튜토리얼 세션 당 (구체적인 내용은 제안 시작일 함께 공개됩니다) 지급되며 모든 분들께 세금 신고를 위한 신분증을 요청드립니다. 기업 튜토리얼의 경우 세션 내용에 따라 별도로 협의를 거칩니다.
          </Paragraph>
          <Paragraph>
            <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 보조 진행자는 어떻게 선정하나요?</strong>
            A. 튜토리얼 진행에 도움을 주시는 보조 진행자 분들은 메인 튜터가 직접 모집해주시면 됩니다. 필요한 보조 진행자의 인원은 세션의 주제와 진행 방식에 따라 달라질 수 있으므로 튜토리얼 제안을 받은 후 메일을 통해 협의하게 됩니다.
          </Paragraph>
          <Paragraph>
            <strong style={{ fontWeight: 'bold', display: 'block' }}>Q. 튜토리얼 참가자 신청은 언제 어떻게 받나요?</strong>
            A. 6월 말에 홈페이지 티켓 메뉴를 통해서 신청받을 예정입니다. 자세한 일정은 추후 공지됩니다.
          </Paragraph>
          <ContentButtonWrapper>
            <Button
              intlKey='contribute.tutorial.proposeButton'
              to='https://forms.gle/XXGMVASUNMqT3mDL8'
              outlink
            >튜토리얼 제안하기</Button>
          </ContentButtonWrapper>
        </Section>
        <Section>
          <H2><IntlText intlKey='common.contact'>문의</IntlText></H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
