import Link from 'next/link'
import React from 'react'
import styled from '@emotion/styled';
import intl from 'react-intl-universal';

const NavMenuSubLinkA = styled.a`
  display: inline-flex;
  height: 60px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
`

export type NavMenuSubLinkPropsType = {
  to: string;
  intlKey: string;
  name: string;
}

const NavMenuSubLink = ({ to, intlKey, name }: NavMenuSubLinkPropsType) => {
  return (
    <Link href={to}>
      <NavMenuSubLinkA><span>{intl.get(intlKey).defaultMessage(name)}</span></NavMenuSubLinkA>
    </Link>
  )
}

export default NavMenuSubLink
