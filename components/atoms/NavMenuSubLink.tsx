import Link from 'next/link'
import React, { ComponentProps } from 'react'
import styled from '@emotion/styled';
import intl from 'react-intl-universal';

const NavMenuSubLinkA = styled.a`
  display: inline-flex;
  height: 60px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
`

export interface NavMenuSubLinkPropsType extends ComponentProps<'a'> {
  to: string;
  intlKey: string;
  name: string;
}

const NavMenuSubLink = ({ to, intlKey, name, ...props }: NavMenuSubLinkPropsType) => {
  return (
    <Link href={to}>
      <NavMenuSubLinkA {...props}><span>{intl.get(intlKey).defaultMessage(name)}</span></NavMenuSubLinkA>
    </Link>
  )
}

export default NavMenuSubLink
