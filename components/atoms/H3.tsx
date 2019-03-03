import styled from '@emotion/styled'
import React from 'react'
import intl from 'react-intl-universal'

const StyledH3 = styled.h3`
`

interface Props {
  intlKey: string
  children: string
}

export const H3: React.SFC<Props> = ({ intlKey, children }) =>
  <StyledH3>{
    intl
      .get(intlKey)
      .defaultMessage(children)
  }</StyledH3>
