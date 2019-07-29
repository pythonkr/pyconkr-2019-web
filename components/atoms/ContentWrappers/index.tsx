import styled from '@emotion/styled'
import {
  DEFAULT_TEXT_BLACK,
  FORM_LABEL_GRAY,
  HEADING_LIGHT_BLACK,
  TEAL,
  TEAL_LIGHT,
  TEAL_LIGHT_LIGHT,
  TEAL_SEMI_DARK
} from 'styles/colors'
import { contentWidth, contentWidthPadding, mobileWidth } from 'styles/layout'

/* tslint:disable:max-line-length */

/**
 * classnames
 */
export const isActive = 'active'
export const isHeader = 'header'
export const isDisabled = 'disabled'
export const isBold = 'bold'
export const isSmall = 'small'
export const alignCenter = 'align-center'
export const verticalAlignTop = 'align-top'

export const ContentWrapper = styled.main`
  min-height: 900px;
  width: 100%;
  max-width: ${contentWidth};
  // padding: 10px ${contentWidthPadding} 63px;
  padding: 10px ${contentWidthPadding} 200px;
  margin: 0 auto;
`

export const Section = styled.section`
margin: 70px 0;
@media (max-width: ${mobileWidth}) {
  margin: 50px 0;
}
`

export const H1 = styled.h1`
  font-size: 46px;
  font-weight: 700;
  line-height: 1.4;
  color: ${HEADING_LIGHT_BLACK};
  text-align: center;
  width: 100%;
  margin: 100px auto;
  max-width: 500px;
  @media (max-width: ${mobileWidth}) {
    font-size: 40px;
    margin: 70px auto 60px;
  }
`

export const H2 = styled.h2`
font-size: 26px;
font-weight: 700;
line-height: 1.08;
margin: 20px 0;
color: ${TEAL};
@media (max-width: ${mobileWidth}) {
  font-size: 24px;
  line-height: 1.4;
}
`

export const H3 = styled.h3`
font-size: 20px;
font-weight: 700;
line-height: 1.4;
margin: 34px 0 5px;
color: ${TEAL};
@media (max-width: ${mobileWidth}) {
  font-size: 18px;
  margin: 10px 0 5px;
}
`

export const Paragraph: any = styled.p`
font-size: 17px;
line-height: 33px;
margin: 20px 0;
white-space: pre-wrap;

@media (max-width: ${mobileWidth}) {
  font-size: 16px;
  line-height: 1.9em;
  ${H1} + & {
    margin-top: 17px;
  }

  ${H2} + & {
    margin-top: 17px;
  }

  ${H3} + & {
    margin-top: 10px;
  }
}

${H1} + & {
  margin-top: 20px;
}

${H2} + & {
  margin-top: 20px;
}

${H3} + & {
  margin-top: 12px;
}
`

export const Paragraph2: any = styled.p`
font-size: 17px;
line-height: 33px;

@media (max-width: ${mobileWidth}) {
  font-size: 16px;
  line-height: 1.9em;
  ${H1} + & {
    margin-top: 17px;
  }

  ${H2} + & {
    margin-top: 17px;
  }

  ${H3} + & {
    margin-top: 10px;
  }
}

${H1} + & {
  margin-top: 20px;
}

${H2} + & {
  margin-top: 20px;
}

${H3} + & {
  margin-top: 12px;
}
`

export const ContentButtonWrapper = styled.div`
padding-top: 50px;
padding-bottom: 20px;
text-align: center;
@media (max-width: ${mobileWidth}) {
  padding-top: 35px;
}
`

/********************************* Table ***********************************/

export const ContentTableWrapper = styled.div`
padding: 10px 0;
${H1} ~ & {
  margin-top: 40px;
}
`

export const Table = styled.table`
width: 100%;
border-collapse: collapse;
border: none;
${Paragraph} + table {
  margin-top: 50px;
}
`

export const ScheduleTable = styled(Table)`
max-width: 518px;
`

export const TableWithBg = styled(Table)`
//
`

export const THead = styled.thead`
font-size: 14px;
`

export const TBody = styled.tbody`
border-top: solid 2px ${TEAL};
border-bottom: solid 1px #dfe3e6;
`

export const Tr = styled.tr`
border-top: solid 1px #dfe3e6;

${THead} & {
  border-top: 0;
}

&.${isActive} {
  background-color: ${TEAL_LIGHT};
}

&.${isDisabled} {
  background-color: rgba(57, 57, 57, 0.1);
}

@media (max-width: ${mobileWidth}) {
  padding: 10px 0;
}
`

export const Th = styled.th`
vertical-align: middle;
padding: 21px 0 18px;
text-align: left;
font-weight: 700;

${THead} & {
  padding-bottom: 12px;
  text-align: left;
}

&.${alignCenter} {
  text-align: center;
}

.${isActive} & {
  font-weight: bold;
  color: ${TEAL_SEMI_DARK};
}
`

export const Td = styled.td`
  vertical-align: top;
  font-size: 15px;
  line-height: 24px;
  color: ${DEFAULT_TEXT_BLACK};
  padding: 14px 0.5em 14px 0.5em;
  white-space: pre-wrap;
  @media (max-width: ${mobileWidth}) {
    font-size: 13px;
    line-height: 1.4em;
    // display: block;
    // padding: 0 15px;
    // margin: 10px 0;
    // &:first-of-type {
    //   margin-top: 20px;
    // }
    // &:last-of-type {
    //   margin-bottom: 20px;
    // }
  }

  ${TableWithBg} & {
    padding-left: 29px;
    @media (max-width: ${mobileWidth}) {
      padding-left: 0.5em;
    }
  }

  &.${alignCenter} {
    text-align: center;
  }

  &.${verticalAlignTop}, .${verticalAlignTop} & {
    vertical-align: top;
  }

  &.${isBold} {
    font-weight: 700;
    color: ${HEADING_LIGHT_BLACK};
  }

  &.${isHeader} {
    font-weight: bold;
    color: ${TEAL_SEMI_DARK};
    background-color: ${TEAL_LIGHT};
    text-align: right;
  }

  .${isActive} & {
    font-weight: bold;
    color: ${TEAL_SEMI_DARK};
  }

  &.${isSmall}, .${isSmall} & {
    font-size: 14px;
    line-height:2;
  }

  .${isDisabled} & {
    color: #a2a7aa;
  }
`
/********************************* Table Style List ***********************************/
export const TableList = styled.ul`
width: 100%;
border-top: solid 2px ${TEAL};
border-bottom: solid 1px #dfe3e6;
${Paragraph} + & {
  margin-top: 50px;
}
`
export const TableListRow = styled.li`
border-top: solid 1px #dfe3e6;
display: flex;

&.${isActive} {
  background-color: ${TEAL_LIGHT};
}

&.${isDisabled} {
  background-color: rgba(57, 57, 57, 0.1);
}
`

export const TableListRowContent = styled.span`
  vertical-align: top;
  font-size: 15px;
  line-height: 24px;
  color: ${props => props.color || DEFAULT_TEXT_BLACK};
  padding: 14px 1.2em 14px 1.2em;
  white-space: pre-wrap;

  @media (max-width: ${mobileWidth}) {
    font-size: 13px;
    line-height: 1.4em;
    padding: 14px 0.8em 14px 0.8em;
  }

  &.${alignCenter} {
    text-align: center;
  }

  &.${verticalAlignTop}, .${verticalAlignTop} & {
    vertical-align: top;
  }

  &.${isBold} {
    font-weight: 700;
    color: ${HEADING_LIGHT_BLACK};
  }

  &.${isHeader} {
    font-weight: bold;
    color: ${TEAL_SEMI_DARK};
    background-color: ${TEAL_LIGHT};
    text-align: right;
    width: ${props => props.width || '140px'};
    @media (max-width: ${mobileWidth}) {
      width: ${props => props.width || '80px'};
    }
  }

  &:not(.${isHeader}) {
    flex: 1;
  }

  .${isActive} & {
    font-weight: bold;
    color: ${TEAL_SEMI_DARK};
  }

  &.${isSmall}, .${isSmall} & {
    font-size: 14px;
    line-height:2;
  }

  .${isDisabled} & {
    color: #a2a7aa;
  }
`

/********************************* List ***********************************/

export const Ul = styled.ul`
margin: 20px 0;
`
export const Ol = styled.ol`
margin: 20px 0;
counter-reset: my-awesome-counter;
`
export const Li = styled.li`
font-size: 16px;
line-height: 2;
margin: 9px 0;
padding-left: 50px;
position: relative;

${Ul} > & {
  &:before {
    content: '';
    width: 7px;
    height: 7px;
    background-color: ${TEAL};
    position: absolute;
    left: 30px;
    top: 15px;
    border-radius: 50%;
  }
}

${Ol} > & {
  counter-increment: my-awesome-counter;
  &:before {
    content: counter(my-awesome-counter) ". ";
    color: ${TEAL};
    font-weight: 700;
    position: absolute;
    left: 30px;
    top: 0;
  }
}
`

/********************************* Form ***********************************/

export const AgreementFieldset = styled.fieldset``
export const PaymentInput = styled.input``
export const SelectWrapper = styled.div`
position: relative;

&::after {
  content: '';
  position: absolute;
  right: 16px;
  top: 22px;
  width: 20px;
  height: 20px;
  height: 20px;
  width: 20px;
  margin: -4px;
  margin-left: 20px;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgNDggNDgiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6ICNhYWFmYjM7CiAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkOwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8ZyBpZD0iYXJ0Ym9hcmQtMSI+CiAgICA8cGF0aCBkPSJNNDEuMzgwLDIxLjUyNCBMMjUuNzIwLDM3LjIxOCBDMjUuNjc1LDM3LjI3MyAyNS42NTUsMzcuMzQwIDI1LjYwMywzNy4zOTEgQzI1LjE4OCwzNy44MDIgMjQuNjQyLDM3Ljk5OSAyNC4wOTgsMzcuOTkwIEMyMy41NTYsMzcuOTk1IDIzLjAxMywzNy43OTIgMjIuNjAwLDM3LjM3OCBDMjIuNTU3LDM3LjMzNSAyMi41NDMsMzcuMjc5IDIyLjUwNSwzNy4yMzUgTDYuNTUyLDIxLjQ1NCBDNS43NDAsMjAuNjUxIDUuNzQwLDE5LjM0OSA2LjU1MiwxOC41NDYgQzcuMzY0LDE3Ljc0MyA4LjY4MCwxNy43NDMgOS40OTIsMTguNTQ2IEwyNC4wNTUsMzIuOTUyIEwzOC40MjAsMTguNTU3IEMzOS4yMzcsMTcuNzM3IDQwLjU2MywxNy43MzcgNDEuMzgwLDE4LjU1NyBDNDIuMTk4LDE5LjM3NiA0Mi4xOTgsMjAuNzA1IDQxLjM4MCwyMS41MjQgWiIgY2xhc3M9ImNscy0xIi8+CiAgPC9nPgo8L3N2Zz4=") no-repeat;
  background-size: 100%;
}
`

export const FormWrapper = styled.div`
background: ${(props) => props.color ? props.color : TEAL_LIGHT_LIGHT};
padding: 44px 41px 60px 51px;
@media (max-width: ${mobileWidth}) {
  padding: 35px 15px 60px;
}

p {
  font-size: 14px;
  line-height: 1.8;
  color: ${HEADING_LIGHT_BLACK};
}

label + p {
  margin-bottom: 8px;
}

label {
  display: block;
  padding: 7px 0;
  font-size: 14px;
  line-height: 29px;
  color: ${HEADING_LIGHT_BLACK};
  font-weight: 700;
}

form label {
  display: block;
  padding: 7px 0;
  font-size: 14px;
  line-height: 29px;
  color: ${FORM_LABEL_GRAY};
  font-weight: 500;
}

.required {
  position: relative;

  &:after {
    position: absolute;
    content: '✦';
    color: red;
    padding-left: 5px;
    font-size: 10px;
    top: 6px;

    @media (max-width: ${mobileWidth}) {
      position: unset;
    }
  }
}

input[type=file] {
    margin-bottom: 39px;
    padding: 17px 31px;
    outline: none;
}

input[type=text],
input[type=password],
input[type=email],
input[type=tel],
input[type=url],
textarea,
select {
    width: 100%;
    height: 58px;
    margin-bottom: 40px;
    padding: 17px 21px;
    border-radius: 4px;
    border: solid 1px #ced3d6;
    background-color: white;
    font-size: 17px;
    line-height: 1.8;
    outline: none;

    &:focus {
      border: solid 1px ${TEAL};
    }

    &:disabled {
      border: solid 1px #eaeeef;
      background-color: #f7f7f7;
    }
}

textarea {
  height: 141px;
  resize: vertical;
}

select {
  appearance: none;
  padding: 0 21px;
}

.file-upload__label {
    display: block;
    width: 160px;
    margin: 5px 0 34px 0;
    border: solid 1px ${TEAL};
    border-radius: 2px;
    text-align: center;
    color: ${TEAL};
    position: relative;

    &:hover {
        cursor: pointer;
    }
}

.file-upload__input {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 1;
    width: 0;
    height: 100%;
    opacity: 0;
    pointer-events: none;
}

div[role='group'] {
  display: flex;
  flex-direction: row;
}

input[type="radio"],
input[type="checkbox"] {
  margin: 12px 0 8px;
  border: 0px;
  width: 20px;
  height: 20px;

  & + label {
    display: inline-block;
    font-size: 17px;
    line-height: 20px;
    font-weight: 400;
    color: ${DEFAULT_TEXT_BLACK};
    cursor: pointer;
    padding: 10px;
    vertical-align: top;
  }
}

fieldset {
  // width: 50%;
  margin-bottom: 40px;

  legend {
    display: block;
    padding: 7px 0;
    font-size: 14px;
    line-height: 29px;
    font-weight: 700;
    color: ${HEADING_LIGHT_BLACK};
  }
}

hr {
  border: none;
  height: 1px;
  background: #e1e4e6;
  width: 100%;
  margin: 50px auto 50px;
}

hr.margin-20 {
  margin: 20px auto 20px;
}


${AgreementFieldset} {
  width: 100%;

  p {
    color: ${HEADING_LIGHT_BLACK};
    font-size: 16px;
    line-height: 30px;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  input[type="checkbox"] {
    margin: 18px 0 8px;
  }

  input[type="checkbox"] + label {
    width: 95%;
    line-height: 1.8;
    font-weight: 700;
    font-size: 16px;

    @media (max-width: ${mobileWidth}) {
      width: 90%;
    }
  }

  ul {
    margin-bottom: 16px;
  }

  li {
    line-height: 30px;
    color: ${HEADING_LIGHT_BLACK};
    margin: 9px 0;
    padding-left: 40px;
    position: relative;

    &:before {
      content: '';
      width: 6px;
      height: 6px;
      background-color: ${TEAL};
      position: absolute;
      left: 22px;
      top: 14px;
      border-radius: 50%;
    }
  }
}

${PaymentInput} {
width: 80px;
textAlign: center;
font-size: 20px;
letter-spacing: 3px;
margin-right: 10px;
}

.full {
    width: 100%;
}

.half {
    width: 50%;
}
`

export const InputDesc = styled.div`
color: ${FORM_LABEL_GRAY};
font-size: 12px;
line-height: 1.8;
margin-bottom: 5px;
}`