import styled from '@emotion/styled'
import { TEAL, TEAL_LIGHT, TEAL_LIGHT_LIGHT, TEAL_SEMI_DARK } from 'styles/colors'
import { mobileWidth } from 'styles/layout'

export const StepsWrapper = styled.div`
padding: 49px 30px 40px;
background-color: ${TEAL_LIGHT_LIGHT};
border-bottom: solid 1px #e1e4e6;
.rc-steps-item-icon {
  border-color: ${TEAL_LIGHT};
}
.rc-steps-item-finish > .rc-steps-item-tail::after {
  background-color: ${TEAL_SEMI_DARK};
}
.rc-steps-item-finish > .rc-steps-item-icon,
.rc-steps-item-process > .rc-steps-item-icon {
  background-color: ${TEAL};
  border-color: ${TEAL_SEMI_DARK};
  display: flex;
  justify-content: center;
  align-items: center;
}
.rc-steps-item-finish > .rc-steps-item-icon {
  display:inline-block;
  position: relative;

  &:after{
    content: '✔︎';
    display: block;
    color: ${TEAL_LIGHT};
    position: absolute;
    top: -2px;
    left: 6px;
  }
}

@media (max-width: ${mobileWidth}) {
  overflow-x: auto;
}
`
