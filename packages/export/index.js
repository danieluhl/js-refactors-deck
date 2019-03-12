const path = require('path')
const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const dev = require('mdx-deck/lib/dev')

module.exports = async opts => {
  const { type, outDir, outFile, port, width, height, sandbox } = opts

  const args = []
  if (!sandbox) {
    args.push('--no-sandbox', '--disable-setuid-sandbox')
  }

  const server = await dev(opts)

  const browser = await puppeteer.launch({ args })
  const page = await browser.newPage()
  const filename = path.join(
    outDir,
    path.basename(outFile, path.extname(outFile)) + '.' + type
  )
  mkdirp.sync(outDir)

  switch (type) {
    case 'pdf':
      await page.goto(`http://localhost:${port}/print`, {
        waitUntil: 'networkidle2',
      })
      await page.pdf({
        width,
        height,
        path: filename,
        scale: 1,
        printBackground: true,
      })
      break
    case 'png':
      await page.setViewport({ width, height })
      await page.goto('http://localhost:' + port, {
        waitUntil: 'networkidle2',
      })
      await page.screenshot({
        path: filename,
        type: 'png',
        clip: {
          x: 0,
          y: 0,
          width,
          height,
        },
      })
      break
  }

  await browser.close()
  await server.close()

  return filename
}
