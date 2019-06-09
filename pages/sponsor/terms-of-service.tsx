import { H1, H2, Li, Ol, Paragraph, Section } from 'components/atoms/ContentWrappers'
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
          <H2>제1조. <IntlText intlKey='termOfService.title1'>목적</IntlText></H2>
          <Paragraph><IntlText intlKey='termOfService.paragraph1-1'>
            {`본 약관은 후원사가 사단법인 파이썬사용자모임(이하 “파이콘”)이 개최하는 <파이콘 한국 2019> 행사(이하 “행사”)에 후원을 함에 있어 행사 홈페이지에 안내된 내용과 더불어 양 당사자간 권리, 의무를 분명히 하는 것을 목적으로 합니다.`}
          </IntlText></Paragraph>
        </Section>
        <Section>
          <H2>제2조. <IntlText intlKey='termOfService.title2'>후원 신청 및 후원금 지급방법</IntlText></H2>
          <Ol>
            <Li><IntlText intlKey='termOfService.paragraph2-1'>
              후원사는 행사 홈페이지를 통해 후원신청서를 제출하여야 하며, 파이콘의 승인을 통지받은 날로부터 14일 이내에 후원신청 금액을 파이콘이 정한 계좌에 일시불로 지급해야 합니다. 단, 후원사가 지급기한 연장에 대한 정당한 사유를 들어 연장을 신청한 경우 파이콘은 해당 신청을 승인할 수 있습니다.
            </IntlText></Li>
            <Li><IntlText intlKey='termOfService.paragraph2-3'>
              파이콘이 승인을 통지한 날 해당 후원등급의 잔여 구좌가 감소됩니다. 입금 기한이 지나 신청이 취소된 경우 잔여 구좌가 다시 증가됩니다.
            </IntlText></Li>
            <Li><IntlText intlKey='termOfService.paragraph2-2'>
              후원금 지급의 최종 기한은 2019. 7. 31. 이며 제1항에 따른 연장 신청이 승인된 경우에도 이와 같습니다.
            </IntlText></Li>
          </Ol>
        </Section>
        <Section>
          <H2>제3조. <IntlText intlKey='termOfService.title3'>후원등급에 따른 파이콘의 의무</IntlText></H2>
          <Paragraph><IntlText intlKey='termOfService.paragraph3-1'>
              후원금액에 따른 후원등급 및 각 후원등급 별 후원사에 대한 파이콘의 의무는 행사 홈페이지에 안내된 바와 같습니다. 단, 양 당사자의 합의에 따라 특약으로 행사 홈페이지에 안내된 내용과 다르게 후원 계약을 체결할 수 있습니다.
          </IntlText></Paragraph>
        </Section>
        <Section>
          <H2>제4조. <IntlText intlKey='termOfService.title4'>후원 계약의 해제 및 후원 금액의 일부 취소</IntlText></H2>
          <Paragraph><IntlText intlKey='termOfService.paragraph4-1'>
              후원사는 파이콘에 다음 각 호의 기간에 따른 위약금을 지급하고 후원 계약을 해제할 수 있습니다. 단, 후원 금액 중 일부를 취소하는 경우 취소를 요청한 금액에 다음 각 호에 따른 위약금 산정 비율이 적용됩니다.
          </IntlText></Paragraph>
          <Ol>
            <Li><IntlText intlKey='termOfService.paragraph4-2-1'>
              2019. 6. 1. ~ 2019. 6. 30. : 후원금액의 50%
            </IntlText></Li>
            <Li><IntlText intlKey='termOfService.paragraph4-2-2'>
              2019. 7. 1. ~ 2019. 7. 31. : 후원금액의 80%
            </IntlText></Li>
            <Li><IntlText intlKey='termOfService.paragraph4-2-3'>
              2019. 8. 1. 이후 : 후원금액의 100%
            </IntlText></Li>
          </Ol>
        </Section>
        <Section>
          <H2>제5조. <IntlText intlKey='termOfService.title5'>행동강령 위반에 따른 후원 계약의 해지 및 손해배상</IntlText></H2>
          <Ol>
            <Li><IntlText intlKey='termOfService.paragraph5-1'>
              후원사는 행사 홈페이지에 공개된 행동강령을 엄격하게 준수할 의무가 있습니다.
            </IntlText></Li>
            <Li><IntlText intlKey='termOfService.paragraph5-2'>
              후원사는 제2조 제1항에 따른 신청 시 후원 계약 신청 이전에 발생한 행동강령 위반사실 여부에 대해 고지할 의무가 있으며, 파이콘은 행동강령 위반사실을 이유로 후원 계약 체결을 거부할 수 있습니다.
            </IntlText></Li>
            <Li><IntlText intlKey='termOfService.paragraph5-3'>
              후원사가 후원 계약 체결 이후 제1항에 따른 행동강령 준수 의무를 위반하거나 제2항에 따른 후원사의 고지의무 위반 사실이 발견된 경우 파이콘은 즉시 해당 사실을 후원사에게 통보하고 시정을 요청할 수 있습니다.
            </IntlText></Li>
            <Li><IntlText intlKey='termOfService.paragraph5-4'>
              후원사는 제3항에 따른 요청을 통보받은 후 12시간 내로 파이콘에 의견서를 제출해야 합니다. 단, 후원사가 기한 연장에 대한 정당한 사유를 들어 연장을 신청하거나 대면 협의를 신청하는 경우 파이콘은 해당 신청을 승인할 수 있습니다.
            </IntlText></Li>
            <Li>
              <IntlText intlKey='termOfService.paragraph5-5'>
                파이콘은 제4항에 따라 제출된 후원사의 의견서 등을 바탕으로 다음 각 호의 어느 하나에 해당하는 경우 해당 사유를 통보하고 후원 계약을 해지할 수 있습니다. 후원사는 계약 해지 시점 이후 부스 운영을 포함한 일체의 행사에 참석할 수 없고 파이콘에 제4조 각 호의 기간에 따른 위약금을 지급해야 합니다.
              </IntlText>
              <Ol>
                <Li><IntlText intlKey='termOfService.paragraph5-5-1'>
                  후원사가 고의로 제2항의 고지 의무를 위반한 경우
                </IntlText></Li>
                <Li><IntlText intlKey='termOfService.paragraph5-5-2'>
                  후원사가 시정 요청에 대한 의견서를 제3항의 기한 내에 제출하지 않거나 정당한 사유 없이 시정 요청에 응하지 않은 경우
                </IntlText></Li>
                <Li><IntlText intlKey='termOfService.paragraph5-5-3'>
                  후원사의 행동강령 위반의 정도가 파이콘 및 행사의 운영에 중대한 지장을 미치는 경우
                </IntlText></Li>
              </Ol>
            </Li>
          </Ol>
        </Section>
        <Section>
          <H2>제6조 <IntlText intlKey='termOfService.title6'>기타</IntlText></H2>
          <Paragraph><IntlText intlKey='termOfService.paragraph6-1'>
            기타 약관에 포함되지 않은 사안에 대해서는 당사자간 합의에 따라 특약으로 정할 수 있습니다.
          </IntlText></Paragraph>
        </Section>
        <Section>
          <H2>제7조 <IntlText intlKey='termOfService.title7'>관할법원</IntlText></H2>
          <Paragraph><IntlText intlKey='termOfService.paragraph7-1'>
            본 약관과 관련해 당사자간에 분쟁이 발생한 경우 상호 협의하여 원만히 해결하되, 소송으로 진행하는 경우 서울중앙지방법원을 관할법원으로 합니다.
          </IntlText></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
