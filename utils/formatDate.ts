import format from 'date-fns/format'
import ko from 'date-fns/locale/ko'
import en from 'date-fns/locale/en'
import { DateDTO } from 'types/common';
import intl from 'react-intl-universal';
import { LOCALE_KEY_KR, LOCALE_KEY_EN } from 'locales/constants';

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




