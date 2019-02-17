import styled from '@emotion/styled';
import { ContentWidthWrapper } from 'components/atoms/ContentWidthWrapper';

const FooterWrapper = styled.footer`
    background-color: gray;
`

const Footer =  () => (
    <FooterWrapper>
        <ContentWidthWrapper>
            <ul>
                <li>후원 sponsor@pycon.kr</li>
                <li>프로그램 program@pycon.kr</li>
                <li>기타 문의 support@pycon.kr</li>
            </ul>
        </ContentWidthWrapper>
    </FooterWrapper>
)

export default Footer
