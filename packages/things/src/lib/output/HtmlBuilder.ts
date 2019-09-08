let walkSync = require('walk-sync')
let fs = require('fs')

import MdHelper from '../helpers/MdHelper'
import BasicOutput from './BasicOutput'
import { getFiles } from '../file';

class HtmlBuilder extends BasicOutput {
  buildFunc () {
    let files = getFiles(this.path)
    let path = this.path
    files.forEach(function (file) {
      let fileName = file.relativePath
      if (fileName === 'README.md' || fileName.indexOf('.md') === -1) {
        return
      }
      let fileData = fs.readFileSync(path + fileName, 'utf8')
      fs.appendFileSync('output.md', fileData + '\n\n')
    })
  }

  buildContent () {
    this.buildFunc()
    let fileData = fs.readFileSync('output.md', 'utf-8')
    fs.unlinkSync('output.md')

    this.result = MdHelper.mdRender(fileData)
    return this.result
  }

  output () {
    fs.writeFileSync(this.workDir + '/export.html', this.result, 'utf-8')
  }
}

export default HtmlBuilder
