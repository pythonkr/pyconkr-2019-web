import styled from '@emotion/styled';
import React from 'react'
import intl from 'react-intl-universal';

const StyledSpan = styled.span`
`

interface Props {
  intlKey?: string
  bold?: boolean
  children: string
}

export const Span: React.SFC<Props> = ({ intlKey,  children, bold}) =>
  <StyledSpan>
    {bold ? <b>{intlKey
      ? intl.getHTML(intlKey).defaultMessage(children)
      : children
    }</b> : intlKey
      ? intl.getHTML(intlKey).defaultMessage(children)
      : children
    }
  </StyledSpan>
