
import Link from 'next/link'
import React from 'react'
import { injectGlobal } from 'emotion'


injectGlobal`
  html, body {
    padding: 3rem 1rem;
    margin: 0;
    background: papayawhip;
    min-height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 24px;
  }
`

export default class Index extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Link href='/about'>
          <a>About</a>
        </Link>
        Index Page
      </React.Fragment>
    )
  }
}


