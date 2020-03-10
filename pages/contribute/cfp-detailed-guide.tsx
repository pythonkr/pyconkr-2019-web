import styled from '@emotion/styled'
import {
  alignCenter, ContentTableWrapper, H1, H2, H3, isBold, Li, Ol, Paragraph,
  Section, Table, TBody, Td, Th, THead, Tr, Ul
} from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { StatusBar } from 'components/atoms/StatusBar'
import { TableOfContents } from 'components/atoms/TableOfContents'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import { IntlTextType } from 'pages/contribute/proposing-a-talk'
import React from 'react'
import intl from 'react-intl-universal'
import { contributionMenu, paths } from 'routes/paths'
import { isEmpty } from 'utils/isEmpty'
import { StoresType } from '../_app'

export type IndexPagePropsType = {
  stores: StoresType;
}

const DetailGuideWrapper = styled.div`
  section {
    margin: 140px 0;
  }
  h2 {
    font-size: 32px;
    margin-bottom: 54px;
  }
`

const outline = [{
  id: 'contribute.cfpGuide.notice.title',
  title: '발표자를 위한 안내',
  children: [{
    id: 'contribute.cfpGuide.notice.record.title',
    title: '발표 녹화'
  }, {
    id: 'contribute.cfpGuide.notice.pays.title',
    title: 'Everybody Pays'
  }, {
    id: 'contribute.cfpGuide.notice.vote.title',
    title: '선호도 투표'
  }, {
    id: 'contribute.cfpGuide.notice.communication.title',
    title: '지속적인 협의'
  }]
}, {
  id: 'contribute.cfpGuide.beforeProposal.title',
  title: '제안서를 작성하기 전에'
}, {
  id: 'contribute.cfpGuide.selectTopic.title',
  title: '주제 선정'
}, {
  id: 'contribute.cfpGuide.proposalType.title',
  title: '좋은 제안과 나쁜 제안',
  children: [{
    id: 'contribute.cfpGuide.proposalType.good.title',
    title: '좋은 제안'
  }, {
    id: 'contribute.cfpGuide.proposalType.bad.title',
    title: '나쁜 제안'
  }]
}, {
  id: 'contribute.cfpGuide.difficulty.title',
  title: '대상 청중 (난이도)를 정하는 방법',
  children: [{
    id: 'contribute.cfpGuide.difficulty.beginner.title',
    title: '초보'
  }, {
    id: 'contribute.cfpGuide.difficulty.intermediate.title',
    title: '중급'
  }, {
    id: 'contribute.cfpGuide.difficulty.experienced.title',
    title: '고급'
  }]
}]

const cfpFormTable = [{
  title: {
    defaultText: '주제',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.title.title'
  }
}, {
  title: {
    defaultText: '카테고리',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.category.title'
  },
  desc: {
    defaultText: <a href='#contribute.cfpGuide.selectTopic.title'>카테고리 목록 보기</a>,
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.category.desc'
  }
}, {
  title: {
    defaultText: '대상 청중 (난이도)',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.audience.title'
  },
  desc: {
    defaultText: '초보 / 중급 / 고급',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.audience.desc'
  }
}, {
  title: {
    defaultText: '필요한 선수 지식',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.knowledge.title'
  },
  desc: {
    defaultText: '예) 파이썬으로 웹서비스를 만들어본 경험이 있으면 발표를 듣는데 도움이 됩니다',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.knowledge.desc'
  }
}, {
  title: {
    defaultText: '예상 발표 시간',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.timeslot.title'
  },
  desc: {
    defaultText: '25분 / 40분',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.timeslot.desc'
  }
}, {
  title: {
    defaultText: '발표 언어',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.language.title'
  },
  desc: {
    defaultText: '한국어 / 영어',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.language.desc'
  }
}, {
  title: {
    defaultText: '상세한 발표 내용',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.detail.title'
  }
}, {
  title: {
    defaultText: '참고 및 질문 사항',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.note.title'
  },
  desc: {
    defaultText: '오직 파이콘 준비위원회에만 공개되는 항목이니 자유롭게 작성해주셔도 괜찮습니다',
    intlKey: 'contribute.cfpGuide.beforeProposal.information.item.note.desc'
  },
  review: false,
}]

const getTitleStr = (title: IntlTextType) => {
  if (title) {
    return intl.get(title.intlKey).d(title.defaultText)
  }

  return ''
}

const getDescStr = (desc: IntlTextType) => {
  if (desc) {
    return intl.get(desc.intlKey).d(desc.defaultText)
  }

  return '-'
}

@inject('stores')
@observer
export default class CFPDetailedGuide extends React.Component<{ stores: StoresType }> {
  render() {
    const { stores } = this.props
    const { presentationProposalStartAt,  presentationProposalFinishAt} = stores.scheduleStore.schedule

    return (
      <PageTemplate
        header={<Header title='발표안 작성 가이드 :: 파이콘 한국 2019' intlKey='contribute.cfpGuide.pageTitle'/>}
        footer={<Footer />}
      >
        <LocalNavigation list={contributionMenu.submenu} />
        <DetailGuideWrapper>
          <H1><IntlText intlKey='contribute.cfpGuide.title'>
            발표안 작성 가이드
            </IntlText></H1>
          <StatusBar
            titleIntlKey='contribute.talkProposal.title'
            actionIntlKey='common.apply'
            link={paths.contribute.proposingATalk}
            openDate={presentationProposalStartAt}
            closeDate={presentationProposalFinishAt}
          />
          <Paragraph><IntlText intlKey='contribute.cfpGuide.intro'>
            본 글은 파이콘 한국의 발표자로 지원해주신 분들에게 보다 상세한 도움을 드리고자 준비하였습니다.
            아래의 도움말을 통해 여러분의 발표 제안서가 더 설득력 있고 충분한 정보를 전달할 수 있게 되기를 바랍니다.
            </IntlText></Paragraph>
          <TableOfContents outline={outline} />
          <Section>
            <H2 id='contribute.cfpGuide.notice.title'>
              <IntlText intlKey='contribute.cfpGuide.notice.title'>
                발표자를 위한 안내
              </IntlText>
            </H2>
            <H3 id='contribute.cfpGuide.notice.record.title'>
              <IntlText intlKey='contribute.cfpGuide.notice.record.title'>
                발표 녹화
              </IntlText>
            </H3>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.notice.record.content'>
              파이콘 한국의 모든 발표 내용은 녹화 후 공개될 예정입니다.
              따라서 발표 제안서를 작성하시기 전에 이 점을 염두에 두시기 바랍니다.
            </IntlText></Paragraph>
            <H3 id='contribute.cfpGuide.notice.pays.title'>
              <IntlText intlKey='contribute.cfpGuide.notice.pays.title'>
                Everybody Pays
              </IntlText>
            </H3>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.notice.pays.content'>
              파이콘은 커뮤니티의 자발적인 도움으로 치러지는 행사입니다.
              발표자를 위한 물질적인 혜택(강연료, 무료 티켓 등)을 제공해드릴 수 없는 점 양해 부탁드립니다.
              이와 관련하여 <a
              href='http://blog.pycon.kr/2017/06/14/everybody-pays/'
              target='_blank'
              rel='noreferrer'
            >파이콘의 철학인 ‘Everybody Pays’에 대한 내용을 담고 있는 글</a>을 참고해주세요.
            </IntlText></Paragraph>
            <H3 id='contribute.cfpGuide.notice.vote.title'>
              <IntlText intlKey='contribute.cfpGuide.notice.vote.title'>
                선호도 투표
            </IntlText>
            </H3>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.notice.vote.content'>
              1차로 선정된 발표 내용은 얼리버드 구매자들을 대상으로 선호도 투표가 진행됩니다.
              선호도 투표는 순수하게 발표 내용만을 공개하여 진행하며 발표자 개인에 대한 내용은 비공개로 진행됩니다.
              파이콘 한국 준비위원회의 프로그램팀은 선호도 투표 결과를 참고하여
              최대한 다양한 참가자들이 즐길 수 있는 행사가 되도록 최종 발표자를 선정합니다.
            </IntlText></Paragraph>
            <H3 id='contribute.cfpGuide.notice.communication.title'>
              <IntlText intlKey='contribute.cfpGuide.notice.communication.title'>
                지속적인 협의
              </IntlText>
            </H3>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.notice.communication.content'>
              마지막으로, 발표 제안서를 제출하신 순간부터 최종 확정이 될 때까지 필요에 따라
              프로그램 팀과 발표 내용에 대한 지속적인 협의가 있을 수 있다는 점을 참고해주시기 바랍니다.
              마감일에 맞추어 제안서를 제출하시기보다는 미리 여유 있게 제안서를 제출해주시면
              충분한 협의를 통해 더 효과적인 발표를 함께 만들 수 있습니다.
            </IntlText></Paragraph>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.notice.conclusion'>
              안내 사항을 모두 읽어보셨다면, 이제 본격적인 제안서 작성을 시작해볼까요?
            </IntlText></Paragraph>
          </Section>
          <Section>
            <H2 id='contribute.cfpGuide.beforeProposal.title'>
              <IntlText intlKey='contribute.cfpGuide.beforeProposal.title'>
                제안서를 작성하기 전에
              </IntlText>
            </H2>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.beforeProposal.consider.description'>
              제안서를 작성하기 전 생각해보아야 할 사항은 아래와 같습니다.
            </IntlText></Paragraph>
            <Ul>
              <Li><IntlText intlKey='contribute.cfpGuide.beforeProposal.consider.item1'>
                주제는 무엇인가요?
              </IntlText></Li>
              <Li><IntlText intlKey='contribute.cfpGuide.beforeProposal.consider.item2'>
                대상 청중은 누구인가요?
              </IntlText></Li>
              <Li><IntlText intlKey='contribute.cfpGuide.beforeProposal.consider.item3'>
                발표를 통해서 청중이 어떤 것을 얻을 수 있나요?
              </IntlText></Li>
              <Li><IntlText intlKey='contribute.cfpGuide.beforeProposal.consider.item4'>
                시간을 어떻게 배분할 것인가요?
              </IntlText></Li>
            </Ul>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.beforeProposal.information.description'>
              또, 제안서에 채워야 하는 항목은 아래와 같습니다.
            </IntlText></Paragraph>
            <ContentTableWrapper>
              <Table>
                <colgroup>
                  <col width='33%'/>
                  <col width='34%'/>
                  <col width='33%'/>
                </colgroup>
                <THead>
                  <Tr>
                    <Th>{intl.get('contribute.cfpGuide.beforeProposal.information.header.item').d('항목')}</Th>
                    <Th>{intl.get('contribute.cfpGuide.beforeProposal.information.header.description').d('내용') }</Th>
                    <Th className={alignCenter}>
                      {intl.get('contribute.cfpGuide.beforeProposal.information.header.visibility').d('선호도 투표 시 공개 여부')}
                    </Th>
                  </Tr>
                </THead>
                <TBody>
                  {cfpFormTable.map(({ title, desc, review = true }) => {
                    return (
                    <Tr key={getTitleStr(title)}>
                      <Td className={isBold}>{getTitleStr(title)}</Td>
                      <Td>{getDescStr(desc)}</Td>
                      <Td className={alignCenter}>{review ?  '✅' : '❌'}</Td>
                    </Tr>)
                  }
                  )}
                </TBody>
              </Table>
            </ContentTableWrapper>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.beforeProposal.conclusion'>
              고려해야 할 부분들이 다소 어렵게 느껴지시나요?
              안내문은 이제 시작이니 겁내지 마세요.
              조금 더 상세한 설명과 함께 제안서를 작성해보세요.
            </IntlText></Paragraph>
          </Section>
          <Section>
            <H2 id='contribute.cfpGuide.selectTopic.title'>
              <IntlText intlKey='contribute.cfpGuide.selectTopic.title'>
                주제 선정
              </IntlText>
            </H2>
            {!isEmpty(this.props.stores.cfpStore.categories) && <>
              <Paragraph><IntlText intlKey='contribute.cfpGuide.selectTopic.description'>
                파이콘 한국 2019에서는 아래와 같이 여러 가지 분야(카테고리)의 발표를 모집하고 있습니다.
              </IntlText></Paragraph>
              {this.props.stores.cfpStore.categories.slice().reverse().map(category =>
                <Li key={category.name}>{category.name}</Li>
              )}
            </>}
            <Paragraph><IntlText intlKey='contribute.cfpGuide.selectTopic.description'>
              어떤 주제를 선정할지 감이 안 잡힌다면
              기존에 진행된 파이콘 행사에서 발표된 주제들을 둘러보세요.
              발표 주제뿐만 아니라 발표 슬라이드도 참고해서 청중에게 들려주고 싶고 흥미로운 주제를 선정해보세요.
            </IntlText></Paragraph>
            <Ul>
              <Li><a target='_blank' href='https://archive.pycon.kr/2018/' rel='noreferrer'>
                PyCon Korea 2018
              </a></Li>
              <Li><a target='_blank' rel='noreferrer' href='https://archive.pycon.kr/2017/'>
                PyCon APAC 2017
              </a></Li>
              <Li><a target='_blank' rel='noreferrer' href='https://archive.pycon.kr/2016/'>
                PyCon Korea 2016
              </a></Li>
              <Li><a target='_blank' rel='noreferrer' href='https://archive.pycon.kr/2015/'>
                PyCon Korea 2015
              </a></Li>
              <Li><a target='_blank' rel='noreferrer' href='https://archive.pycon.kr/2014/'>
                PyCon Korea 2014
              </a></Li>
              <Li><a target='_blank' rel='noreferrer' href='http://www.pycon.org/'>
                <IntlText intlKey='contribute.cfpGuide.selectTopic.viewOtherPycon'>
                  각국 파이콘 행사 보기 👉
                </IntlText>
              </a></Li>
            </Ul>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.selectTopic.conclusion'>
              주제를 선정했다면 이제 제안서에 채워야 할 내용들을 더 구체적으로 생각해볼 수 있습니다.
              아래의 도움말을 참고해보세요
            </IntlText></Paragraph>
          </Section>
          <Section>
            <H2 id='contribute.cfpGuide.proposalType.title'>
              <IntlText intlKey='contribute.cfpGuide.proposalType.title'>
                좋은 제안과 나쁜 제안
              </IntlText>
            </H2>
            <H3 id='contribute.cfpGuide.proposalType.good.title'>
              <IntlText intlKey='contribute.cfpGuide.proposalType.good.title'>
                좋은 제안 👍
              </IntlText>
            </H3>
            <Ol>
              <Li>
                {
                  intl.get('contribute.cfpGuide.proposalType.good.item1')
                    .defaultMessage('요약과 설명 부분에는 아래와 같은 내용을 써주세요.')
                }
                <ul>
                  <Li>
                  {
                    intl.get('contribute.cfpGuide.proposalType.good.item1-1')
                      .defaultMessage('발표를 듣기 위해 어떤 사전 지식이 필요한가요?')
                  }
                  </Li>
                  <Li>
                    {
                      intl.get('contribute.cfpGuide.proposalType.good.item1-1')
                        .defaultMessage('청중이 이 발표를 듣고 얻게 되는 것은 무엇인가요?')
                    }
                  </Li>
                </ul>
              </Li>
              <Li>
                {
                  intl.get('contribute.cfpGuide.proposalType.good.item2')
                    .defaultMessage('발표가 진행되는 순서와 예상 시간을 적어주세요.')
                }
              </Li>
              <Li>
                {
                  intl.get('contribute.cfpGuide.proposalType.good.item3')
                    .defaultMessage('주제가 일반적인 Python 사용자들에게 익숙하지 않다면 이해를 돕기 위한 블로그 주소나 위키, 소스 코드 등을 추가해주세요.')
                }
              </Li>
            </Ol>
            <H3 id='contribute.cfpGuide.proposalType.bad.title'>
              <IntlText intlKey='contribute.cfpGuide.proposalType.bad.title'>
                나쁜 제안 🙅‍️
              </IntlText>
            </H3>
            <Ol>
              <Li>
                {
                  intl.get('contribute.cfpGuide.proposalType.bad.item1')
                    .defaultMessage(
                      `단순 정보 공유를 위한, 가령 여러분의 제품을 알리거나 어떻게 사용하는지에 대한 발표는 지양해주세요. 하지만 회사에서 개발 이슈를 해결한 사례,
                      청중에게 도움이 되는 오픈소스 프로젝트에 대한 내용은 환영합니다.`
                    )
                }
              </Li>
              <Li>
                {
                  intl.get('contribute.cfpGuide.proposalType.bad.item2')
                    .defaultMessage('제안서는 늘 자세하고 완성되어 있어야 합니다. 미완성의 제안서는 좋은 인상을 주지 못합니다.')
                }
              </Li>
            </Ol>
          </Section>
          <Section>
            <H2 id='contribute.cfpGuide.difficulty.title'>
              <IntlText intlKey='contribute.cfpGuide.difficulty.title'>
                대상 청중(난이도)을 정하는 방법
              </IntlText>
            </H2>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.difficulty.desc1'>
              좋은 발표는 특정 Python 레벨과 대상 청중에게 알맞은 발표입니다.
            </IntlText></Paragraph>
            <Ul>
              <Li><IntlText intlKey='contribute.cfpGuide.difficulty.desc1-1'>
                Cython을 사용하여 C 코드 블럭이 실행될 때 GIL을 해제하여 성능 이슈를 해결하는 방법에 대한 내용을
                초보자/중급자를 위한 발표라고 표시하는 것은 좋지 않습니다.
              </IntlText></Li>
              <Li><IntlText intlKey='contribute.cfpGuide.difficulty.desc1-2'>
                반대로, Cython에 대한 소개나 GIL에 대한 설명은 고급 사용자를 위한 발표로 적절하지 않습니다.
              </IntlText></Li>
            </Ul>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.difficulty.desc2'>
              위와 같이 명백한 경우가 있는 반면에 대상 레벨을 정하기 애매한 내용들도 분명 있습니다.
              대상 레벨을 정하기 어려운 분들을 위해 간단한 가이드라인을 제시해드리고자 합니다.
            </IntlText></Paragraph>

            <H3 id='contribute.cfpGuide.difficulty.beginner.title'>
              <IntlText intlKey='contribute.cfpGuide.difficulty.beginner.title'>초보</IntlText>
            </H3>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.difficulty.beginner.desc1'>
              Python에 대한 지식이 전혀 없거나 생소합니다. Python의 기본적인 문법이나 흐름에 대한 지식은 가지고 있으나,
              표준 라이브러리 모듈 중에는 모르는 것도 많으며 프로그래밍 전반에 대한 이해가 깊지 않습니다.
            </IntlText></Paragraph>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.difficulty.beginner.desc2'>
              초보 레벨을 위한 발표 주제로는 Python을 배운 경험, 중급 사용자로 거듭나기 위해 필요한 Python 프로그래밍 스킬 등의 내용이 적당합니다.
              Pandas나 Django와 같은 Python 기본 내장 패키지가 아닌 패키지에 대한 내용은 초보자를 위한 것이 아닙니다.
            </IntlText></Paragraph>

            <H3 id='contribute.cfpGuide.difficulty.intermediate.title'>
              <IntlText intlKey='contribute.cfpGuide.difficulty.intermediate.title'>중급</IntlText>
            </H3>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.difficulty.intermediate.desc1'>
              Python을 배운지 오래되지 않아 Python이 어떻게 활용될 수 있는지를 알고 싶어 합니다.
              혹은, 파이썬을 오랫동안 사용했지만 다양한 활용 분야에 대한 경험이 부족합니다. 여러 분야에서 활용되는 내용들을 다룰 수 있습니다.
            </IntlText></Paragraph>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.difficulty.intermediate.desc2'>
              중급 레벨을 위한 발표 주제로는 웹 프레임워크 사용, 기계 학습, 웹 트래픽 모니터링, 자동화 등의 이야기가 선정될 수 있습니다.
              중급 레벨 대상의 제안서는 제안서 검토 후 초보자용 또는 고급자용 레벨로 조정 요청을 드릴 수 있다는 것을 알아두시기 바랍니다.
            </IntlText></Paragraph>

            <H3 id='contribute.cfpGuide.difficulty.experienced.title'>
              <IntlText intlKey='contribute.cfpGuide.difficulty.experienced.title'>고급</IntlText>
            </H3>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.difficulty.experienced.desc1'>
              Python 기술에 익숙하고 일반적인 프로그래밍 개념이 잘 갖춰져있습니다.
              중급과 고급의 가장 큰 차이는 고급자용은 더 많은 해당 분야의 전문 지식을 요구한다는 점입니다.
            </IntlText></Paragraph>
            <Paragraph><IntlText intlKey='contribute.cfpGuide.difficulty.experienced.desc2'>
              고급 레벨을 위한 발표 주제로는 최적화나 Tool의 내부 동작에 대한 내용 또는 Python의 내부 구현에 대한 내용이 적당합니다.
            </IntlText></Paragraph>
          </Section>
        </DetailGuideWrapper>
      </PageTemplate >
    )
  }
}
