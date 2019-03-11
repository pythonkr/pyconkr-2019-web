import styled from '@emotion/styled'
import React from 'react'
import intl from 'react-intl-universal'

const StyledP = styled.p`
`

interface Props {
  intlKey?: string
  bold?: boolean
  children: string
}

export const Paragraph: React.SFC<Props> = ({ intlKey,  children, bold}) =>
  <StyledP>
    {bold ? <b>{intlKey
      ? intl.getHTML(intlKey).d(children)
      : children
    }</b> : intlKey
      ? intl.getHTML(intlKey).d(children)
      : children
    }
  </StyledP>
