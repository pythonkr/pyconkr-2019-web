import React from 'react'
import styled from '@emotion/styled';
import intl from 'react-intl-universal';

const StyledH1 = styled.h1`
`

interface Props {
  intlKey: string;
  children: string;
}

export const H1: React.SFC<Props> = ({ intlKey,  children }) =>
  <StyledH1>
    {intl.get(intlKey).defaultMessage(children)}
  </StyledH1>
