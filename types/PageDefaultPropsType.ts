import i18next from 'i18next'
import { RouterProps } from 'next/router'
import { StoresType } from 'pages/_app'

export interface PageDefaultPropsType {
  stores: StoresType
  t: i18next.TFunction
  router: RouterProps
}
