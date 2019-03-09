import React, { ComponentProps } from 'react'
import intl from 'react-intl-universal'

interface Props {
  intlKey: string
}

export function withIntl<P extends keyof JSX.IntrinsicElements>(
  Component: keyof JSX.IntrinsicElements
): React.SFC<ComponentProps<P> & Props> {
  return ({ intlKey, children, ...props }) => {
    return <Component {...props} > {
      intl
        .get(intlKey)
        .defaultMessage(children as string | JSX.Element)
    }</ Component>
  }
}

export const H1 = withIntl('h1')
export const H2 = withIntl('h2')
export const H3 = withIntl('h3')
export const Paragraph = withIntl('p')
export const Span = withIntl('span')
