import {css} from '@emotion/core'
import { CORAL } from 'styles/colors'

export const commonCSS = css`
  html {
    background-color: ${CORAL};
  }
  * {
    box-sizing: border-box;
  }
  body {
    background-color: white;
    word-break: keep-all;
    font-family: "Helvetica Neue", "Apple SD Gothic Neo", arial,
      나눔고딕, "Nanum Gothic", 돋움, Dotum, Tahoma, Geneva, sans-serif;
    color: #333333;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    &.font-loaded {
      font-family: "Spoqa Han Sans", "Helvetica Neue",
      "Apple SD Gothic Neo", arial, 나눔고딕, "Nanum Gothic",
      돋움, Dotum, Tahoma, Geneva, sans-serif;
    }
  }
  a:any-link,
  a:any-link:link,
  a:any-link:visited,
  a:any-link:hover,
  a:any-link:active,
  a:any-link:focus {
    color: inherit;
  }
`
