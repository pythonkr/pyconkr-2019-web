import { ContentWrapper } from 'components/atoms/ContentWrappers'
import SponsorBanners from 'components/organisms/SponsorBanners'
import React from 'react'

export type PageTemplatePropsType = {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export class PageTemplate extends React.Component<PageTemplatePropsType> {
 render() {
   const { header, children, footer } = this.props

   return (
    <>
      {header}
      <ContentWrapper>
        {children}
        <SponsorBanners/>
      </ContentWrapper>
      {footer}
    </>
   )
 }
}

export default PageTemplate
