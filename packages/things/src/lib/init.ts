let fs = require('fs')
import Config from './Config'

import Utils from './utils'

export function init(language = 'zh-cn'): void {
  let workDir = Utils.getWorkDir()
  let defaultConfig = {
    language: language,
    path: 'docs/adr/',
    prefix: '',
    digits: 4
  }
  if (language === 'zh-cn' || language === 'chinese') {
    defaultConfig.language = 'zh-cn'
  }else{
    defaultConfig.language = 'en'
  }
  fs.writeFileSync(workDir + '/.adr.json', JSON.stringify(defaultConfig))
}
