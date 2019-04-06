const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const mobxReact = require('mobx-react')
const app = next({ dev })
const handle = app.getRequestHandler()

mobxReact.useStaticRendering(true)

app.prepare()
  .then(() => {
    createServer((req: any, res: any) => {
      const parsedUrl = parse(req.url, true)
      if (!parsedUrl.query.lang && req.headers['accept-language']) {
        parsedUrl.query.lang = req.headers['accept-language'].split(',')[0]
      }
      handle(req, res, parsedUrl)
    })
    .listen(port, (err: any) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
