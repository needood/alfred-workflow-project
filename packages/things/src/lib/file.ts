import Config from './Config'
import Utils from './utils';
import path from 'path'
import walkSync from 'walk-sync'
import mkdirp from 'mkdirp'

export function file(index){
    let outputArray = getAllFilesName()
    let currentFileName = outputArray[index]
    let savePath = Config.getSavePath()
    const _fileName = Utils.generateFileName(currentFileName)
    const filePath = path.join(process.cwd(), savePath, _fileName)
    console.log(filePath)
    return filePath
}
export function getFiles(path?){
    if(path){
        let savePath = Config.getSavePath()
        if(savePath!==path){
            mkdirp.sync(path)
            let files = walkSync.entries(path, { globs: ['**/*.md'], ignore: ['README.md'] })
            return files
        }
    }
    const file_result = process.env.file_result
    if(file_result){
        return JSON.parse(file_result)
    }else{
        let savePath = Config.getSavePath()
        mkdirp.sync(savePath)
        let files = walkSync.entries(savePath, { globs: ['**/*.md'], ignore: ['README.md'] })
        process.env.file_result = JSON.stringify(files)
        return files
    }
}
export function getAllFilesName(): string[] {
    let outputArray = ['']
    let files = getFiles()
    files.forEach(function (file) {
        let fileName = file.relativePath

        let index = Utils.getIndexByString(fileName)
        if (index) {
            outputArray[index] = fileName
        }
    })

    return outputArray
}