let walkSync = require('walk-sync')
let Table = require('table')

import StatusHelper from './StatusHelper'
import Config from './Config'
import { getAllFilesName } from './file';

let path = Config.getSavePath()


function createLogsHeader (allStatus: string[]): string[] {
  let tableHeader: string[] = []

  let currentStatus = allStatus[0]
  let splitCurrentStatus = currentStatus.split(' ')

  for (let i = 0; i < splitCurrentStatus.length; i++) {
    tableHeader.push(' - ')
  }

  return tableHeader
}
function createLogsBody (allStatus: string[], tableData: string[][]): string[][] {
  for (let i = 0; i < allStatus.length; i++) {
    let tableHeader: string[] = []
    let currentStatus = allStatus[i]
    let splitCurrentStatus = currentStatus.split(' ')
    for (let i = 0; i < splitCurrentStatus.length; i++) {
      tableHeader.push(splitCurrentStatus[i])
    }
    tableData.push(tableHeader)
  }
  return tableData
}

export function logs (index): string {
  let outputArray = getAllFilesName()
  let currentFileName = outputArray[index]
  let filePath = path + currentFileName
  let allStatus = StatusHelper.getAllStatus(filePath)
  if (allStatus.length === 0) {
    console.log('no status: did .adr.json config has correct config of language??')
    return ''
  }
  let tableData: string[][] = []

  let tableHeader = createLogsHeader(allStatus)
  tableData.push(tableHeader)
  createLogsBody(allStatus, tableData)
  let output = Table.table(tableData)

  console.log(output)
  return output
}
