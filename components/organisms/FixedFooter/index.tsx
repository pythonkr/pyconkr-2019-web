import styled from '@emotion/styled'
import { FixedFooterItem, SNSLinkList } from 'components/molecules/SNSLinkList'
import { LOCALE_KEY_EN, LOCALE_KEY_KR, localeMap, URL_LOCALE_KEY } from 'locales/constants'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { RouterProps, withRouter } from 'next/router'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'
import { TEAL } from 'styles/colors'
import { mobileWidth, navigationPadding } from 'styles/layout'

const FixedFooterWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 ${navigationPadding};
  background-color: ${TEAL};
  color: white;
  font-weight: 700;

  span {
    display: inline-block;
  }

  button {
    background: transparent;
    border: none;
    outline: none;
    margin-top: 2px;
  }

  @media (max-width: ${mobileWidth}) {
    padding: 0 0 5px 0;
    height: 60px;
    position: relative;
    justify-content: center;
  }
`

const FixedFooterLinkA = styled.a`
  font-size: 14px;
  display: inline-flex;
  height: 36px;
  align-items: center;
  cursor: pointer;
`

const RightPane = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
@media (max-width: ${mobileWidth}) {
  display: none;
}
`
const LanguageButton = styled.button`
cursor: pointer;
color: white;
font-size: 14px;
`

const MobileLanguageButton = styled.button`
text-align: right;
cursor: pointer;
color: white;
font-size: 14px;
display: none;
@media (max-width: ${mobileWidth}) {
  display: inline-block;
}
`

type PropsType = {
  router: RouterProps;
  stores: StoresType;
}
@inject('stores')
@(withRouter as any)
@observer
class FixedFooter extends React.Component<PropsType> {
  render() {
    const { router, stores } = this.props
    const currentLocale = router.query && router.query.lang || stores.authStore.language

    return (
        <FixedFooterWrapper>
          <ul>
            <FixedFooterItem>
              <Link href='/coc'>
                <FixedFooterLinkA><span>
                  {intl.get('fixedFooter.coc').defaultMessage('파이콘 한국 성명서(CoC)')}
                </span></FixedFooterLinkA>
              </Link>
              <MobileLanguageButton
                onClick={() => {
                    let query = window.location.search ? window.location.search : '?'
                    const locale_value = (currentLocale === LOCALE_KEY_EN ? LOCALE_KEY_KR : LOCALE_KEY_EN)
                    if (query.indexOf(URL_LOCALE_KEY) !== -1) {
                        query = query.replace(currentLocale, locale_value)
                    } else {
                        query = `${query}&${URL_LOCALE_KEY}=${locale_value}`
                    }
                    window.location.assign(
                        `${window.location.pathname}${query}`)
              }}>
                {currentLocale === LOCALE_KEY_EN
                  ? localeMap[LOCALE_KEY_KR]
                  : localeMap[LOCALE_KEY_EN]}
            </MobileLanguageButton>
            </FixedFooterItem>
          </ul>
          <RightPane>
            <SNSLinkList color='white' />
            <LanguageButton
              onClick={() => {
                    let query = window.location.search ? window.location.search : '?'
                    const locale_value = (currentLocale === LOCALE_KEY_EN ? LOCALE_KEY_KR : LOCALE_KEY_EN)
                    if (query.indexOf(URL_LOCALE_KEY) !== -1) {
                        query = query.replace(currentLocale, locale_value)
                    } else {
                        query = `${query}&${URL_LOCALE_KEY}=${locale_value}`
                    }
                    window.location.assign(
                        `${window.location.pathname}${query}`)
            }}>
              {currentLocale === LOCALE_KEY_EN
                ? localeMap[LOCALE_KEY_KR]
                : localeMap[LOCALE_KEY_EN]}
            </LanguageButton>
          </RightPane>
        </FixedFooterWrapper>
    )
  }
}

export default FixedFooter
