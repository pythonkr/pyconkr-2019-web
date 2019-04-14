
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

export const SponsorFormClose: React.SFC = () => (<PaddingWrapper>
  <StyledFormWrapper>
    <StyledNeedLoginTitle>후원사 모집이 마감되었습니다.</StyledNeedLoginTitle>
    <StyledNeedLoginDesc>
      기존에 제출한 제안서는 제안 및 신청 내역에서 확인 및 수정하실 수 있습니다.
    </StyledNeedLoginDesc>
    <Button
      intlKey='gnb.account.login'
      to={paths.account.contribution}
      fontSize={14}
      color={TEAL}
      primary={false}
    >
      제안 및 신청 내역 보기
    </Button>
  </StyledFormWrapper>
</PaddingWrapper>)
