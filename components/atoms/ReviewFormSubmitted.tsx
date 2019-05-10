
import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { paths } from 'routes/paths'
import { TEAL } from 'styles/colors'
import { IntlText } from 'components/atoms/IntlText'

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
line-height: 20px;
`

export const ReviewFormSubmitted: React.SFC = () => (<PaddingWrapper>
  <StyledFormWrapper>
    <StyledNeedLoginTitle>
      <IntlText intlKey='contribute.proposalReview.submitted.title'>
        당신의 검토 의견이 제출되었습니다.
      </IntlText></StyledNeedLoginTitle>
    <StyledNeedLoginDesc>
      <IntlText intlKey='contribute.proposalReview.submitted.desc'>
        여러분들의 의견은 파이콘 준비위원회가 제안서를 검토하는 데에 적극적으로 반영될 예정입니다. <br/>더 풍성한 파이콘 한국을 위한 기여에 감사드립니다 😍
      </IntlText>
    </StyledNeedLoginDesc>
  </StyledFormWrapper>
</PaddingWrapper>)
