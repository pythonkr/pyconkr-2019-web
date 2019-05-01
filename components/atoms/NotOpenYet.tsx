
import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
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

export const NotOpenYet: React.SFC = () => (<PaddingWrapper>
  <StyledFormWrapper>
    <StyledNeedLoginTitle>아직 발표 제안 모집이 시작되지 않았습니다.</StyledNeedLoginTitle>
    <StyledNeedLoginDesc>
      조금만 더 기다려주세요 :)
    </StyledNeedLoginDesc>
    <Button
      intlKey='gnb.account.login'
      to={paths.contribute.cfpDetailedGuide}
      fontSize={14}
      color={TEAL}
    >
      발표안 작성 가이드 보러 가기
    </Button>
  </StyledFormWrapper>
</PaddingWrapper>)
