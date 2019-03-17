import { NoticeBar } from 'components/atoms/NoticeBar'
import { differenceInCalendarDays, isFuture, isPast } from 'date-fns'
import { RouterProps, withRouter } from 'next/router'
import React from 'react'
import { BG_GRAY, BG_GRAY_DARK, CORAL, CORAL_DARK, CORAL_LIGHT, WHITE } from 'styles/colors'
import { DateDTO } from 'types/common'

type StatusBarType = 'scheduled' | 'ongoing' | 'closed'
export type ActionText = '신청' | '제안' | '추천'

interface Props {
  router: RouterProps,
  title: string,
  openDate: DateDTO,
  closeDate?: DateDTO,
  link: string,
  actionText: ActionText
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

const getText = (barType: StatusBarType, title: string, dateDiff: number) => {
  switch (barType) {
    case 'scheduled':
      return `${title}은 ${-dateDiff}일 후에 시작될 예정입니다.`
    case 'ongoing':
      return `${title}이 진행 중입니다!`
    case 'closed':
      return `${title}이 마감되었습니다.`
    default:
      return `${title}이 진행 중입니다!`
  }
}

const _StatusBar: React.SFC<Props>  = ({
  router: { pathname },
  title,
  openDate,
  closeDate,
  link,
  actionText
}) => {
  const barType: StatusBarType = getStatusBarType(openDate, closeDate)
  const dateDiff = differenceInCalendarDays(new Date(), openDate)

  return <NoticeBar
    color={statusBarColors[barType].bg}
    borderColor={statusBarColors[barType].border}
    textColor={statusBarColors[barType].text}
    textLinkColor={statusBarColors[barType].textLink}
    text={getText(barType, title, dateDiff)}
    subText={pathname === link
      ? barType === 'scheduled'
        ? `D${dateDiff}`
        : barType === 'ongoing' && closeDate
          ? `모집 마감 D${differenceInCalendarDays(new Date(), closeDate)}`
          : !closeDate
            ? '~마감 시까지'
            : undefined
      : undefined
    }
    link={link && pathname !== link
      ? barType === 'ongoing'
        ? {
          title: `${actionText}하러 가기`,
          to: link,
          outlink: false,
        }
        : barType === 'scheduled'
          ? {
            title: `상세 일정 보기`,
            to: link,
            outlink: false,
          }
          : {
            title: `지난 일정 보기`,
            to: link,
            outlink: false,
          }
      : undefined
    }
  />
}

export const StatusBar = withRouter(_StatusBar)
