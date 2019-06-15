import styled from '@emotion/styled'
import { Button } from 'components/atoms/Button'
import { isBold, Td, Tr } from 'components/atoms/ContentWrappers'
import { Ticket } from 'components/organisms/DefaultTable'
import { isFuture, isPast } from 'date-fns'
import i18next from 'i18next'
import * as React from 'react'
import { mobileWidth } from 'styles/layout'
import { formatDateInWords } from 'utils/formatDate'
import { withNamespaces } from '../../i18n'

type PropsType = {
    ticket: Ticket;
    t: i18next.TFunction;
}

const ShowDetailButton = styled(Button)`
text-transform: uppercase;
@media (max-width: ${mobileWidth}) {
width: 50px;
font-size: 10px;
height: 50px;
padding: 10px;
text-align: center;
}
`

class TicketTableRow extends React.Component<PropsType> {

    getContributionClass () {
        const { ticket } = this.props
        const { openDate, closeDate } = ticket

        if (!openDate || isFuture(openDate)) return ''
        if (closeDate && isPast(closeDate)) return 'disabled'

        return 'active'
    }

    getTicketStatus () {
        const { ticket, t } = this.props
        const { openDate, closeDate, link } = ticket
        const isClosed = closeDate && isPast(closeDate)
        const isOpen = openDate && isPast(openDate)
        const isBeforeOpening = openDate && isFuture(openDate) && link
        const isOnProgress = isOpen && !isClosed

        let ticketStatus = '-'
        if (isBeforeOpening) ticketStatus = t('common:status.preparing')
        if (isOnProgress) ticketStatus = t('common:status.onProgress')

        return ticketStatus
    }

    getShowDetailButtonTitle() {
        const { ticket, t } = this.props
        const { openDate, closeDate } = ticket
        const isClosed = closeDate && isPast(closeDate)
        const isOpen = openDate && isPast(openDate)
        const isOnProgress = isOpen && !isClosed

        let ticketTitle
        if (isOnProgress) ticketTitle = t('ticket:buy')
        if (isClosed) ticketTitle = t('ticket:closed')

        return ticketTitle
    }

    renderTicketButton () {
        const { ticket } = this.props
        const { closeDate, link } = ticket
        const isClosed = closeDate && isPast(closeDate)
        const buttonTitle = this.getShowDetailButtonTitle()

        if (!buttonTitle) return '-'

        return (
            <ShowDetailButton
                size='small'
                height={27}
                title={buttonTitle}
                intlKey={''}
                to={isClosed ? '' : link}
                disabled={this.getContributionClass() === 'disabled'}
                primary={!!(this.getContributionClass() === 'active')}
            >
                {buttonTitle}
            </ShowDetailButton>
        )
    }

    render() {
        const { ticket, t } = this.props
        const { intlKey, openDate, closeDate } = ticket
        const translatedTitle = intlKey && t(intlKey)
        const dateInfo = openDate
            ? `${openDate && formatDateInWords(openDate)} - ${(closeDate && formatDateInWords(closeDate)) || t('common:status.untilSelected')}`
            : '-'
        const ticketStatus = this.getTicketStatus()
        const ticketButton = this.renderTicketButton()

        return (
            ticket && (
                <Tr key={translatedTitle}>
                    <Td className={isBold}>{translatedTitle}</Td>
                    <Td>{dateInfo}</Td>
                    <Td>{ticketStatus}</Td>
                    <Td style={{ textAlign: 'center' }}>{ticketButton}</Td>
                </Tr>
            )
        )
    }
}

export default withNamespaces(['ticket'])(TicketTableRow)
