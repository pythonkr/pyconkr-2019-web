import styled from '@emotion/styled'
import React from 'react'
import intl from 'react-intl-universal'

const StyledH2 = styled.h2`
`

interface Props {
  intlKey: string
  children: string
}

export const H2: React.SFC<Props> = ({ intlKey, children }) =>
  <StyledH2>{
    intl
      .get(intlKey)
      .defaultMessage(children)
  }</StyledH2>
