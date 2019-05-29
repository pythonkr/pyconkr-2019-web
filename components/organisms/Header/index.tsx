import Navigation from 'components/molecules/GlobalNavigation'
import _ from 'lodash'
import Head from 'next/head'
import React from 'react'
import intl from 'react-intl-universal'

export type PropsType = {
  title?: string;
  titleTranslated?: string;
  intlKey?: string | null;
}

class Header extends React.Component<PropsType> {
  render() {
    const { title, titleTranslated } = this.props
    const intlKey = this.props.intlKey ? this.props.intlKey : 'constant.pyconKorea.name'

    return (
      <>
        <Head>
          <title>
            {!_.isEmpty(titleTranslated) ? titleTranslated : intl.get(intlKey).d(title || '')}
          </title>
          <meta charSet='utf-8' />
          <meta
            property='og:site_name'
            content={
              intl.get('constant.pyconKorea.name')
                .d('파이콘 한국 2019')
            }
          />
          <meta
            property='og:title'
            content={
              intl.get('constant.pyconKorea.name')
                .d('파이콘 한국 2019')
            }
          />
          <meta property='og:url' content='https://www.pycon.kr'/>
          <meta
            property='og:description'
            content={
              intl.get('constant.pyconKorea.scheduleWithNameAndVenue')
                .d('파이콘 한국 2019:  8월 15일~18일(일), 코엑스 그랜드 볼룸')
            }
          />
          <link rel='apple-touch-icon' sizes='57x57' href='/static/favicon/apple-icon-57x57.png'/>
          <link rel='apple-touch-icon' sizes='60x60' href='/static/favicon/apple-icon-60x60.png'/>
          <link rel='apple-touch-icon' sizes='72x72' href='/static/favicon/apple-icon-72x72.png'/>
          <link rel='apple-touch-icon' sizes='76x76' href='/static/favicon/apple-icon-76x76.png'/>
          <link rel='apple-touch-icon' sizes='114x114' href='/static/favicon/apple-icon-114x114.png'/>
          <link rel='apple-touch-icon' sizes='120x120' href='/static/favicon/apple-icon-120x120.png'/>
          <link rel='apple-touch-icon' sizes='144x144' href='/static/favicon/apple-icon-144x144.png'/>
          <link rel='apple-touch-icon' sizes='152x152' href='/static/favicon/apple-icon-152x152.png'/>
          <link rel='apple-touch-icon' sizes='180x180' href='/static/favicon/apple-icon-180x180.png'/>
          <link rel='icon' type='image/png' sizes='192x192'  href='/static/favicon/android-icon-192x192.png'/>
          <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon/favicon-32x32.png'/>
          <link rel='icon' type='image/png' sizes='96x96' href='/static/favicon/favicon-96x96.png'/>
          <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon/favicon-16x16.png'/>
          <link rel='manifest' href='/static/favicon/manifest.json'/>
          <meta name='msapplication-TileColor' content='#ffffff'/>
          <meta name='msapplication-TileImage' content='/static/favicon/ms-icon-144x144.png'/>
          <meta name='theme-color' content='#ffffff'/>
          <meta property='og:image' content='/static/images/og-pyconkr-image.png'/>
          <meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' />
        </Head>
        <Navigation />
      </>
    )
  }
}

export default Header
