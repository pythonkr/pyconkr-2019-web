import styled from '@emotion/styled'
import {
  TableListRow,
  TableListRowContent,
  isBold,
  isHeader,
} from 'components/atoms/ContentWrappers'
import { FORM_LABEL_GRAY } from 'styles/colors'
import { mobileWidth } from 'styles/layout'

export const SpeakerSpan = styled.span`
  font-size: 32px;
  color: ${FORM_LABEL_GRAY};

  @media (max-width: ${mobileWidth}) {
    font-size: 26px;
  }
`

export const ProgramTableRow = (props: any) => <>
  <TableListRow>
    <TableListRowContent className={isHeader}>
      { props.header }
    </TableListRowContent>
    <TableListRowContent
      className={props.bold ? isBold : ''}
      color={props.color}
    >
      { props.children }
    </TableListRowContent>
  </TableListRow>
</>
