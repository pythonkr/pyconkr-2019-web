import styled from '@emotion/styled'
import { TEAL_DARK, TEAL_SEMI_DARK } from 'styles/colors'
import { contentWidth } from 'styles/layout'

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
  padding: 10px 15px 63px;
  margin: 0 auto;
`

export const Section = styled.section`
margin: 100px 0;
`

export const H1 = styled.h1`
  font-size: 46px;
  font-weight: 700;
  line-height: 1.26;
  color: #4a4a4a;
  text-align: center;
  width: 100%;
  margin: 100px 0;
`

export const H2 = styled.h2`
font-size: 26px;
font-weight: 700;
line-height: 1.08;
margin: 20px 0;
color: ${TEAL_DARK};
`

export const H3 = styled.h3`
font-size: 20px;
font-weight: 700;
line-height: 1.4;
margin: 34px 0 5px;
color: ${TEAL_DARK};
`

export const Paragraph = styled.p`
font-size: 17px;
line-height: 33px;
margin: 20px 0;

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

export const TableWithBg = styled(Table)`
//
`

export const THead = styled.thead`
font-size: 14px;
`

export const TBody = styled.tbody`
border-top: solid 2px ${TEAL_DARK};
border-bottom: solid 1px #dfe3e6;
`

export const Tr = styled.tr`
border-top: solid 1px #dfe3e6;

&.${isActive} {
  background-color: rgba(85, 150, 230, 0.1);
}

&.${isDisabled} {
  background-color: rgba(57, 57, 57, 0.1);
}
`

export const Th = styled.th`
vertical-align: middle;
padding: 21px 0 18px;

${THead} {
  padding-bottom: 12px;
}
`

export const Td = styled.td`
  vertical-align: middle;
  font-size: 15px;
  line-height: 24px;
  color: #152935;
  padding: 14px 0;

  ${TableWithBg} & {
    padding-left: 29px;
  }

  .${isActive} & {
    font-weight: bold;
    color: ${TEAL_DARK};
  }

  .${isDisabled} & {
    color: #a2a7aa;
  }

  &.${alignCenter} {
    text-align: center;
  }

  &.${isBold} {
    font-weight: 700;
    color: ${TEAL_SEMI_DARK};
  }

  &.${isSmall}, .${isSmall} & {
    font-size: 14px;
    line-height:2;
  }

  &.${verticalAlignTop}, .${verticalAlignTop} & {
    vertical-align: top;
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
    background-color: ${TEAL_SEMI_DARK};
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
    color: ${TEAL_SEMI_DARK};
    font-weight: 700;
    position: absolute;
    left: 30px;
    top: 0;
  }
}
`
