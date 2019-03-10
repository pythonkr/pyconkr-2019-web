import Navigation from 'components/molecules/Navigation'
import Head from 'next/head'
import React from 'react'

export type PropsType = {
  title: string;
}

class Header extends React.Component<PropsType> {
  render() {
    const { title } = this.props

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta charSet='utf-8' />
          <meta property="og:site_name" content="PyCon Korea 2019" />
          <meta property="og:title" content="PyCon Korea 2019" />
          <meta property="og:url" content="https://pycon.kr" />
          <meta property="og:description" content="파이콘 한국 2019: 8월 15일~18일(일), 코엑스 그랜드 볼룸" />
          <meta property="og:image" content="/static/images/og-pyconkr-image.jpg" />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Navigation />
      </>
    )
  }
}

export default Header
