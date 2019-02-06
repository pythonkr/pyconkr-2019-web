import { injectGlobal } from 'emotion'
import React from 'react'

injectGlobal`
  html, body {
    padding: 3rem 1rem;
    margin: 0;
    background: papayawhip;
    min-height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 24px;
  }
`

export type PageTemplatePropsType = {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}
const PageTemplate = ({
  header,
  footer,
  children,
}: PageTemplatePropsType) => (<React.Fragment>
  {header}
  {children}
  {footer}
</React.Fragment>)

export default PageTemplate
