import intl from 'react-intl-universal'
import { H1, H2, Li, Paragraph, Section, Ul } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { NoticeBar } from 'components/atoms/NoticeBar'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { CORAL, CORAL_DARK, CORAL_LIGHT } from 'styles/colors'
import { StoresType } from '../_app'

@inject('stores')
@observer
export default class CFPDetailedGuide extends React.Component<{ stores: StoresType }> {
  render() {
    return (
      <PageTemplate
        header={<Header title='파이콘 성명서 :: 파이콘 한국 2019' intlKey='coc.pageTitle'/>}
        footer={<Footer />}
      >
        <H1><IntlText intlKey='coc.title'>
          파이콘 한국 성명서
        </IntlText></H1>
        <NoticeBar
            color={CORAL_LIGHT}
            borderColor={CORAL}
            textColor={CORAL}
            textLinkColor={CORAL_DARK}
            text={ intl.get('coc.notice').d('파이콘 한국 성명서는 2019년 5월 중에 업데이트될 예정입니다.') }
        />
        <Paragraph><IntlText intlKey='coc.desc1'>
          파이콘 한국(이하 파이콘)은 커뮤니티 주관으로 이뤄지는 비영리 개발자 대상 행사로,
          오픈 소스 프로그래밍 언어인 파이썬의 저변 확대와 커뮤니티 활성화를 위해 진행하는 행사입니다.
          </IntlText></Paragraph>
        <Paragraph><IntlText intlKey='coc.desc2'>
          우리는 이 행사에 참여하는 모든 파이썬 커뮤니티의 참여를 소중히 여기며, 모든 참석자분들이 즐겁고 만족스러운 시간을 보내시기를 바랍니다.
          이를 위해 모든 참석자분들에게 행사 동안 공식적으로 그리고 비공식적으로 모든 행사의 다른 참석자분들을 존중하고 서로 예의 있게 대해주실 것을 부탁드립니다.
          </IntlText> </Paragraph>
        <Paragraph><IntlText intlKey='coc.desc3'>
          사안들을 명확하게 하기 위해 모든 참석자, 발표자, 전시 참여자, 운영자와 자원봉사자는 모든 파이콘 행사에서 아래의 성명서를 따르셔야 함을 알려 드립니다.
          운영자들은 행사 기간 동안 성명서의 내용을 시행할 것입니다.
        </IntlText></Paragraph>
        {/* 목차  */}
        <Section>
          <H2><IntlText intlKey='coc.shortVersion'>요약</IntlText></H2>
          <Ul>
            <Li>
              <IntlText intlKey='coc.short1'>
                파이콘은 모든 분들이 성별, 성적 지향, 장애, 외모, 신체 사이즈, 인종, 종교에 상관없이 컨퍼런스에 참여하실 수 있도록
                최선의 노력을 다하고 있으며 어떤 형태의 차별도 허용하지 않고 있습니다.
              </IntlText>
            </Li>
            <Li>
              <IntlText intlKey='coc.short2'>
                모든 의사소통은 다양한 배경을 가진 전문적인 청중에게 적합한 것이어야 합니다.
                성적인 언어나 묘사는 대화를 포함해서 컨퍼런스의 장소 어디에서든 허용되지 않습니다.
              </IntlText>
            </Li>
            <Li>
              <IntlText intlKey='coc.short3'>
                다른 사람을 존중해 주십시오. 다른 참석자들을 모욕하거나 상처주지 마십시오. 전문가답게 행동하십시오.
                차별이나 성희롱, 인종차별, 공격적인 농담은 파이콘에서 허용되지 않습니다.
              </IntlText>
            </Li>
            <Li>
              <IntlText intlKey='coc.short4'>
                이러한 규칙을 어기는 참석자들은 운영진의 재량에 의해 행사에 더 이상 참석하실 수 없으며, 참가 비용은 환불해드리지 않습니다.
              </IntlText>
            </Li>
          </Ul>
        </Section>
        <Section>
          <H2><IntlText intlKey='coc.longVersion'>자세한 설명</IntlText></H2>
          <Ul>
            <Li>
              <IntlText intlKey='coc.long1'>
                성별, 성적 지향, 장애, 외모, 신체사이즈, 인종, 종교, 공개장소에서 성적인 묘사,
                고의적인 협박, 스토킹, 차별적인 사진이나 영상, 지속적인 행사를 방해,
                부적절한 신체접촉 등 모든 공격적인 언행 및 행동은 공격적인 행동으로 간주합니다.
              </IntlText>
            </Li>
            <Li>
              <IntlText intlKey='coc.long2'>
                누구라도 공격적인 행동을 한 사람은 그 행동을 중지해야 하며 운영진의 요청에 즉시 따라야 합니다.
              </IntlText>
            </Li>
            <Li>
              <IntlText intlKey='coc.long3'>
                발표장의 전시자들이나 스폰서, 부스 운영자 또는 모든 작은 활동 등은 차별 금지 정책에 따라야 합니다.
                특히, 전시자들은 성적 묘사, 행동 또는 다른 자료들을 사용할 수 없습니다.
                자원봉사를 포함한 부스 운영자들은 외설적인 옷이나 유니폼, 복장을 입거나 다른 성적인 상황을 만들어서는 안됩니다.
              </IntlText>
            </Li>
            <Li>
              <IntlText intlKey='coc.long4'>
                사용하는 단어에 유의해 주십시오. 성희롱, 인종 차별, 공격적인 농담은 주위 사람들에게 공격적으로 느껴질 수 있습니다.
                지나친 언행이나 공격적인 농담은 파이콘에 어울리지 않습니다.
              </IntlText>
            </Li>
            <Li>
              <IntlText intlKey='coc.long5'>
                참석자가 성명서에 위배되는 행위를 한다면, 운영진은 그 행위를 한 사람에게 경고를 하거나
                환불 없이 컨퍼런스에서 추방하는 등 필요한 행동을 취할 것입니다.
              </IntlText>
            </Li>
          </Ul>
        </Section>
        <Section>
          <H2><IntlText intlKey='coc.license'>라이센스</IntlText></H2>
          <Paragraph><IntlText intlKey='coc.licenseDesc'>
            이 성명서는 Ada Initiative와 다른 자원봉사자들에 의해 작성된 Geek Feminism wiki의 정책 예시를 기본으로 하여 작성되었습니다.
            원문은 Creative Commons Zero 라이센스를 따르고 있습니다. <a target='_blank' rel='noreferrer' href="https://github.com/pythonkr/pycon-code-of-conduct">깃허브 링크</a>
          </IntlText></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
