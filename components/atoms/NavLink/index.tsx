import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import intl from 'react-intl-universal'
import { CORAL } from 'styles/colors'
import { mobileGnbWidth, mobileWidth } from 'styles/layout'

const NavLinkA = styled.a`
  display: inline-flex;
  height: 80px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  @media (max-width: ${mobileGnbWidth}) {
    padding: 0;
    width: 100%;
    height: auto;
  }
`
const Span = styled.span`
  font-size: 16px;
  padding: 10px 0;
  font-weight: ${(props: { isActive: boolean }) => props.isActive ? '700' : 'normal'};
  border-bottom: ${(props: { isActive: boolean }) => `solid 2px ${props.isActive ? CORAL : 'rgba(1, 1, 1, 0)'}`};
  @media (max-width: ${mobileWidth}) {
    margin: 10px 0;
    padding: 0;
  }
`

export type NavLinkPropsType = {
  to: string;
  intlKey: string;
  name: string;
  currentPath: string;
  basePath: string;
}

const NavLink = ({ currentPath, to, intlKey, name, basePath }: NavLinkPropsType) => {
  return (
    <Link href={to} prefetch>
      <NavLinkA>
        <Span
          isActive={currentPath === to ||
            (to !== '/' && currentPath.startsWith(basePath))}
        >{
          intl
            .get(intlKey)
            .defaultMessage(name)
        }</Span>
      </NavLinkA>
    </Link>
  )
}

export default NavLink
