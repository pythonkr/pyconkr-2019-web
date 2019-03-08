import React from 'react'
import { ContentWrapper } from 'components/atoms/ContentWrapper'

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
  <ContentWrapper>
    {children}
  </ContentWrapper>
  {footer}
</React.Fragment>)

export default PageTemplate
