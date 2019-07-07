
import styled from '@emotion/styled-base'
import { Button } from 'components/atoms/Button'
import { isBold, Td, Tr } from 'components/atoms/ContentWrappers'
import { differenceInCalendarDays, isFuture, isPast } from 'date-fns'
import _ from 'lodash'
import i18next from 'i18next'
import React from 'react'
import { mobileWidth } from 'styles/layout'
import { formatDateInWords } from 'utils/formatDate'
import { withNamespaces } from '../../i18n'

const ShowDetailButton = styled(Button)`
@media (max-width: ${mobileWidth}) {
width: 50px;
font-size: 10px;
height: 50px;
padding: 10px;
text-align: center;
}
`

type PropsType = {
    t: i18next.TFunction;
    title?: string;
    openDate?: string;
    closeDate?: string;
    link?: string;
    editLink?: string;
    dateDescription?: string;
    isMyContribution?: boolean;
    isProposalSubmitted?: boolean;
    isProposalAccepted?: boolean;
}

export class ContributionTableRow extends React.Component<PropsType> {

    getContributionClass () {
        const { openDate, closeDate } = this.props

        if (!openDate || isFuture(openDate)) return ''
        if (closeDate && isPast(closeDate)) return 'disabled'

        return 'active'
    }

    getContributionStatus () {
        const { t, openDate, closeDate, link, isMyContribution, isProposalSubmitted } = this.props
        const isContributionAvailable = openDate && link
        const isBeforeOpening = openDate && isFuture(openDate) && link
        const isFinished = closeDate && isPast(closeDate)
        const now = new Date()

        if (!isContributionAvailable) return '-'
        if (isMyContribution) {
            if (!_.isNil(isProposalSubmitted)) {
                return !isProposalSubmitted
                    ? t('contribute:constant.temporarilySaved')
                    : t('contribute:constant.submitted')
            }
        }

        // 제안 및 신청내역
        if (isBeforeOpening) {
            const daysDifference = openDate && differenceInCalendarDays(openDate, now)
            const isBefore7days = daysDifference && daysDifference < 7

            return isBefore7days
                ? t('common:status.openBefore', { diff: daysDifference })
                : t('common:status.preparing')
        }

        if (isFinished) return t('common:status.closed')

        if (closeDate && differenceInCalendarDays(closeDate, now) < 7 ) {
            const daysDifference = differenceInCalendarDays(closeDate, now)
            return t('common:status.closeAfter', { diff: daysDifference }) 
        }
        return t('common:status.onProgress')
    }

    getShowDetailButtonTitle() {
        const { t, openDate, closeDate, isProposalSubmitted, isMyContribution } = this.props
        const isFinished = closeDate && isPast(closeDate)
        const isOngoing = openDate && isPast(openDate) && !isFinished

        if (isMyContribution && !_.isNil(isProposalSubmitted)) {
            return  t('contribute:constant.edit')
        }

        if (isFinished) return t('contribute:constant.finished')

        if (isOngoing) return t('contribute:constant.participant')

        return t('contribute:overview.table.moreDetail')
    }

    renderShowDetailButton () {
        const { link, editLink, closeDate, isProposalSubmitted, isMyContribution, isProposalAccepted } = this.props
        const isFinished = closeDate && isPast(closeDate)
        const buttonLink = (
            isMyContribution &&
            !_.isNil(isProposalSubmitted) &&
            (!isFinished || isProposalAccepted)
        ) ? editLink : link

        if (buttonLink) {
          return (
            <ShowDetailButton
                size='small'
                height={27}
                title={this.getShowDetailButtonTitle()}
                to={buttonLink}
                primary={!!(this.getContributionClass() === 'active')}/>
          )
        }

        return '-'
    }

    render() {
        const { t, title, openDate, closeDate, dateDescription } = this.props

        return (
            <Tr
                key={title}
                className={this.getContributionClass()}
            >
                <Td className={isBold}>
                    { title }
                </Td>
                <Td>
                    {dateDescription
                        ? dateDescription
                        : `${openDate && formatDateInWords(openDate)} - ${(closeDate && formatDateInWords(closeDate)) 
                            || t('common:status.untilSelected')}`
                    }
                </Td>
                <Td>
                    {this.getContributionStatus()}
                </Td>
                <Td className='center-align'>
                    {this.renderShowDetailButton()}
                </Td>
            </Tr>
        )
    }
}

export default withNamespaces(['common', 'contribute'])(ContributionTableRow)
