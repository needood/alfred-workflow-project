let fs = require('fs')
let path = require('path')
let mkdirp = require('mkdirp')

import Config from './Config'
import Utils from './utils'
import { generate } from './generate'
import { getPrintFormat } from './print';

function createDecisions (name: string, savePath: string | any | void) {
  let language = Config.getLanguage()
  let raw = fs.readFileSync(path.join(__dirname, '..', '..', 'templates', `${language}.md`), 'utf8')
  let newDate = Utils.createDateString()
  let fileName = Utils.generateFileName(name)

  let newIndex = Utils.getNewIndexString()
  let fileData = raw.replace(/{NUMBER}/g, Utils.getLatestIndex() + 1)
    .replace(/{TITLE}/g, name)
    .replace(/{DATE}/g, newDate)

  let filePath = savePath + newIndex + '-' + fileName + '.md'
  fs.writeFileSync(filePath, fileData)
  return filePath
}

export function create (name: string) {
  let savePath = Config.getSavePath()
  let i18n = Utils.getI18n()
  mkdirp.sync(savePath)
  const filePath = createDecisions(name, savePath)
  let toc = generate('toc', { output: false })
  fs.writeFileSync(savePath + 'README.md', toc)
  if(getPrintFormat()==='alfred'){
    console.log(path.join(process.cwd(), filePath))
  }else{
    console.log(i18n.logSavePath + savePath)
  }
}
