import { H1, H2, Li, Ol, Paragraph, Section, Ul } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import React from 'react'

export default class ProposingATalk extends React.Component {
  render() {
    return (
      <PageTemplate
        header={<Header title='이용 약관 :: 파이콘 한국 2019' intlKey='termOfService.pageTitle'/>}
        footer={<Footer />}
      >
        <H1><IntlText intlKey='termOfService.heading'>
          후원사 약관
        </IntlText></H1>
        <Section>
          <H2>0. <IntlText intlKey='termOfService.title0'>목적</IntlText></H2>
          <Paragraph><IntlText intlKey='termOfService.paragraph0'>
            {`본 약관은 <사단법인 파이썬사용자모임>(이하 ‘회사') 에서 제공하는 "서비스" 를 이용함에 있어
            회사와 이용자의 관계와 본 약관은 이용자가 서비스를 이용하는 데 필요한 권리, 의무 및 책임사항, 이용조건 및 절차 등
            기본적인 사항을 규정하고 있으므로 회원가입을 통해 본 서비스의 회원이 될 경우 본 약관 및 관련 운영 정책을 동의하신 것으로 봅니다.`}
          </IntlText></Paragraph>
        </Section>
        <Section>
          <H2>1. <IntlText intlKey='termOfService.title1'>약관의 동의와 변경</IntlText></H2>
          <Ol>
            <Li><IntlText intlKey='termOfService.paragraph1-1'>
              본 약관은 회사가 회원가입과 제공하는 서비스 내 안내 페이지에서 공지하고, 본 약관에 동의한 여러분 모두에게 그 효력이 발생합니다.
            </IntlText></Li>
            <Li><IntlText intlKey='termOfService.paragraph1-2'>
              회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.
              본 약관이 변경되는 경우 회사는 변경 사항을 시행일자 14일 전부터 공지하는 것을 원칙으로 합니다.
            </IntlText></Li>
            <Li><IntlText intlKey='termOfService.paragraph1-3'>
              회사가 공지를 하면서 공지 또는 통지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면
              승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 여러분의 의사표시가 없는 경우에는 변경된 약관을 승인한 것으로 봅니다.
              여러분이 개정약관에 동의하지 않을 경우 여러분은 제13조 제1항에 따라 이용계약을 해지할 수 있습니다.
            </IntlText></Li>
          </Ol>
        </Section>
        <Section>
          <H2>2. <IntlText intlKey='termOfService.title2'>계약의 성립</IntlText></H2>
          <Paragraph><IntlText intlKey='termOfService.paragraph2'>
            이용자가 회원가입을 통해 본 서비스의 회원이 될 경우 본 약관 및 관련 운영 정책을 동의하신 것으로 보고 약관이 체결됩니다.
          </IntlText></Paragraph>
          <Ol>
            <Li>
              <IntlText intlKey='termOfService.paragraph2-1'>
                "서비스" 는 이용자가 다음 각 호에 해당하면 승낙하지 않을 수 있습니다.
              </IntlText>
              <Ul>
                <Li><IntlText intlKey='termOfService.paragraph2-1-1'>
                  신청 내용에 허위 내용이 있는 경우
                </IntlText></Li>
                <Li><IntlText intlKey='termOfService.paragraph2-1-2'>
                  기타 서비스 사용에 참가하는 경우가 내부 약관을 위반하는 경우
                </IntlText></Li>
              </Ul>
            </Li>
            <Li><IntlText intlKey='termOfService.paragraph2-2'>
              "서비스"의 승낙의 의사표시에는 이용자의 구매 신청에 대한 확인 및 판매가능 여부, 구매신청의 정정 취소 등에 관한 정보 등을 포함하여야 합니다.
            </IntlText></Li>
          </Ol>
        </Section>
        <Section>
          <H2>3. <IntlText intlKey='termOfService.title3'>개인정보 보호</IntlText></H2>
          <Paragraph><IntlText intlKey='termOfService.paragraph3'>
            "서비스" 는 이용자를 위한 서비스 제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.
            회사는 이용자의 개인정보를 보호하고 분쟁을 완화하기 위해 회사에서 수립한 개인정보보호정책을 따릅니다.
          </IntlText></Paragraph>
        </Section>
        <Section>
          <H2>4. <IntlText intlKey='termOfService.title4'>서비스의 중단</IntlText></H2>
          <Ol>
            <Li><IntlText intlKey='termOfService.paragraph4-1'>
              "회사" 는 사업 종목의 전환, 사업의 포기, 업체 간의 통합 등 또는 기술적인 이유로 서비스의 전체 또는 일부를 변경, 중단할 수 있습니다.
            </IntlText></Li>
            <Li><IntlText intlKey='termOfService.paragraph4-2'>
              서비스의 변경 또는 중단이 있는 경우에는 내용 및 사유와 일자 등은 그 변경 또는 중단 전에 회사에서 운영하는 서비스 내
              공지사항 화면 등 회원이 충분히 인지할 수 있는 방법으로 7일의 기간을 두고 사전에 공지합니다.
            </IntlText></Li>
          </Ol>
        </Section>
        <Section>
          <H2>5. <IntlText intlKey='termOfService.title5'>회원 탈퇴 및 자격 상실</IntlText></H2>
          <Ol>
            <Li><IntlText intlKey='termOfService.paragraph5-1'>
              회원은 언제든지 "서비스"에 탈퇴를 요청할 수 있으며 "서비스"는 접수일로부터 7일 이내 회원 탈퇴를 처리합니다.
            </IntlText></Li>
            <Li>
              <IntlText intlKey='termOfService.paragraph5-2'>
                회원이 다음 각 호의 사유에 해당하는 경우, "서비스" 는 회원 자격을 제한/정지시킬 수 있습니다.
              </IntlText>
              <Ul>
                <Li><IntlText intlKey='termOfService.paragraph5-2-1'>
                  가입 신청 시에 허위 내용을 등록한 경우
                </IntlText></Li>
                <Li><IntlText intlKey='termOfService.paragraph5-2-2'>
                  다른 사람의 "서비스" 이용을 방해하거나 그 정보를 도용하는 등 질서를 위협하는 경우
                </IntlText></Li>
                <Li><IntlText intlKey='termOfService.paragraph5-2-3'>
                  "서비스" 를 이용하여 법령 또는 이 약관이 금지하거나 반하는 행위를 하는 경우
                </IntlText></Li>
              </Ul>
            </Li>
          </Ol>
        </Section>
        <Section>
          <H2>6. <IntlText intlKey='termOfService.title6'>환급</IntlText></H2>
          <Paragraph><IntlText intlKey='termOfService.paragraph6'>
            "서비스" 는 이용자가 구매 신청한 서비스가 어떠한 사유로 제공을 할 수 없을 때에는 지체 없이 그 사유를 이용자에게 통지하고
            사전에 30일 이내 환급에 필요한 조치를 취합니다.
          </IntlText></Paragraph>
        </Section>
        <Section>
          <H2>7. <IntlText intlKey='termOfService.title7'>이용자의 의무와 책임</IntlText></H2>
          <Ol>
            <Li><IntlText intlKey='termOfService.paragraph7-1'>
              회사는 회원이 본 약관에 위반하는 형태로 본 서비스를 이용하고 있다고 판단되는 경우, 회사에 적절하다고 판단하는 조치를 취합니다.
              다만 회사는 이러한 위반 행위를 방지 또는 시정할 의무를 갖지 않습니다.
            </IntlText></Li>
            <Li>
              <IntlText intlKey='termOfService.paragraph7-2'>
                아래의 사례를 포함한 여러가지 이유로 이용자가 제3자로 부터 클레임을 받아 회사가 직접적 혹은 간접적으로
                어떤 손해(변호사 비용 부담을 포함)를 입었을 경우, 이용자는 회사의 요구에 따라 즉시 이를 보상해야 합니다.
              </IntlText>
              <Ul>
                <Li><IntlText intlKey='termOfService.paragraph7-2-1'>
                  신청 또는 변경시 허위 내용의 등록
                </IntlText></Li>
                <Li><IntlText intlKey='termOfService.paragraph7-2-2'>
                  타인의 정보 도용
                </IntlText></Li>
                <Li><IntlText intlKey='termOfService.paragraph7-2-3'>
                  "서비스" 에 게시된 정보의 변경
                </IntlText></Li>
                <Li><IntlText intlKey='termOfService.paragraph7-2-4'>
                  "서비스" 가 정한 정보 이외의 정보 게시
                </IntlText></Li>
                <Li><IntlText intlKey='termOfService.paragraph7-2-5'>
                  "서비스" 기타 제3자의 저작권 등 지적재산권에 대한 침해
                </IntlText></Li>
                <Li><IntlText intlKey='termOfService.paragraph7-2-6'>
                  "서비스" 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
                </IntlText></Li>
                <Li><IntlText intlKey='termOfService.paragraph7-2-7'>
                  외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 몰에 공개 또는 게시하는 행위
                </IntlText></Li>
              </Ul>
            </Li>
          </Ol>
        </Section>
        <Section>
          <H2>8. <IntlText intlKey='termOfService.title8'>저작물의 이용</IntlText></H2>
          <Ol>
            <Li><IntlText intlKey='termOfService.paragraph8-1'>
              회사가 작성한, 배포한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.
            </IntlText></Li>
            <Li>
              <IntlText intlKey='termOfService.paragraph8-2'>
                이용자는 "서비스" 를 이용함으로 얻은 정보 중 "서비스" 에게 지적재산권이 귀속된 정보를
                "서비스" 의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
              </IntlText>
            </Li>
            <Li>
              <IntlText intlKey='termOfService.paragraph8-3'>
                "서비스" 는 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.
              </IntlText>
            </Li>
          </Ol>
        </Section>
        <Section>
          <H2>9. <IntlText intlKey='termOfService.title9'>분쟁의 해결</IntlText></H2>
          <Ol>
            <Li><IntlText intlKey='termOfService.paragraph9-1'>
              "서비스" 와 이용자 간에 제기된 전자상거래 소송에는 대한민국법을 적용합니다.
            </IntlText></Li>
            <Li>
              <IntlText intlKey='termOfService.paragraph9-2'>
                "서비스" 와 이용자 간에 발생한 분쟁에 관한 소송은 서울중앙지방법원을 관할 법원으로 합니다.
              </IntlText>
            </Li>
          </Ol>
        </Section>
      </PageTemplate>
    )
  }
}
