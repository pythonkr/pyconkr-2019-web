import { NoticeBar } from 'components/atoms/NoticeBar'
import { differenceInCalendarDays, isFuture, isPast } from 'date-fns'
import { RouterProps, withRouter } from 'next/router'
import React from 'react'
import intl from 'react-intl-universal'
import { BG_GRAY, BG_GRAY_DARK, CORAL, CORAL_DARK, CORAL_LIGHT, WHITE } from 'styles/colors'
import { DateDTO } from 'types/common'

type StatusBarType = 'scheduled' | 'ongoing' | 'closed'

interface Props {
  router: RouterProps,
  text?: string
  titleIntlKey?: string,
  openDate: DateDTO,
  closeDate?: DateDTO,
  link: string,
  actionIntlKey: string
}

const statusBarColors  = {
  scheduled: {
    bg: CORAL_LIGHT,
    border: CORAL,
    text: CORAL,
    textLink: CORAL_DARK,
  },
  ongoing: {
    bg: CORAL,
    border: CORAL_DARK,
    text: WHITE,
    textLink: WHITE,
  },
  closed: {
    bg: BG_GRAY,
    border: BG_GRAY_DARK,
    text: WHITE,
    textLink: WHITE,
  },
}

const getStatusBarType = (openDate: DateDTO, closeDate?: DateDTO): StatusBarType => {
  if (isFuture(openDate)) return 'scheduled'
  if (closeDate && isPast(closeDate)) return 'closed'

  return 'ongoing'
}

const getStatusText = (openDate?: DateDTO, closeDate?: DateDTO, titleIntlKey?: string, text?: string) => {
  if (!openDate) return '-'

  let statusMessage = intl.get('common.status.onProgress').d('진행 중입니다.')

  if (isFuture(openDate)) {
    const diff = differenceInCalendarDays(openDate, new Date())

    statusMessage = diff < 7
      ? intl.get('common.status.openBefore', { diff }).d(`${diff}일 후에 시작됩니다.`)
      : intl.get('common.status.preparing').d('준비 중입니다.')

    statusMessage = diff === 0 ? intl.get('common.status.openBefore', { diff }).d(`오늘 중 오픈!`) : statusMessage
  }

  if (closeDate && isPast(closeDate)) {
    statusMessage = intl.get('common.status.closed').d('마감되었습니다.')
  }

  if (closeDate && isPast(openDate) && isFuture(closeDate)) {
    const diff = differenceInCalendarDays(closeDate, new Date())
    statusMessage = `${statusMessage} (${intl.get('common.status.closeAfter', { diff }).d(`마감까지 D-${diff}`)})`
  }

  return titleIntlKey ? `${intl.get(titleIntlKey)} ${intl.get('common.is')} ${statusMessage}` : `${text} ${intl.get('common.is')} ${statusMessage}`
}

const getLink = (link?: string, pathname?: string, barType?: string, actionIntlKey?: string) => {
  if (!link || pathname === link) return undefined

  if (barType === 'ongoing') {
    return {
      title: actionIntlKey ? `${intl.get('common.goTo')} ${intl.get(actionIntlKey)}` :
        `${intl.get('common.goTo')} ${intl.get('common.apply')}`,
      to: link,
      outlink: false,
    }
  }

  if (barType === 'scheduled') {
    return {
      title: `${intl.get('common.detailedSchedule')}`,
      to: link,
      outlink: false,
    }
  }

  return {
    title: `${intl.get('common.pastSchedule')}`,
    to: link,
    outlink: false,
  }
}

const _StatusBar: React.SFC<Props>  = ({
  router: { pathname },
  text,
  titleIntlKey,
  openDate,
  closeDate,
  link,
  actionIntlKey
}) => {
  const barType: StatusBarType = getStatusBarType(openDate, closeDate)

  return (
    <NoticeBar
      color={statusBarColors[barType].bg}
      borderColor={statusBarColors[barType].border}
      textColor={statusBarColors[barType].text}
      textLinkColor={statusBarColors[barType].textLink}
      text={getStatusText(openDate, closeDate, titleIntlKey, text)}
      link={getLink(link, pathname, barType, actionIntlKey)}
    />
  )
}

export const StatusBar = withRouter(_StatusBar)
