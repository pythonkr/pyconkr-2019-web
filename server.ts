const express = require('express')
const next = require('next')
const { parse } = require('url')
const { basename } = require('path')
const accepts = require('accepts')
const glob = require('glob')
const nextI18NextMiddleware = require('next-i18next/middleware')

import nextI18next from './i18n'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const mobxReact = require('mobx-react')
mobxReact.useStaticRendering(true)

const supportedLanguages = glob
  .sync('./locales/*.json')
  .map((f: any) => basename(f, '.json'))

app.prepare().then(() => {
  const server = express()

  server.use(nextI18NextMiddleware(nextI18next))

  server.get('*', (req: any, res: any) => {
    const parsedUrl = parse(req.url, true)
    const accept = accepts(req)
    const isParsedUrlLang = !!parsedUrl.query.lang
    const acceptLang = accept.language(accept.languages(supportedLanguages))

    if (!isParsedUrlLang && acceptLang) {
      parsedUrl.query.lang = acceptLang
    }

    return handle(req, res, parsedUrl)
  })

  server.listen(port, (err: any) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
