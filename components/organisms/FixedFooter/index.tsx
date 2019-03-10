import styled from '@emotion/styled'
import { SNSLink } from 'components/atoms/SNSLink'
import { LOCALE_KEY_EN, LOCALE_KEY_KR, localeMap, URL_LOCALE_KEY } from 'locales/constants'
import Link from 'next/link'
import { withRouter } from 'next/router'
import intl from 'react-intl-universal'
import { TEAL } from 'styles/colors'
import { mobileWidth, navigationPadding } from 'styles/layout'
import { FixedFooterItem, SNSLinkList } from 'components/molecules/SNSLinkList';
import { IntlText } from 'components/atoms/IntlText';

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
    padding: 0 0 16px 0;
    height: 70px;
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

// FIXME :: 모바일 푸터 스타일
// const FixedFooterWrapper = styled.nav`
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   padding: 10px;
//   background-color: ${CORAL};
//   text-align: center;
//   color: white;
// `
//
// const FixedFooterLinkA = styled.a`
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   font-size: 14px;
//   font-weight: bold;
//   text-align: center;
//   cursor: pointer;
// `

const Footer: React.SFC<any> =  ({ router: { query: { lang: currentLocale }}}) => {
  return (
    <FixedFooterWrapper>
      <ul>
        <FixedFooterItem>
          <Link href='/coc'>
            <FixedFooterLinkA><span>
              {intl.get('fixedFooter.coc').defaultMessage('파이콘 한국 성명서(CoC)')}
            </span></FixedFooterLinkA>
          </Link>
        </FixedFooterItem>
      </ul>
      <SNSLinkList color='white' />
      <FixedFooterItem>
        {/* Currently should reload page on language change */}
        <button
          onClick={() => {
            window.location.assign(
              `${window.location.pathname}?${URL_LOCALE_KEY}=${
                  currentLocale === LOCALE_KEY_EN
                    ? LOCALE_KEY_KR
                    : LOCALE_KEY_EN
                  }`)
          }}>
          <IntlText intlKey='fixedFooter.youtubeLink'>
            {currentLocale === LOCALE_KEY_EN
              ? localeMap[LOCALE_KEY_KR]
              : localeMap[LOCALE_KEY_EN]}
          </IntlText>
        </button>
      </FixedFooterItem>
    </FixedFooterWrapper>
  )
}

export default withRouter(Footer)
