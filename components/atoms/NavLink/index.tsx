import Link from 'next/link'
import React from 'react'

export type NavLinkPropsType = {
  to: string;
  name: string;
}
const NavLink = ({ to, name }: NavLinkPropsType) => {
  return <Link href={to}><a >{name}</a></Link>
}

export default NavLink
