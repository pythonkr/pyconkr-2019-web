import {css} from '@emotion/core'
import { CORAL } from 'styles/colors'

export const commonCSS = css`
  html {
    background-color: ${CORAL};
  }
  body {
    background-color: white;
    word-break: keep-all;
    box-sizing: border-box;
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
`
