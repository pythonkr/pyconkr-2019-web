import React from 'react'
import { injectGlobal } from 'emotion'
import emotionReset from 'emotion-reset'
import styled from '@emotion/styled';
import { ContentWidthWrapper } from 'components/atoms/ContentWidthWrapper';

injectGlobal`
  ${emotionReset}
`

const ContentWrapper = styled(ContentWidthWrapper)`
  min-height: 800px;
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
