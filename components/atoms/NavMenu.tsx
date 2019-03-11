import styled from '@emotion/styled'
import React, { ComponentProps } from 'react'
import intl from 'react-intl-universal'

const NavMenuButton = styled.button`
  display: inline-flex;
  height: 60px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
`

export interface NavMenuPropsType extends ComponentProps<'button'> {
  intlKey: string
  name: string
}

const NavMenu: React.SFC<NavMenuPropsType> = ({ intlKey, name }) => {
  return (
    <NavMenuButton><span>{
      intl
        .get(intlKey)
        .defaultMessage(name)
    }</span></NavMenuButton>
  )
}

export default NavMenu
