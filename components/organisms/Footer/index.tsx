import styled from '@emotion/styled'
import { WideContentWidthWrapper } from 'components/atoms/WideContentWidthWrapper'
import { SNSLinkList } from 'components/molecules/SNSLinkList'
import FixedFooter from 'components/organisms/FixedFooter'
import intl from 'react-intl-universal'
import { mobileWidth } from 'styles/layout'

const FooterWrapper = styled.footer`
  background-color: #f5f5f5;
  padding-bottom: 40px;

  ${WideContentWidthWrapper} {
    padding-top: 37px;
    padding-bottom: 39px;
    height: 160px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 700px) {
      display: block;
      height: auto;
      padding: 24px 20px 30px;
    }
    @media (max-width: ${mobileWidth}) {
      padding-bottom: 10px;
    }
  }

  ul {
    @media (max-width: 700px) {
      margin: 10px 0;
    }
  }

  li, p {
    font-size: 14px;
    line-height: 2;
    @media (max-width: 700px) {
      font-size: 12px;
      line-height: 2;
    }
  }
`

const MobileSNSFooterListWrapper = styled.div`
  padding-top: 20px;
  @media (min-width: ${mobileWidth}) {
    display: none;
  }
`

const Footer = () => (<>
  <FooterWrapper>
    <WideContentWidthWrapper>
      <ul style={{ padding: '0 10px' }}>
        <li>{ intl.get('fixedFooter.sponsor').defaultMessage('후원') } <a href='mailto:sponsor@pycon.kr'>sponsor@pycon.kr</a> </li>
        <li>{ intl.get('fixedFooter.program').defaultMessage('프로그램') } <a href='mailto:program@pycon.kr'>program@pycon.kr</a> </li>
        <li>{ intl.get('fixedFooter.other').defaultMessage('기타 문의') } <a href='mailto:pyconkr@pycon.kr'>pyconkr@pycon.kr</a> </li>
      </ul>
      <p style={{ padding: '0 10px' }}>
        { intl.get('fixedFooter.poweredBy').defaultMessage('파이썬 웹 프레임워크 Django와 Next.js로 만들었습니다.') } <br/>
        { intl.get('fixedFooter.hostedOn').defaultMessage('홈페이지 호스팅은 Naver D2의 지원을 받고 있습니다.') } <br/>
        { intl.get('fixedFooter.issueTrackerBy').defaultMessage('협업 도구는 Dooray!의 지원을 받고 있습니다.') }

      </p>
      <MobileSNSFooterListWrapper>
        <SNSLinkList color='black' />
      </MobileSNSFooterListWrapper>
    </WideContentWidthWrapper>
  </FooterWrapper>
  <FixedFooter />
</>)

export default Footer
