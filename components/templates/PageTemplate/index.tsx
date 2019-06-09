import { ContentWrapper } from 'components/atoms/ContentWrappers'
import React from 'react'
import SponsorBanners from 'components/organisms/SponsorBanners'

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
    {/* <SponsorBanners/> */}
  </ContentWrapper>
  
  {footer}
</React.Fragment>)

export default PageTemplate
