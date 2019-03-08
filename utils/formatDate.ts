import { differenceInMilliseconds } from 'date-fns'
import format from 'date-fns/format'
import en from 'date-fns/locale/en'
import ko from 'date-fns/locale/ko'
import { LOCALE_KEY_EN, LOCALE_KEY_KR } from 'locales/constants'
import intl from 'react-intl-universal'
import { DateDTO } from 'types/common'

const locales: { [index: string]: object } = {
  [LOCALE_KEY_KR]: ko,
  [LOCALE_KEY_EN]: en,
}

export const formatDate = (formatTemplate: string) => (date: DateDTO) => {
  const localeKey = intl.getInitOptions().currentLocale!

  return format(date, formatTemplate, {
    locale: locales[localeKey]
  })
}

export const formatDateInWords = formatDate('MMMM Do')
export const formatDateInWordsWithTime = formatDate('MMMM Do HH:mm')
export const formatDateInWordsWithWeekdayAndTime = formatDate('MMMM Do [(]dd[)] HH:mm')

export const timeDiffToNow = (openDate: DateDTO) => differenceInMilliseconds(new Date(), openDate)
