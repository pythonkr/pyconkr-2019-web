import intl from 'react-intl-universal'
import styled from '@emotion/styled'
import { SNSLink } from 'components/atoms/SNSLink'
import { LOCALE_KEY_EN, LOCALE_KEY_KR, localeMap, URL_LOCALE_KEY } from 'locales/constants'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { TEAL_SEMI_DARK } from 'styles/colors'
import { navigationPadding } from 'styles/layout'

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
  background-color: ${TEAL_SEMI_DARK};
  color: white;
`

const FixedFooterItem = styled.li`
  display: inline-block;
  padding: 0 10px;
`

const FixedFooterLinkA = styled.a`
  font-size: 14px;
  display: inline-flex;
  height: 36px;
  align-items: center;
  cursor: pointer;
`

const Footer: React.SFC<any> =  ({ router: { query: { lang: currentLocale }}}) => (
  <FixedFooterWrapper>
    <ul>
      <FixedFooterItem>
        <Link href='/coc'>
          <FixedFooterLinkA><span>
            {
              intl.get('fixedFooter.coc').defaultMessage('파이콘 한국 성명서(CoC)')
            }
            </span></FixedFooterLinkA>
        </Link>
      </FixedFooterItem>
    </ul>
    <ul>
      <FixedFooterItem>
        <SNSLink
          to='https://blog.pycon.kr/'
          intlKey='fixedFooter.blogLink'
          name='블로그'
        />
      </FixedFooterItem>
      <FixedFooterItem>
        <SNSLink
          to='https://twitter.com/pyconkr'
          intlKey='fixedFooter.twitterLink'
          name='트위터'
        />
      </FixedFooterItem>
      <FixedFooterItem>
        <SNSLink
          to='https://ko-kr.facebook.com/pyconkorea/'
          intlKey='fixedFooter.facebookLink'
          name='페이스북'
        />
      </FixedFooterItem>
      <FixedFooterItem>
        <SNSLink
          to='https://github.com/pythonkr'
          intlKey='fixedFooter.githubLink'
          name='깃헙'
        />
      </FixedFooterItem>
      <FixedFooterItem>
        <SNSLink
          to='https://www.flickr.com/photos/126829363@N08/sets/'
          intlKey='fixedFooter.flickerLink'
          name='플리커'
        />
      </FixedFooterItem>
      <FixedFooterItem>
        <SNSLink
          to='https://www.youtube.com/channel/UC26x6D5xpKx6io4ShfXa_Ow'
          intlKey='fixedFooter.youtubeLink'
          name='유투브'
        />
      </FixedFooterItem>
      <FixedFooterItem>
        <button
          onClick={() => {
            window.location.assign(
              `${window.location.pathname}?${URL_LOCALE_KEY}=${
                currentLocale === LOCALE_KEY_EN
                  ? LOCALE_KEY_KR
                  : LOCALE_KEY_EN
            }`)
          }}>
            {currentLocale === LOCALE_KEY_EN
              ? localeMap[LOCALE_KEY_KR]
              : localeMap[LOCALE_KEY_EN]}
          </button>
      </FixedFooterItem>
    </ul>
    </FixedFooterWrapper>
)

export default withRouter(Footer)
