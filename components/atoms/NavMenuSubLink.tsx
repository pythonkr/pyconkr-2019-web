import styled from '@emotion/styled'
import Link from 'next/link'
import React, { ComponentProps } from 'react'
import intl from 'react-intl-universal'

const NavMenuSubLinkA = styled.a`
  display: flex;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  cursor: pointer;
`

const Span = styled.span`
  font-size: 14px;
  line-height: 1.3;
  font-weight: ${(props: { isActive: boolean }) => props.isActive ? '700' : 'normal'};
`

export type  NavMenuSubLinkPropsType = {
  to: string;
  intlKey: string;
  name: string;
  currentPath: string;
}

const NavMenuSubLink = ({
  to,
  intlKey,
  name,
  currentPath,
  ...props
}: NavMenuSubLinkPropsType & ComponentProps<'a'>) => {
  return (
    <Link href={to} prefetch>
      <NavMenuSubLinkA {...props}>
        <Span isActive={currentPath === to}>{
          intl
            .get(intlKey)
            .defaultMessage(name)
        }</Span>
      </NavMenuSubLinkA>
    </Link >
  )
}

export default NavMenuSubLink
