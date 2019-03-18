import { NoticeBar, NoticeBarProps } from 'components/atoms/NoticeBar'
import React from 'react'
import { ALERT_BLUE, ALERT_BLUE_DARK, WHITE } from 'styles/colors'

export const InformBar: React.SFC<NoticeBarProps>  = ({ text, ...props }) => {
  return <NoticeBar
    color={ALERT_BLUE}
    borderColor={ALERT_BLUE_DARK}
    textColor={WHITE}
    textLinkColor={WHITE}
    text={text}
    {...props}
  />
}
