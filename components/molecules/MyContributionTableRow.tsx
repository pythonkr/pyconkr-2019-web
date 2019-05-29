
import styled from '@emotion/styled-base'
import { Button } from 'components/atoms/Button'
import { isBold, Td, Tr } from 'components/atoms/ContentWrappers'
import { Contribution } from 'components/organisms/DefaultTable'
import { differenceInCalendarDays, isFuture, isPast } from 'date-fns'
import _ from 'lodash'
import React from 'react'
import intl from 'react-intl-universal'
import { mobileWidth } from 'styles/layout'
import { formatDateInWords } from 'utils/formatDate'

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
    isProposalSubmitted?: boolean;
    isMyContribution?: boolean;
    isSponsorPaid?: boolean;
} & Contribution

export default class MyContributionTableRow extends React.Component<PropsType> {

    getContributionClass () {
        const { openDate, closeDate } = this.props

        if (!openDate || isFuture(openDate)) return ''
        if (closeDate && isPast(closeDate)) return 'disabled'

        return 'active'
    }

    getContributionStatus () {
        const { openDate, closeDate, link, isMyContribution, isProposalSubmitted, isSponsorPaid } = this.props
        const isContributionAvailable = openDate && link
        const isBeforeOpening = openDate && isFuture(openDate) && link
        const isFinished = closeDate && isPast(closeDate)
        const now = new Date()

        if (!isContributionAvailable) return '-'

        // 제안 및 신청내역
        if (isMyContribution) {
            if (!_.isNil(isProposalSubmitted)) {

                let confirmMessageForSponsor = ''
                if (!_.isUndefined(isSponsorPaid)) {
                     confirmMessageForSponsor =  isSponsorPaid
                        ? '(스폰싱 확정)'
                        : '(스폰싱 미확정)'
                }

                return !isProposalSubmitted
                    ? '임시 저장'
                    : `제출완료 ${confirmMessageForSponsor}`
            }

            return '미제출'
        } else {
            if (isBeforeOpening) {
                const daysDifference = openDate && differenceInCalendarDays(openDate, now)
                const isBefore7days = daysDifference && daysDifference < 7

                return isBefore7days
                    ? intl.get('common.status.openBefore', { diff: daysDifference }).d(`모집 시작 D-${daysDifference}`)
                    : intl.get('common.status.preparing').d('준비 중')
            }

            if (isFinished) return intl.get('common.status.closed').d('마감')

            if (closeDate && differenceInCalendarDays(closeDate, now) < 7) {
                const daysDifference = differenceInCalendarDays(closeDate, now)

                return intl.get('common.status.closeAfter', { diff: daysDifference }).d(`마감 D-${ daysDifference}`)
            }

            return intl.get('common.status.onProgress').d('모집 중')
        }
    }

    getShowDetailButtonTitle() {
        const { closeDate, isProposalSubmitted, isMyContribution } = this.props
        
        if (isMyContribution) {
            const isFinished = closeDate && isPast(closeDate)
            const isProposalExist = !_.isNil(isProposalSubmitted)

            if (isFinished) return '마감'
            if (isProposalExist) return isProposalSubmitted ? '수정 제출하기' : '이어서 작성하기'

            return '제안하기'
        }

        return '자세히 보기'
    }

    renderShowDetailButton () {
        const { link, editLink, isProposalSubmitted } = this.props
        const buttonTitle = this.getShowDetailButtonTitle()
        const isProposalExist = !_.isNil(isProposalSubmitted)

        if (isProposalExist) {
            return (
                <ShowDetailButton
                    size='small'
                    height={27}
                    intlKey='contribute.overview.table.moreDetail'
                    to={isProposalSubmitted ? editLink : link}
                    disabled={this.getContributionClass() === 'disabled'}
                    primary={!!(this.getContributionClass() === 'active')}
                >
                    {buttonTitle}
                </ShowDetailButton>
            )
        }

        return '-'
    }

    render() {
        const { title, intlKey, openDate, closeDate, dateDescription } = this.props

        return (
            <Tr
                key={title}
                className={this.getContributionClass()}
            >
                <Td className={isBold}>
                    { (intlKey && title) && intl.get(intlKey).d(title) }
                </Td>
                <Td>
                    {dateDescription
                        ? intl.get(dateDescription.intlKey).d(dateDescription.default)
                        : `${openDate && formatDateInWords(openDate)} - ${(closeDate && formatDateInWords(closeDate)) || intl.get('common.status.untilSelected').d('마감 시까지')}`
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
