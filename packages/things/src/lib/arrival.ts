import { getAllFilesName } from "./file";
import Config from "./Config";
import Utils from "./utils";
import path from 'path'
import fs from 'fs'
import { getPrintFormat } from "./print";
import { generate } from "./generate";

export function arrival (index): string {
    let outputArray = getAllFilesName()
    let currentFileName = outputArray[index]
    let savePath = Config.getSavePath()
    const _fileName = Utils.generateFileName(currentFileName)
    const filePath = path.join(process.cwd(), savePath, _fileName)
    fs.renameSync(filePath, filePath + '.arrival')
    delete process.env.file_result
    let toc = generate('toc', { output: false })
    fs.writeFileSync(savePath + 'README.md', toc)
    const type = getPrintFormat()
    if (type === 'alfred') {
        process.stdout.write('ok')
    }
    return filePath
}