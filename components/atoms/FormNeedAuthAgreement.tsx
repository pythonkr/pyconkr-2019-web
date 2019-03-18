
import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import Router from 'next/router'
import { paths } from 'routes/paths'
import { TEAL } from 'styles/colors'

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

export const FormNeedAuthAgreement: React.SFC = () => (<PaddingWrapper>
  <StyledFormWrapper>
    <StyledNeedLoginTitle>회원 가입이 완료되지 않았습니다.</StyledNeedLoginTitle>
    <StyledNeedLoginDesc>
      이용 약관 동의 후 회원 가입을 완료해주세요.
    </StyledNeedLoginDesc>
    <Button
      intlKey='gnb.account.login'
      to={`${paths.account.agreement}?redirect_url=${Router.asPath}`}
      fontSize={14}
      color={TEAL}
    >
      회원 가입 완료하러 가기
    </Button>
  </StyledFormWrapper>
</PaddingWrapper>)
