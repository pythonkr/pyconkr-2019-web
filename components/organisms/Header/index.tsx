import Head from 'next/head'
import React from 'react'
import Navigation from 'components/molecules/Navigation'

const Header = ({ title = 'This is the default title' }) => (
    <React.Fragment>
        <Head>
            <title>{title}</title>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <header>
            <Navigation />
        </header>
    </React.Fragment>
)

export default Header
