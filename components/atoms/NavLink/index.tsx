import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { RouterProps, withRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
import intl from 'react-intl-universal'
import { CORAL } from 'styles/colors';

const NavLinkA = styled.a`
  display: inline-flex;
  height: 80px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
`
const Span = styled.span`
  font-size: 16px;
  padding: 10px 0;
  font-weight: ${(props: { isActive: boolean }) => props.isActive ? '700' : 'normal'};
  border-bottom: ${(props: { isActive: boolean }) => props.isActive ? `solid 2px ${CORAL}` : 'none'};
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
    <Link href={to}>
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
