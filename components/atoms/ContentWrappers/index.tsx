import styled from '@emotion/styled'
import { TEAL, HEADING_LIGHT_BLACK, DEFAULT_TEXT_BLACK, TEAL_LIGHT, TEAL_SEMI_DARK } from 'styles/colors'
import { contentWidth, contentWidthPadding, mobileWidth } from 'styles/layout'

/**
 * classnames
 */
export const isActive = 'active'
export const isDisabled = 'disabled'
export const isBold = 'bold'
export const isSmall = 'small'
export const alignCenter = 'align-center'
export const verticalAlignTop = 'align-top'

export const ContentWrapper = styled.main`
  min-height: 900px;
  width: 100%;
  max-width: ${contentWidth};
  padding: 10px ${contentWidthPadding} 63px;
  margin: 0 auto;
`

export const Section = styled.section`
margin: 100px 0;
@media (max-width: ${mobileWidth}) {
  margin: 70px 0;
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
}
`

export const Paragraph = styled.p`
font-size: 17px;
line-height: 33px;
margin: 20px 0;

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
  padding: 14px 0.5em 14px 0;

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
