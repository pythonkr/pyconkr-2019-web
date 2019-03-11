import styled from '@emotion/styled'
import NavLink from 'components/atoms/NavLink'
import NavMenuSubLink from 'components/atoms/NavMenuSubLink'
import { PyConKRLogo } from 'components/atoms/SVG'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import intl from 'react-intl-universal'
import { paths, globalNavigationMenu, GNBMenu } from 'routes/paths'
import { CORAL, CORAL_LIGHT } from 'styles/colors'
import { mobileWidth, navigationPadding } from 'styles/layout'

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${navigationPadding};
  background-color: white;
  box-sizing: border-box;
  border-bottom: solid 2px ${CORAL_LIGHT};
  z-index: 100;
  @media (max-width: ${mobileWidth}) {
    padding: 0;
  }
`
const HeaderLogo = styled.p`
  margin: 23px 0 20px;
  line-height: 0;
  cursor: pointer;
`
const HamburgerCheckbox = styled.input`
 display: none;
`
const HamburgerButtonLabel = styled.label`
cursor: pointer;
display: inline-block;
float: right;
padding: 28px 20px;
position: relative;
user-select: none;
z-index: 200;
@media (min-width: ${mobileWidth}) {
  display: none;
  z-index: 0;
}
`
const HamburgerButtonIcon = styled.span`
background: #333;
display: block;
height: 2px;
position: relative;
transition: background .2s ease-out;
width: 22px;
margin-top: 8px;
&:before,
&:after {
  background: #333;
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  transition: all .2s ease-out;
  width: 100%;
  top: 0;
}
&:before {
  top: 8px;
}
&:after {
  top: -8px;
}
${HamburgerCheckbox}:checked ~${HamburgerButtonLabel} & {
  background: transparent;
  &:after,
  &:before {
    background: white;
    top: 0;
  }
  &:before {
    transform: rotate(-45deg);
  }
  &:after {
    transform: rotate(45deg);
  }
}
`
const NavMenuList = styled.ul`
// transition: max-height .2s ease-out;
@media (max-width: ${mobileWidth}) {
display: none;
position: fixed;
overflow-y: scroll;
z-index: 9;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
padding: 62px 0;
background-color: rgba(000, 000, 000, 0.95);
}
${HamburgerCheckbox}:checked ~ & {
  display: block;
}
`
const NavItem = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 10px;
  font-size: 14px;
  @media (max-width: ${mobileWidth}) {
    display: block;
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0 10%;
    font-size: 25px;
    line-height: 55px;
    color: white;
  }
`
const SubmenuButtonCheckbox = styled.input`
display: none;
`
const SubmenuButtonLabel = styled.label`
display: inline-flex;
height: 80px;
align-items: center;
padding: 0 10px;
cursor: pointer;
@media (max-width: ${mobileWidth}) {
  padding: 0;
  width: 100%;
  height: auto;
}
`
const SubmenuButtonSpan = styled.span`
font-size: 16px;
padding: 10px 0;
font-weight: ${(props: { isActive: boolean }) => props.isActive ? '700' : 'normal'};
border-bottom: ${(props: { isActive: boolean }) => `solid 2px ${props.isActive ? CORAL : 'rgba(1, 1, 1, 0)'}`};
@media (max-width: ${mobileWidth}) {
  margin: 10px 0;
  padding: 0;
  margin-bottom: ${(props: { isActive: boolean }) => props.isActive ? '30px' : '10px'};
}
`
const Caret = styled.span`
display: inline-block;
vertical-align: middle;
width: 0;
height: 0;
margin: 0 0 3px 5px;
border-style: solid;
border-width: 6px 6px 0 6px;
border-color: rgba(255, 255, 255, 0.75) transparent transparent transparent;

@media (max-width: ${mobileWidth}) {
  position: absolute;
  right: 10%;
  top: 35px;
}
@media (min-width: ${mobileWidth}) {
  border-color: rgba(0, 0, 0, 0.75) transparent transparent transparent;
}
${SubmenuButtonCheckbox}:checked ~ & {
  margin: 0 0 5px 5px;
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent rgba(255, 255, 255, 0.75) transparent;
  @media (min-width: ${mobileWidth}) {
    border-color: transparent transparent rgba(0, 0, 0, 0.75) transparent;
  }
}
`
const SubmenuList = styled.ul`
  z-index: 200;
  visibility: hidden;
  height: 0;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  font-size: 14px;
  color: white;

  ${SubmenuButtonCheckbox}:checked ~ & {
    visibility: visible;
    height: auto;
  }

  @media (min-width: ${mobileWidth}) {
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 78px;
    left: -40px;
    padding: 8px 16px 10px;
    width: 180px;
    font-size: 14px;
    color: black;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px #dfe3e6;
    background-color: #ffffff;

    ${NavItem}:last-of-type & {
      right: 0;
      left: initial;
    }
  }
`
const SubmenuItem = styled.li`
@media (max-width: ${mobileWidth}) {
  padding: 2px 0;
  &:last-of-type {
    padding-bottom: 10px;
  }
}
`
const SubmenuItemLink = styled(NavMenuSubLink)`
@media (max-width: ${mobileWidth}) {
  padding: 20px 0;
}`

class Navigation extends React.Component<any> {
  state = {
    isMenuOpened: false,
    openedSubmenu: null,
  }

  toggleSubmenu = (menuKey: string) => {
    this.setState({
      openedSubmenu: this.state.openedSubmenu === menuKey
        ? null
        : menuKey
    })
  }

  render() {
    return (
      <NavWrapper>
        <ul>
          <NavItem>
            <Link href='/'>
              <HeaderLogo>
                <PyConKRLogo
                  width={139}
                  height={37}
                  color={CORAL}
                />
              </HeaderLogo>
            </Link>
          </NavItem>
        </ul>
        <HamburgerCheckbox
          type='checkbox'
          id='menu-btn'
          checked={this.state.isMenuOpened}
          onChange={() => {
            this.setState({
              isMenuOpened: !this.state.isMenuOpened,
              openedSubmenu: this.state.isMenuOpened ? false : this.state.openedSubmenu
            })
          }}
        />
        <HamburgerButtonLabel htmlFor='menu-btn'>
          <HamburgerButtonIcon />
        </HamburgerButtonLabel>
        <NavMenuList>
          {
            globalNavigationMenu.map(({ title, intlKey, link, basePath, submenu }) =>
              submenu
                ? <NavItem key={intlKey}>
                  <SubmenuButtonCheckbox
                    type='checkbox'
                    id={intlKey}
                    checked={this.state.openedSubmenu === intlKey}
                    onChange={() => this.toggleSubmenu(intlKey)}
                  />
                  <SubmenuButtonLabel htmlFor={intlKey}>
                    <SubmenuButtonSpan isActive={this.props.router.pathname.startsWith(basePath)}>
                      {intl.get(intlKey).d(title)}
                    </SubmenuButtonSpan>
                  </SubmenuButtonLabel>
                  <Caret />
                  <SubmenuList>
                    {submenu.map(({ title, intlKey, link }) =>
                      <SubmenuItem key={intlKey}><SubmenuItemLink
                        to={link}
                        intlKey={intlKey}
                        name={title}
                        currentPath={this.props.router.pathname}
                      /></SubmenuItem>
                    )}
                  </SubmenuList>
                </NavItem>
                : <NavItem key={intlKey}>
                  <NavLink
                    to={link}
                    intlKey={intlKey}
                    name={title}
                    currentPath={this.props.router.pathname}
                    basePath={link}
                  />
                </NavItem>
            )
          }
        </NavMenuList>
      </NavWrapper>
    )
  }
}

export default withRouter(Navigation)
