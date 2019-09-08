let inquirer = require('inquirer')

import Utils from './utils'
import StatusHelper from './StatusHelper'
import Config from './Config'
import { getAllFilesName } from './file';
import { getPrintFormat } from './print';

let path = Config.getSavePath()
let i18n = Utils.getI18n()


export function status(index, _status?): void {
  let fileName = getAllFilesName()[index]
  let status = StatusHelper.getLatestStatus(path + fileName)
  let statusList = i18n.statusStr.split('/')
  if(_status){
    StatusHelper.setStatus(path + fileName, _status)
    const type = getPrintFormat()
    if (type === 'alfred') {
      process.stdout.write('ok')
    }
    return 
  }
  inquirer.prompt([{
    type: 'list',
    name: 'status',
    message: `${fileName}(${status}) new status:`,
    choices: statusList
  }]).then(answer => {
    StatusHelper.setStatus(path + fileName, answer.status)
  })
}
