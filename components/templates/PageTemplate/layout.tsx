import styled from '@emotion/styled';
import { ContentWidthWrapper } from 'components/atoms/ContentWidthWrapper';
import { injectGlobal } from 'emotion'
import emotionReset from 'emotion-reset'
import fontCSS from 'styles/font'
import React from 'react'
import { TEAL_DARK, TEAL_SEMI_DARK, CORAL } from 'styles/colors';


/**
 * 임시 메인 페이지 CSS
 * TODO:: Need Fix Convention && Extract Common Style, Layout && Responsive for mobile
 */

const ContentWrapper = styled(ContentWidthWrapper)`
  min-height: 900px;
  max-width: none;
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
  
  section.schedule {
    max-width: 1024px;
    margin: 0 auto;
    padding: 128px 0 116px 0;
  }
  
  section.schedule ul {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  section.schedule li {
    display: inline-block;
    list-style: none;
    width: calc(100% / 3);
    margin: 0;
    padding: 0;
    vertical-align: top;
  }
  
  section.schedule li h2 {
    font-size: 30px;
    line-height: 39px;
    font-weight: bold;
  }
  
  section.schedule li h3 {
    display: inline-block;
    margin-top: 10px;
    font-size: 20px;
    line-height: 39px;
    font-weight: bold;
  }
  
  section.schedule li span {
    font-size: 20px;
    line-height: 39px;
    font-weight: bold;
    color: #b4b4b4;
  }
  
  section.schedule li hr {
    max-width: 90%;
    height: 1px;
    margin: 10px 0 17px 0;
    border: none;
    background: #fcb5b5;
  }
  
  section.schedule li p {
    max-width: 85%;
    font-size: 15px;
    line-height: 1.8;
    color: #262626;
  }
  
  section.schedule li button.support {
    margin-top: 22px;
    width: 148px;
    height: 40px;
    border: solid 1px #263056;
    background-color: #354379;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
    outline: none;
  }
  
  //
  section.sponser {
    padding: 86px 0 73px 0;
    background-color: #fde5e3;
  }
  
  section.sponser h2 {
    font-size: 36px;
    line-height: 0.83;
    font-weight: bold;
    text-align: center;
    color: #4a4a4a;
  }
  
  section.sponser p {
    width: 700px;
    margin: 50px auto 63px;
    font-size: 17px;
    line-height: 1.88;
    color: #4a4a4a;
  }
  
  section.sponser button {
    display: block;
    width: 300px;
    height: 60px;
    margin: 0 auto;
    border: solid 2px #f95858;
    background: transparent;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #f95858;
    cursor: pointer;
    outline: none;
  }
  
  //
  section.introduce {
    max-width: 700px;
    padding: 155px 0 233px 0;
    margin: 0 auto;
  }
  
  section.introduce h2 {
    font-size: 26px;
    font-weight: bold;
    line-height: 1.08;
    color: #263056;
  }
  
  section.introduce p {
    font-size: 17px;
    line-height: 32px;
    color: #000000;
    margin-top: 30px;
  }
  
  section.introduce hr {
    border: none;
    height: 1px;
    background: #f95858;
    width: 100%;
    margin: 40px auto 58px;
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
