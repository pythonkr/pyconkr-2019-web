import styled from '@emotion/styled'
import AccountMenuButton from 'components/atoms/AccountMenuButton'
import { Button } from 'components/atoms/Button'
import NavLink from 'components/atoms/NavLink'
import NavMenuSubLink from 'components/atoms/NavMenuSubLink'
import { PyConKRLogo } from 'components/atoms/SVG'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import intl from 'react-intl-universal'
import { globalNavigationMenu } from 'routes/paths'
import { CORAL, CORAL_LIGHT, FORM_LABEL_GRAY_LIGHT } from 'styles/colors'
import { mobileGnbWidth, mobileWidth, navigationPadding } from 'styles/layout'
import { withNamespaces } from '../../../i18n'

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${navigationPadding};
  background-color: white;
  box-sizing: border-box;
  border-bottom: solid 2px ${CORAL_LIGHT};
  z-index: 100;
  @media (max-width: ${mobileGnbWidth}) {
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
padding: 30px 20px;
position: relative;
user-select: none;
z-index: 200;
order: 1;
@media (min-width: ${mobileGnbWidth}) {
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
// order: 2;
margin-left: auto;
margin-right: 30px;

@media (max-width: ${mobileGnbWidth}) {
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
export const NavItem = styled.li`
  display: inline-block;
  position: relative;
  margin: 0 10px;
  font-size: 14px;
  @media (max-width: ${mobileGnbWidth}) {
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
export const SubmenuButtonCheckbox = styled.input`
display: none;
`
export const SubmenuButtonLabel = styled.label`
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
export const SubmenuButtonSpan = styled.span`
font-size: 16px;
padding: 10px 0;
font-weight: ${(props: { isActive: boolean }) => props.isActive ? '700' : 'normal'};
border-bottom: ${(props: { isActive: boolean }) => `solid 2px ${props.isActive ? CORAL : 'rgba(1, 1, 1, 0)'}`};
@media (max-width: ${mobileGnbWidth}) {
  margin: 10px 0;
  padding: 0;
  margin-bottom: ${(props: { isActive: boolean }) => props.isActive ? '30px' : '10px'};
}
`
export const Caret = styled.span`
display: inline-block;
vertical-align: middle;
width: 0;
height: 0;
margin: 0 0 3px 5px;
border-style: solid;
border-width: 6px 6px 0 6px;
border-color: rgba(255, 255, 255, 0.75) transparent transparent transparent;

@media (max-width: ${mobileGnbWidth}) {
  position: absolute;
  right: 10%;
  top: 35px;
}
@media (min-width: ${mobileGnbWidth}) {
  border-color: rgba(0, 0, 0, 0.75) transparent transparent transparent;
}
${SubmenuButtonCheckbox}:checked ~ & {
  margin: 0 0 5px 5px;
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent rgba(255, 255, 255, 0.75) transparent;
  @media (min-width: ${mobileGnbWidth}) {
    border-color: transparent transparent rgba(0, 0, 0, 0.75) transparent;
  }
}
`
export const SubmenuList = styled.ul`
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

  @media (min-width: ${mobileGnbWidth}) {
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
const SubmenuGroup = styled.ul``
export const SubmenuItem = styled.li`
@media (max-width: ${mobileGnbWidth}) {
  padding: ${props => props.border ? '10px' : '2px'} 0;
  &:last-of-type {
    padding-bottom: 10px;
  }
}
border-bottom: ${props => props.border ? `solid 1px ${FORM_LABEL_GRAY_LIGHT}` : 'none'};
&:last-of-type {
  border-bottom: none;
}
${SubmenuGroup} > &:last-of-type {
  padding-bottom: 10px;
}
`
export const SubmenuItemLink = styled(NavMenuSubLink)`
padding: ${props => props.border ? '14px' : '10px'} 0;
@media (max-width: ${mobileGnbWidth}) {
  padding: ${props => props.border ? '24px' : '20px'} 0;
}
`

export const TicketsButtonWrapper = styled.div`
  display: block;
  vertical-align: middle;
  display: flex;
  align-items: center;
  margin-right: 20px;
  order: 2;
  @media (max-width: ${mobileGnbWidth}) {
    margin-right: 0;
    margin-left: auto;
    order: 1;
  }
`

export const TicketsButton = styled(Button)`
  width: 140px;
  height: 38px;

  span {
    font-size: 15px;
    font-weight: bold;
  }

  @media (max-width: ${mobileWidth}) {
    width: 80px;
    height: 30px;

    span {
      font-size: 12px;
    }
  }
`

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

  toggleHambugerCheckbox = () => {
    const { isMenuOpened, openedSubmenu } = this.state
    this.setState({
      isMenuOpened: !isMenuOpened,
      openedSubmenu: isMenuOpened ? false : openedSubmenu
    })
  }

  render() {
    const { router, t } = this.props
    const { isMenuOpened, openedSubmenu } = this.state

    return (
      <NavWrapper>
        <ul>
          <NavItem>
            <Link href='/'>
              <HeaderLogo>
                <PyConKRLogo
                  width={139}
                  height={37}
                />
              </HeaderLogo>
            </Link>
          </NavItem>
        </ul>
        <TicketsButtonWrapper>
          <TicketsButton
            size='small'
            height={27}
            title={t('gnb:ticket')}
            to={'/ticket/overview'}
          >
          </TicketsButton>
        </TicketsButtonWrapper>
        <HamburgerCheckbox
          type='checkbox'
          id='menu-btn'
          checked={isMenuOpened}
          onChange={this.toggleHambugerCheckbox}
        />
        <HamburgerButtonLabel htmlFor='menu-btn'>
          <HamburgerButtonIcon />
        </HamburgerButtonLabel>
        <NavMenuList>
          {
            globalNavigationMenu.map(({ title, intlKey, link, basePath, submenu }) => submenu
                ? <NavItem key={intlKey}>
                    <SubmenuButtonCheckbox
                      type='checkbox'
                      id={intlKey}
                      checked={openedSubmenu === intlKey}
                      onChange={() => this.toggleSubmenu(intlKey)}
                    />
                    <SubmenuButtonLabel htmlFor={intlKey}>
                      <SubmenuButtonSpan isActive={router.pathname.startsWith(basePath)}>
                      {intl.get(intlKey).d(title)}
                      </SubmenuButtonSpan>
                    </SubmenuButtonLabel>
                    <Caret />
                    <SubmenuList>
                    {submenu.map(({ title, intlKey, link, submenu: subsubmenu }) =>
                      subsubmenu
                        ? <SubmenuItem key={intlKey} border={submenu.some(item => !!item.submenu)}><SubmenuGroup>{subsubmenu.map(subsubmenuItem => <SubmenuItem key={subsubmenuItem.intlKey}>
                          <SubmenuItemLink
                            to={subsubmenuItem.link}
                            intlKey={subsubmenuItem.intlKey}
                            name={subsubmenuItem.title}
                            currentPath={router.pathname}
                          />
                        </SubmenuItem>)}</SubmenuGroup></SubmenuItem>
                        : <SubmenuItem key={intlKey} border={submenu.some(item => !!item.submenu)}>
                          <SubmenuItemLink
                            to={link}
                            intlKey={intlKey}
                            name={title}
                            currentPath={router.pathname}
                            border={submenu.some(item => !!item.submenu)}
                          />
                        </SubmenuItem>
                    )}
                    </SubmenuList>
                  </NavItem>
                : <NavItem key={intlKey}>
                    <NavLink
                      to={link}
                      intlKey={intlKey}
                      name={title}
                      currentPath={router.pathname}
                      basePath={link}
                    />
                  </NavItem>
            )
          }
          <AccountMenuButton
            openedSubmenu={this.state.openedSubmenu}
            toggleSubmenu={this.toggleSubmenu}
          />
        </NavMenuList>
      </NavWrapper>
    )
  }
}
export default withNamespaces(['gnb'])(withRouter(Navigation))
