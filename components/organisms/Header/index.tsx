import Navigation from 'components/molecules/Navigation'
import Head from 'next/head'
import React from 'react'

export type PropsType = {
    title: string;
}

class Header extends React.Component<PropsType> {
    render () {
        const { title } = this.props

        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                </Head>
                <Navigation />
            </>
        )
    }
}

export default Header
