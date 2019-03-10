import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { RouterProps, withRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
import intl from 'react-intl-universal'

const NavLinkA = styled.a`
  display: inline-flex;
  height: 80px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  ${props =>
    props.isActive &&
    css`
      border-bottom: solid 2px rgba(249, 88, 88, 0.61);
    `};
`

export type NavLinkPropsType = {
  router: RouterProps,
  to: string;
  intlKey: string;
  name: string;
}

const NavLink = ({ router, to, intlKey, name }: NavLinkPropsType) => {
  let isActive = false
  console.log(to, router.asPath)
  if(router.asPath == (to)){
    isActive = true
  } else if (to !== '/' && router.asPath.startsWith(to)){
    isActive = true
  }


  return (
    <Link href={to}>
      <NavLinkA isActive={isActive}><span>{
        intl
          .get(intlKey)
          .defaultMessage(name)
      }</span></NavLinkA>
    </Link>
  )
}

export default withRouter(NavLink)
