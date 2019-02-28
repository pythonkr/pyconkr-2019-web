import styled from '@emotion/styled'
import Navigation from 'components/molecules/Navigation'
import Head from 'next/head'
import React from 'react'

const SimpleHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

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
                <SimpleHeader>
                    <p>파이콘 한국 2019</p>
                    <p>Connect the Pythonistas</p>
                    <p>2019.08.15(목)-18(일), 서울 코엑스 그랜드볼룸</p>
                    <Navigation />
                </SimpleHeader>
            </>
        )
    }
}

export default Header
