import { ContentWrapper } from 'components/atoms/ContentWrappers'
import SponsorBannerSlide from 'components/organisms/SponsorBannerSlide'
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
      </ContentWrapper>
      <SponsorBannerSlide/>
      {footer}
    </>
   )
 }
}

export default PageTemplate
