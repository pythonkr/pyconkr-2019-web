import styled from '@emotion/styled';
import { ContentWidthWrapper } from 'components/atoms/ContentWidthWrapper';
import { injectGlobal } from 'emotion';
import emotionReset from 'emotion-reset';
import React from 'react';
import { commonCSS } from 'styles/common';
import { fontCSS } from 'styles/font';
import { pagesCSS } from 'styles/pages';

const ContentWrapper = styled(ContentWidthWrapper)`
  min-height: 900px;
`
injectGlobal`
  ${emotionReset}
  ${fontCSS}
  ${commonCSS}
  ${pagesCSS}
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
  <ContentWrapper>
    {children}
  </ContentWrapper>
  {footer}
</React.Fragment>)

export default PageTemplate
