import styled from '@emotion/styled'
import React from 'react'
import intl from 'react-intl-universal'

const StyledLI = styled.li`
`

interface Props {
  intlKey: string
  children: string
}

export const LI: React.SFC<Props> = ({ intlKey, children }) =>
  <StyledLI>{
    intl
      .get(intlKey)
      .defaultMessage(children)
  }</StyledLI>
