import styled from '@emotion/styled';
import { ContentWidthWrapper } from 'components/atoms/ContentWidthWrapper';
import { injectGlobal } from 'emotion'
import emotionReset from 'emotion-reset'
import fontCSS from 'styles/font'
import React from 'react'
import { TEAL_DARK, TEAL_SEMI_DARK, CORAL } from 'styles/colors';


const ContentWrapper = styled(ContentWidthWrapper)`
  min-height: 900px;
`
injectGlobal`
  ${emotionReset}
  ${fontCSS}
  html {
    background-color: ${CORAL};
  }
  body {
    background-color: white;
    word-break: keep-all;
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Apple SD Gothic Neo", arial, 나눔고딕, "Nanum Gothic", 돋움, Dotum, Tahoma, Geneva, sans-serif;
    color: #333333;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    &.font-loaded {
      font-family: "Spoqa Han Sans", "Helvetica Neue", "Apple SD Gothic Neo", arial, 나눔고딕, "Nanum Gothic", 돋움, Dotum, Tahoma, Geneva, sans-serif;
    }
  }
  section {
    margin: 100px 0;
  }
  h1 {
    font-size: 46px;
    font-weight: 700;
    line-height: 1.26;
    color: #4a4a4a;
    text-align: center;
    width: 100%;
    margin: 100px 0;
  }
  h2 {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.08;
    margin: 20px 0;
    color: ${TEAL_DARK};
  }
  h3 {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    margin: 34px 0 5px;
    color: ${TEAL_DARK};
  }
  p {
    font-size: 17px;
    line-height: 1.88;
    margin: 10px 0;
    h1 + & {
      margin-top: 20px;
    }
    h2 + & {
      margin-top: 20px;
    }
    h3 + & {
      margin-top: 12px;
    }
  }
  table {

  }
  thead {

  }
  tr {

  }
  td {

  }
  ${ContentWrapper} {
    li {
      font-size: 16px;
      line-height: 2;
      margin: 9px 0;
    }
    ul, ol {
      margin: 20px 0;
    }
    ul > li {
      padding-left: 50px;
      position: relative;
      &:before {
        content: '';
        width: 7px;
        height: 7px;
        background-color: ${TEAL_SEMI_DARK};
        position: absolute;
        left: 30px;
        top: 15px;
        border-radius: 50%;
      }
    }
    ol {
      counter-reset: my-awesome-counter;
    }
    ol > li {
      padding-left: 50px;
      position: relative;
      counter-increment: my-awesome-counter;
      &:before {
        content: counter(my-awesome-counter) ". ";
        color: ${TEAL_SEMI_DARK};
        font-weight: 700;
        position: absolute;
        left: 30px;
        top: 0;
      }
    }
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
  <ContentWrapper>
    {children}
  </ContentWrapper>
  {footer}
</React.Fragment>)

export default PageTemplate
