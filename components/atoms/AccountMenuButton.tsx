import { Loading } from 'components/atoms/Loading'
import NavLink from 'components/atoms/NavLink'
import {
  Caret, NavItem, SubmenuButtonCheckbox, SubmenuButtonLabel, SubmenuButtonSpan,
  SubmenuItem, SubmenuItemLink, SubmenuList
} from 'components/molecules/GlobalNavigation'
import { inject, observer } from 'mobx-react'
import { RouterProps, withRouter } from 'next/router'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'
import { accountMenu, loginMenu } from 'routes/paths'

type PropsType = {
  stores: StoresType;
  router: RouterProps;
  openedSubmenu: string | null;
  toggleSubmenu(menuKey: string): void;
}

@inject('stores')
@(withRouter as any)
@observer
class AccountMenuButton extends React.Component<PropsType> {
  render() {
    const { stores, toggleSubmenu, openedSubmenu, router } = this.props
    const isAuthStoreInitilized = stores && stores.authStore && stores.authStore.isInitialized
    const isLoggedIn = stores && stores.authStore && stores.authStore.loggedIn

    if (!isAuthStoreInitilized) {
      return (
        <NavItem style={{ width: '84.75px' }}>
          <Loading width={16} height={16} />
        </NavItem>
      )
    }

    if (!isLoggedIn) {
      return (
        <NavItem key={loginMenu.intlKey}>
          <NavLink
            to={`${loginMenu.link}?redirect_url=${router.route}`}
            intlKey={loginMenu.intlKey}
            name={loginMenu.title}
            currentPath={router.pathname}
            basePath={loginMenu.link}
          />
        </NavItem>
      )
    }

    return (
      <NavItem key={accountMenu.intlKey} >
        <SubmenuButtonCheckbox
          type='checkbox'
          id={accountMenu.intlKey}
          checked={openedSubmenu === accountMenu.intlKey}
          onChange={() => toggleSubmenu(accountMenu.intlKey)}
        />
        <SubmenuButtonLabel htmlFor={accountMenu.intlKey}>
          <SubmenuButtonSpan isActive={router.pathname.startsWith(accountMenu.basePath)}>
            {intl.get(accountMenu.intlKey).d(accountMenu.title)}
          </SubmenuButtonSpan>
        </SubmenuButtonLabel>
        <Caret />
        <SubmenuList>
          {accountMenu.submenu.map(({ title, intlKey, link }) =>
            <SubmenuItem key={intlKey}>
              <SubmenuItemLink
                to={link}
                intlKey={intlKey}
                name={title }
                currentPath={router.pathname}
              />
            </SubmenuItem>
          )}
        </SubmenuList>
      </NavItem >
    )
  }
}

export default AccountMenuButton
