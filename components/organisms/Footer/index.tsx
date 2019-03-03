import styled from '@emotion/styled';
import { WideContentWidthWrapper } from 'components/atoms/WideContentWidthWrapper';
import FixedFooter from 'components/organisms/FixedFooter';

const FooterWrapper = styled.footer`
    background-color: #d7e9fb;
    padding: 0 20px 40px;
`

const Footer =  () => (<>
    <FooterWrapper>
        <WideContentWidthWrapper>
            <ul>
                <li>후원 sponsor@pycon.kr</li>
                <li>프로그램 program@pycon.kr</li>
                <li>기타 문의 support@pycon.kr</li>
            </ul>
        </WideContentWidthWrapper>
    </FooterWrapper>
    <FixedFooter />
</>)

export default Footer
