import i18next from 'i18next'
import { StoresType } from 'pages/_app'

export interface PageDefaultPropsType {
  stores: StoresType
  t: i18next.TFunction
}
