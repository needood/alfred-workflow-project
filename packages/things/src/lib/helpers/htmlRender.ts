let fs = require('fs')
let path = require('path')

export function htmlRender (tocHtml: string, contentHtml: string) {
  let template = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'templates', '/export_template.html'), 'utf-8')
  return template.replace('${tocHtml}', tocHtml)
    .replace('${contentHtml}', contentHtml)
}
