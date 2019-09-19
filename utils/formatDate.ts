import { differenceInMilliseconds, distanceInWordsToNow } from 'date-fns'
import { formatToTimeZone } from 'date-fns-timezone'
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
  if (!date) {
    return '-'
  }
  const localeKey = intl.getInitOptions().currentLocale!

  return formatToTimeZone(date, formatTemplate, {
    // No type interface..(https://github.com/prantlf/date-fns-timezone/issues/10)
    locale: locales[localeKey],
    timeZone: 'Asia/Seoul'
  })
}

export const formatDateInWords = formatDate('MMMM Do')
export const formatDateInTimetable = formatDate('YYYY-MM-DD')
export const formatDateInWordsWithTime = formatDate('MMMM Do HH:mm')
export const formatDateInWordsWithWeekdayAndTime = formatDate('MMMM Do [(]dd[)] HH:mm')
export const formatDateOnlyTime = formatDate('HH:mm')
export const formatDateYearMonthDay = formatDate('DD/MM/YY')

export const timeDiffToNow = (openDate: DateDTO) => differenceInMilliseconds(new Date(), openDate)

export const diffInWordsToNow = (date: DateDTO) => {
  const localeKey = intl.getInitOptions().currentLocale!

  return distanceInWordsToNow(date, {
    locale: locales[localeKey]
  })
}
