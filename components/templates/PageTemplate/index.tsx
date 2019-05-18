import { ContentWrapper } from 'components/atoms/ContentWrappers'
import React from 'react'

export type PageTemplatePropsType = {
  header: React.ReactNode;
  footer: React.ReactNode;
  sponsorBanners: React.ReactNode;
  children: React.ReactNode;
}
const PageTemplate = ({
  header,
  footer,
  children,
  sponsorBanners,
}: PageTemplatePropsType) => (<React.Fragment>
  {header}
  <ContentWrapper>
    {children}
  </ContentWrapper>
  {sponsorBanners}
  {footer}
</React.Fragment>)

export default PageTemplate
