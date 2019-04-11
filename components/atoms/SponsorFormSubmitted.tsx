
import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { paths } from 'routes/paths'
import { TEAL } from 'styles/colors'
import { IntlText } from "./IntlText";

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
font-size: 16px;
line-height: 22px;
text-align: center;
margin-bottom: 30px;

strong {
font-weight: bold;
}
`

export const SponsorFormSubmitted: React.SFC = () => (<PaddingWrapper>
  <StyledFormWrapper>
    <StyledNeedLoginTitle>
      <IntlText intlKey='sponsor.submitted'>
        후원사 신청서를 제출했습니다.
      </IntlText>
    </StyledNeedLoginTitle>
    <StyledNeedLoginDesc>
       <IntlText intlKey='sponsor.submittedDesc'>
         제출한 제안서는 제안 및 신청 내역에서 확인 및 수정하실 수 있습니다.<br/><br/>
         <strong>아직 스폰서로 확정된 상태는 아니며</strong>, 파이콘 한국 준비위원회 검토 이후<br/>
         후원금 입금 방법과 절차 등의 내용은 메일로 다시 안내드리도록 하겠습니다.
      </IntlText>
    </StyledNeedLoginDesc>
    <Button
      intlKey='contribution.title'
      to={paths.account.contribution}
      fontSize={14}
      color={TEAL}
      primary={false}
    >
      제안 및 신청 내역 보기
    </Button>
  </StyledFormWrapper>
</PaddingWrapper>)
