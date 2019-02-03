
import { injectGlobal } from 'emotion'
import Link from 'next/link'
import React from 'react'

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

class Index extends React.Component {
  render () {
    return (
      <React.Fragment>
        <p>Welcome to next.js!</p>
        <Link href='/clock'>
          <a>Clock</a>
        </Link>
      </React.Fragment>
    )
  }
}

export default Index
