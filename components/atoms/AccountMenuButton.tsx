import { Loading } from 'components/atoms/Loading'
import NavLink from 'components/atoms/NavLink'
import {
  Caret, NavItem, SubmenuButtonCheckbox, SubmenuButtonLabel, SubmenuButtonSpan,
  SubmenuItem, SubmenuItemLink, SubmenuList
} from 'components/molecules/GlobalNavigation'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import React from 'react'
import intl from 'react-intl-universal'
import { accountMenu, loginMenu } from 'routes/paths'

@inject('stores')
@(withRouter as any)
@observer
class AccountMenuButton extends React.Component<any> {
  render() {
    const { stores } = this.props

    if (
      !stores ||
      !stores.authStore ||
      !stores.authStore.isInitialized
    ) {
      return <NavItem style={{ width: '84.75px' }}>
        <Loading width={16} height={16} />
      </NavItem>
    }

    if (!stores.authStore.loggedIn) {
      return <NavItem key={loginMenu.intlKey}>
        <NavLink
          to={`${loginMenu.link}?redirect_url=${this.props.router.route}`}
          intlKey={loginMenu.intlKey}
          name={loginMenu.title}
          currentPath={this.props.router.pathname}
          basePath={loginMenu.link}
        />
      </NavItem>
    }

    return <NavItem key={accountMenu.intlKey}>
      <SubmenuButtonCheckbox
        type='checkbox'
        id={accountMenu.intlKey}
        checked={this.props.openedSubmenu === accountMenu.intlKey}
        onChange={() => this.props.toggleSubmenu(accountMenu.intlKey)}
      />
      <SubmenuButtonLabel htmlFor={accountMenu.intlKey}>
        <SubmenuButtonSpan isActive={this.props.router.pathname.startsWith(accountMenu.basePath)}>
          {intl.get(accountMenu.intlKey).d(accountMenu.title)}
        </SubmenuButtonSpan>
      </SubmenuButtonLabel>
      <Caret />
      <SubmenuList>
        {accountMenu.submenu.map(({ title, intlKey, link }) =>
          <SubmenuItem key={intlKey}><SubmenuItemLink
            to={link}
            intlKey={intlKey}
            name={title }
            currentPath={this.props.router.pathname}
          /></SubmenuItem>
        )}
      </SubmenuList>
    </NavItem>
  }
}

export default AccountMenuButton
