import styled from '@emotion/styled'
import MarkdownWrapper from 'components/atoms/MarkdownWrapper'
import * as React from 'react'
import { mobileWidth } from 'styles/layout'

type PropsType = {
    title: string;
    description: string;
    warning: string;
}

export const TicketDescriptionWrapper = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    padding: 32px 0 20px 28px;

    @media (max-width: ${mobileWidth}) {
      display: block;
      padding: 29px 28px;

      h1 {
        margin-bottom: 35px;
      }

      p:nth-of-type(1) {
        margin-bottom: 43px;
      }
    }

    h1 {
      font-size: 26px;
      font-weight: bold;
      color: #088487;
      margin-bottom: 23px;
    }

    p {
      font-size: 15px;
      line-height: 1.67;
      color: #088487;
    }
  }
`

export const TicketWarning = styled.div`
    margin-top: auto;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.47;
    color: #f95858;
`

class TicketDescription extends React.Component<PropsType> {
    render() {
        const { title, description, warning } = this.props

        return (
            <TicketDescriptionWrapper>
                <h1>{title}</h1>
                <MarkdownWrapper contents={description} />
                <TicketWarning>
                    {warning}
                </TicketWarning>
            </TicketDescriptionWrapper>
        )
    }
}

export default TicketDescription
