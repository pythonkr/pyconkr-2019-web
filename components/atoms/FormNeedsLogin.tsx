
import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { paths } from 'routes/paths'
import { TEAL } from 'styles/colors'
import Router from 'next/router';

export const PaddingWrapper = styled.div`
padding: 10px 0;
`

const StyledFormWrapper = styled.div`
  padding: 60px 0;
  background-color: #fcfcfc;
  text-align: center;
`
const StyledNeedLoginTitle = styled.p`
font-size: 18px;
font-weight: 700;
text-align: center;
margin-bottom: 20px;
`
const StyledNeedLoginDesc = styled.p`
font-size: 14px;
text-align: center;
margin-bottom: 30px;
`

export const FormNeedsLogin: React.SFC = () => (<PaddingWrapper>
  <StyledFormWrapper>
    <StyledNeedLoginTitle>로그인이 필요합니다.</StyledNeedLoginTitle>
    <StyledNeedLoginDesc>
      파이콘 한국 계정으로 로그인해주세요.
    </StyledNeedLoginDesc>
    <Button
      intlKey='gnb.account.login'
      to={`${paths.account.login}?redirect_url=${Router.route}`}
      fontSize={14}
      color={TEAL}
    >
      로그인
    </Button>
  </StyledFormWrapper>
</PaddingWrapper>)
