
import { Enum } from 'typescript-string-enums'

export const TEAL = '#088487'
export const TEAL_SEMI_DARK = '#077477'
export const TEAL_DARK = '#044748'
export const TEAL_SEMI_LIGHT = '#0aa5a9'
export const TEAL_LIGHT = '#e6f3f3'
export const TEAL_LIGHT_LIGHT = '#eef7f7'
export const CORAL_LIGHT = '#fff3f3'
export const CORAL_SEMI_LIGHT = '#fb8484'
export const CORAL = '#F95858'
export const CORAL_DARK = '#d24343'

export const WHITE = 'white'

export const BG_GRAY = '#9e9e9e'
export const BG_GRAY_DARK = '#6c6c6c'

export const ALERT_YELLOW = '#fffacc'
export const ALERT_YELLOW_SEMI_DARK = '#d3c154'
export const ALERT_YELLOW_DARK = '#7f5c29'

export const ALERT_BLUE_DARK = '#263056'
export const ALERT_BLUE = '#3b7ed3'

export const NAVER_GREEN = '#1EC800'
export const FACEBOOK_BLUE = '#3b5998'

export const DEFAULT_TEXT_BLACK = '#222222'
export const HEADING_LIGHT_BLACK = '#4a4a4a'
export const FORM_LABEL_GRAY = '#878d91'
export const FORM_LABEL_GRAY_LIGHT = '#bcc0c2'

export const YELLOW = '#F5A623'
export const GREEN = '#5AA300'

export const TICKET_COLOR = {
  CONFERENCE: TEAL,
  TUTORIAL: '#885053',
  SPRINT: '#54428E',
  YOUNGCODER: '#5C2751',
  CHILD_CARE: '#36558F',
  DISABLE: '#ababab'
}

export type TICKET_COLOR_TYPE = Enum<typeof TICKET_COLOR>
