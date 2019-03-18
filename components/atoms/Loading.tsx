import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { CORAL } from 'styles/colors'

const spinnerKeyframes = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`

type Props = {
  width: number;
  height: number;
  color?: string;
}

const StyledLoading = styled.div`
  position: relative;
  width: ${(props: Props) => props.width}px;
  height: ${props => props.height}px;
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: scale(${
    props => props.width ? props.width / 160 : 1
  });
  div {
    position: absolute;
    animation: ${spinnerKeyframes} 1s linear infinite;
    width: 160px;
    height: 160px;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    box-shadow: 0 10px 0 0 ${(props: Props) => props.color};
    -webkit-transform-origin: 80px 85px;
    transform-origin: 80px 85px;
  }
`

export const Loading: React.SFC<Props> = ({ width, height, color = CORAL }) => (
  <StyledLoading
    width={width}
    height={height}
    color={color}
  >
    <div />
  </StyledLoading>
)
