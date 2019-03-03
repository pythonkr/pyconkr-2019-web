import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import intl from 'react-intl-universal'

const NavLinkA = styled.a`
  display: inline-flex;
  height: 60px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
`

export type NavLinkPropsType = {
  to: string;
  intlKey: string;
  name: string;
}

const NavLink = ({ to, intlKey, name }: NavLinkPropsType) => {
  return (
    <Link href={to}>
      <NavLinkA><span>{
        intl
          .get(intlKey)
          .defaultMessage(name)
      }</span></NavLinkA>
    </Link>
  )
}

export default NavLink
