import styled from '@emotion/styled'
import * as React from 'react'
import {TicketDescriptionWrapper, TicketWarning} from 'components/molecules/TicketBox/TicketDescription'
import { formatDateInWordsWithWeekdayAndTime } from 'utils/formatDate'

type PropsType = {
  title: string|null;
  description: string|null;
  warning: string|null;
  startAt: any;
  finishAt: any;
}

const TitleText = styled.div`
    font-size: 26px;
    font-weight: bold;
    color: #088487;
    margin: 0;
`
const PeriodText = styled.div`
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    line-height: 22px;
    color: #088487;
`

const DescText = styled.div`
    margin: 2px 0;
    font-size: 13px;
    line-height: 18px;
    color: #088487;
`

class TicketPaidDescription extends React.Component<PropsType> {
  render() {
    const {title, status, description, warning, startAt, finishAt} = this.props

    return (
      <TicketDescriptionWrapper>
        <TitleText>{title}</TitleText>
        <PeriodText>Period : {formatDateInWordsWithWeekdayAndTime(startAt)} - {formatDateInWordsWithWeekdayAndTime(finishAt)}</PeriodText>
        {description && description
          .split('\n')
          .map((line, index) => <DescText key={`description_${index}`}>{line}</DescText>)
        }
        <TicketWarning>
          {warning}
        </TicketWarning>
      </TicketDescriptionWrapper>
    )
  }
}

export default TicketPaidDescription
