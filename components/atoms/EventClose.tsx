
import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
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

interface Props {
  title: string,
  desc?: string,
  buttonText?: string,
  buttonIntlKey?: string,
  link?: string
}

export const EventClose: React.SFC<Props> = ({
  title,
  desc,
  buttonText,
  buttonIntlKey,
  link
}) => (<PaddingWrapper>
  <StyledFormWrapper>
    <StyledNeedLoginTitle>{title}</StyledNeedLoginTitle>
    <StyledNeedLoginDesc>
      {desc}
    </StyledNeedLoginDesc>
    {
      buttonText &&
      <Button
        intlKey={buttonIntlKey}
        to={link}
        fontSize={14}
        color={TEAL}
      >
        {buttonText}
      </Button>
    }
  </StyledFormWrapper>
</PaddingWrapper>)
