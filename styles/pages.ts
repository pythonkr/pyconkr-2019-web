import styled from '@emotion/styled'
import { ContentWidthWrapper } from 'components/atoms/ContentWidthWrapper'
import { TEAL_DARK, TEAL_SEMI_DARK } from 'styles/colors'

export const ContentWrapper = styled(ContentWidthWrapper)`
  min-height: 900px;
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
    width: 100%;
    // margin: 0 auto;
    border-collapse: collapse;
  }

  thead {

  }

  tr {
    border-top: solid 1px #dfe3e6;
    border-bottom: solid 1px #dfe3e6;
    color: #152935;
  }

  // tr {
  //   border-top: solid 1px rgba(85, 150, 230, 0.1);;
  //   border-bottom: solid 1px #dfe3e6;
  //   background: rgba(85, 150, 230, 0.1);
  //   color: #3d70b2;
  //   font-weight: bold;
  // }

  // tr {
  //   border-top: solid 1px #dfe3e6;
  //   border-bottom: solid 1px #dfe3e6;
  //   background: rgba(57, 57, 57, 0.1);
  //   color: #70777b;
  //   font-weight: bold;
  // }

  td {
  }
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
`
