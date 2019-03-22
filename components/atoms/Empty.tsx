
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

export const Empty: React.SFC = () => (<PaddingWrapper>
  <StyledFormWrapper>
    <StyledNeedLoginTitle>제안 및 신청 내역이 없습니다.</StyledNeedLoginTitle>
    <StyledNeedLoginDesc>
      공헌 안내 페이지에서 모집 중인 프로그램을 살펴보세요.
    </StyledNeedLoginDesc>
    <Button
      intlKey='gnb.account.login'
      to={paths.contribute.overview}
      fontSize={14}
      color={TEAL}
      primary={false}
    >
      공헌 안내 보기
    </Button>
  </StyledFormWrapper>
</PaddingWrapper>)
