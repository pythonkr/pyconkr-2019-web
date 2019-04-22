import React, { PropsWithChildren } from 'react'
import intl from 'react-intl-universal'

interface Props {
  intlKey: string
}

export const IntlText: React.SFC<PropsWithChildren<Props>> = ({ intlKey, children }) => {
  return (
    <>
      {intl.getHTML(intlKey).defaultMessage(children as string | JSX.Element)}
    </>
  )
}
