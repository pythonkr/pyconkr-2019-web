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
        header={<Header title='개인정보 처리 방침 :: 파이콘 한국 2019' />}
        footer={<Footer />}
      >
        <H1><IntlText intlKey='privacyPolicy.heading'>
          개인정보 처리 방침
        </IntlText></H1>
        <Section>
          <H2>0. <IntlText intlKey='privacyPolicy.title0'>개인정보 처리 방침이란?</IntlText></H2>
          <Paragraph><IntlText intlKey='privacyPolicy.paragraph0'>
            {`"개인정보처리방침" 이란 모든 이용자의 소중한 개인정보를 보호함으로써 안심하고
            컨텐츠를 제공받고 서비스를 사용할 수 있도록 <사단법인 파이썬사용자모임>(이하 ‘회사')가 준수해야 할 지침을 의미합니다.`}
          </IntlText></Paragraph>
        </Section>
        <Section>
          <H2>1. <IntlText intlKey='privacyPolicy.title1'>개인정보 수집 항목과 목적</IntlText></H2>
          <Ol>
            <Li><IntlText intlKey='privacyPolicy.paragraph1-1'>
              회원가입 - 서비스 내에서 가입의사 확인, 본인 확인, 행사 안내와 같은 컨텐츠 제공, 티켓 결제를 위해 필수로 이메일과 이름을 수집합니다.
            </IntlText></Li>
            <Li><IntlText intlKey='privacyPolicy.paragraph1-2'>
              발표자 제안 - 본인 확인을 위해 이메일, 이름, 영문 이름이 필수 정보로 요구되고
              행사 참가자들을 위해 웹사이트/행사장 내 정보 안내로 사용이 될 예정입니다.
              전화번호, 소속은 선택적으로 입력합니다.
            </IntlText></Li>
          </Ol>
          <Paragraph><IntlText intlKey='privacyPolicy.paragraph1-3'>
            입력해주신 개인 정보는 언제든지 수정이 가능하며 절대 이용자의 동의 없이 제3자에게 개인정보가 제공되거나
            따로 사용되는 일은 없을 것이며 회사는 개인정보가 포함된 컨텐츠를 공유할 때 세심한 주의를 기울이도록 하겠습니다.
            각 항목에 포함되는 이용자는 각 항목의 필수로 요구되는 데이터를 제출하여야지만 서비스 가입 또는 제안이 가능하며
            정보가 제출되면 개인정보 수집에 동의한 것으로 간주됩니다.
          </IntlText></Paragraph>
        </Section>
        <Section>
          <H2>2. <IntlText intlKey='privacyPolicy.title2'>개인정보 자동 수집 - 쿠키</IntlText></H2>
          <Paragraph><IntlText intlKey='privacyPolicy.paragraph2'>
            각 이용자에게 맞춤 컨텐츠와 자동 로그인과 같은 편한 서비스를 제공하기 위해 쿠키를 사용하고 있습니다.
            쿠키에는 개인을 식별하는 정보는 저장되지 않으며, 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다.
            원치 않을 경우 이용자는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나,
            모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키 설치를 거부할 경우 맞춤 컨텐츠 제공에 어려움이 있을 수 있습니다.
          </IntlText></Paragraph>
        </Section>
        <Section>
          <H2>3. <IntlText intlKey='privacyPolicy.title3'>개인정보의 안전성 확보 조치</IntlText></H2>
          <Ol>
            <Li><IntlText intlKey='privacyPolicy.paragraph3-1'>
              개인정보를 취급하는 담당자를 최소한으로 한정해 관리하고 있습니다.
              담당자는 접근 통제를 위하여 필요한 조치를 하고 있으며 침입 차단 시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
            </IntlText></Li>
            <Li><IntlText intlKey='privacyPolicy.paragraph3-2'>
              해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안 프로그램을 설치하고
              주기적인 갱신/점검을 하며 기술적/물리적으로 감시 및 차단하고 있습니다.
            </IntlText></Li>
          </Ol>
        </Section>
        <Section>
          <H2>4. <IntlText intlKey='privacyPolicy.title4'>개인정보의 파기</IntlText></H2>
          <Paragraph><IntlText intlKey='privacyPolicy.paragraph4-1'>
            이용자가 직접 입력한 모든 개인정보는 해당 연도의 행사 종료일로부터 2년이 되는 시점 지체없이 모두 파기합니다.
            또는 이용자가 탈퇴를 원하여 직접 연락을 주는 경우 마찬가지로 모든 개인정보를 파기합니다.
            전자적 파일 형태의 정보는 기록을 복구할 수 없도록 안전하게 삭제하고 인쇄물의 경우 분쇄하거나 소각을 통하여 파기합니다.
          </IntlText></Paragraph>
          <Paragraph><IntlText intlKey='privacyPolicy.paragraph4-2'>
            단, 관련 법령에 따라 보존할 필요가 있는 정보는 일정 기간 동안 보관합니다.
          </IntlText></Paragraph>
          <Ul>
            <Li><IntlText intlKey='privacyPolicy.paragraph4-3'>
              신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년
            </IntlText></Li>
            <Li><IntlText intlKey='privacyPolicy.paragraph4-4'>
              소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
            </IntlText></Li>
            <Li><IntlText intlKey='privacyPolicy.paragraph4-5'>
              대금결제 및 재화 등의 공급에 관한 기록 : 5년
            </IntlText></Li>
          </Ul>
        </Section>
        <Section>
          <H2>5. <IntlText intlKey='privacyPolicy.title5'> 개인정보 보호 책임자</IntlText></H2>
          <Paragraph><IntlText intlKey='privacyPolicy.paragraph5-1'>
            개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여
            아래와 같이 개인정보 보호 책임자를 지정하고 있습니다. 이용자는 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을
            개인정보 보호 책임자에게 직접 문의하실 수 있습니다.
          </IntlText></Paragraph>
          <Paragraph><IntlText intlKey='privacyPolicy.paragraph5-2'>
            담당자: 배권한 <br />
            연락처:
          </IntlText></Paragraph>
        </Section>
        <Section>
          <H2>6. <IntlText intlKey='privacyPolicy.title6'>개인정보 처리방침 변경</IntlText></H2>
          <Paragraph><IntlText intlKey='privacyPolicy.paragraph6'>
            위 개인정보처리방침이 변경되는 경우 변경 사항을 게시하며, 변경된 개인정보 처리방침은 게시한 날로부터 7일 후부터 효력이 발생합니다.
            다만, 수집하는 개인정보의 항목과 같이 이용자 권리의 중대한 변경이 발생할 때에는 최소 30일 전에 미리 알려드리겠습니다.
          </IntlText></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}
