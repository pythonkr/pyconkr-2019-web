import styled from '@emotion/styled'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import intl from 'react-intl-universal'
import { CORAL, TEAL } from 'styles/colors'
import { mobileWidth, navigationPadding } from 'styles/layout'

const NavWrapper = styled.nav`
  padding: 24px ${navigationPadding} 63px;
  background-color: white;
  @media (max-width: ${mobileWidth}) {
    padding-left: 0;
    padding-right: 0;
    margin-right: -20px;
  }
`
const NavList = styled.ul`
text-align: center;
white-space: nowrap;
overflow-x: auto;
 @media (max-width: ${mobileWidth}) {
    white-space: unset;
    text-align: left;
  }
`
const NavItem = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 13px;
  font-size: 14px;
  margin: 0;
`
const NavLinkA = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
`
const NavSpan = styled.span`
  font-size: 14px;
  padding: 9px 0;
  color: ${TEAL};
  font-weight: ${(props: { isActive: boolean }) => props.isActive ? '700' : 'normal'};
  border-bottom: ${(props: { isActive: boolean }) => props.isActive ? `solid 2px ${CORAL}` : 'none'};
  @media (max-width: ${mobileWidth}) {
    padding-bottom: 4px;
  }
`

type LNBItem = {
  title: string;
  link: string;
  intlKey: string;
}

type Props = {
  list: LNBItem[];
  router: any;
}

const _LocalNavigation: React.SFC<Props> = ({ router, list }) => (
  <NavWrapper>
    <NavList>
      {list.map(({ title, link, intlKey }) =>
        <NavItem key={title}>
          <Link href={link} prefetch>
            <NavLinkA>
              <NavSpan
                isActive={router.pathname === link ||
                  (link !== '/' && router.pathname.startsWith(link))}
              >
                {intl.get(intlKey).defaultMessage(title)}
              </NavSpan>
            </NavLinkA>
          </Link>
        </NavItem>
      )}
    </NavList>
  </NavWrapper>
)

export const LocalNavigation = withRouter(_LocalNavigation)
