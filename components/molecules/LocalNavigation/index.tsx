import styled from '@emotion/styled'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import intl from 'react-intl-universal'
import { NormalMenu, WithSubMenu } from 'routes/paths'
import { CORAL, HEADING_LIGHT_BLACK, TEAL } from 'styles/colors'
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
const NavItem = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 13px;
  font-size: 14px;
  color: ${TEAL};
  margin: 0;
  & b {
    font-weight: 700;
    padding: 0 20px;
  }
`
const SubmenuUl = styled.ul`
display: inline-block;
margin-right: 20px;
`
const NavLinkA = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  ${SubmenuUl} & {
    padding: 0 10px;
  }
`
const NavSpan = styled.span`
  font-size: 14px;
  padding: 9px 0;
  color: ${TEAL};
  font-weight: ${(props: { isActive: boolean }) => props.isActive ? 700 : 500};
  border-bottom: ${(props: { isActive: boolean }) => props.isActive ? `solid 2px ${CORAL}` : 'none'};
  @media (max-width: ${mobileWidth}) {
    padding-bottom: 4px;
  }

  ${SubmenuUl} & {
    color: ${HEADING_LIGHT_BLACK};
    font-weight: ${(props: { isActive: boolean }) => props.isActive ? 700 : 500};
  }
`
const NavList = styled.ul`
text-align: center;
white-space: nowrap;
@media (max-width: ${mobileWidth}) {
  white-space: unset;
  text-align: left;
  overflow-x: auto;
}
${NavItem},
${NavSpan} {
  font-weight: ${(props: { hasSubmenu: boolean }) => props.hasSubmenu ? '700' : '500'}
}
`

type Props = {
  list: (NormalMenu | WithSubMenu)[];
  router: any;
}

const _LocalNavigation: React.SFC<Props> = ({ router, list }) => (
  <NavWrapper>
    <NavList hasSubmenu={list.some(navItem => !!navItem.submenu)}>
      {list.map(({ title, link, intlKey, submenu }) =>
        submenu
          ? <NavItem>
              <b>{title}</b>
              <SubmenuUl>
                {submenu.map(submenuItem =>
                  <NavItem key={submenuItem.title}>
                    <Link href={submenuItem.link} prefetch>
                      <NavLinkA>
                        <NavSpan
                          isActive={router.pathname === submenuItem.link ||
                            (submenuItem.link !== '/' && router.pathname.startsWith(submenuItem.link))}
                        >
                          {intl.get(submenuItem.intlKey).defaultMessage(submenuItem.title)}
                        </NavSpan>
                      </NavLinkA>
                    </Link>
                  </NavItem>
                )}
              </SubmenuUl>
            </NavItem>
          : <NavItem key={title}>
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
