import { NoticeBar, NoticeBarProps } from 'components/atoms/NoticeBar'
import React from 'react'
import { ALERT_BLUE_DARK, ALERT_YELLOW, ALERT_YELLOW_DARK, ALERT_YELLOW_SEMI_DARK } from 'styles/colors'

export const AlertBar: React.SFC<NoticeBarProps>  = ({ text, ...props }) => {
  return <NoticeBar
    color={ALERT_YELLOW}
    borderColor={ALERT_YELLOW_SEMI_DARK}
    textColor={ALERT_YELLOW_DARK}
    textLinkColor={ALERT_BLUE_DARK}
    text={text}
    {...props}
  />
}
