const express = require('express')
const next = require('next')

const nextI18NextMiddleware = require('next-i18next/middleware')
// const nextI18next = require('./i18n')

import nextI18next from './i18n'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const mobxReact = require('mobx-react')
mobxReact.useStaticRendering(true)

app.prepare().then(() => {
  const server = express()

  server.use(nextI18NextMiddleware(nextI18next))

  server.get('*', (req: any, res: any) => {
    return handle(req, res)
  })

  server.listen(port, (err: any) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
