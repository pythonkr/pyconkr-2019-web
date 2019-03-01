import styled from '@emotion/styled';
import { ContentWidthWrapper } from 'components/atoms/ContentWidthWrapper';
import { injectGlobal } from 'emotion'
import emotionReset from 'emotion-reset'
import fontCSS from 'styles/font'
import React from 'react'

injectGlobal`
  ${emotionReset}
  ${fontCSS}
  body {
    word-break: keep-all;
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Apple SD Gothic Neo", arial, 나눔고딕, "Nanum Gothic", 돋움, Dotum, Tahoma, Geneva, sans-serif;
    &.font-loaded {
      font-family: "Spoqa Han Sans", "Helvetica Neue", "Apple SD Gothic Neo", arial, 나눔고딕, "Nanum Gothic", 돋움, Dotum, Tahoma, Geneva, sans-serif;
    }
  }
  h1 {

  }
  h2 {

  }
  h3 {

  }
  p {
    font-size: 17px;
    line-height: 1.88;
    color: #333333;
  }
  table {

  }
  thead {

  }
  tr {

  }
  td {

  }
`

const ContentWrapper = styled(ContentWidthWrapper)`
  min-height: 900px;
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
