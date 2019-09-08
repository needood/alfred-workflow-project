import Utils from "./utils";
import { AlfredItem } from "autocomplete/src";

let Table = require('table')
export function setPrintFormat(format:string){
    process.env.print_format = format
}
export function getPrintFormat():string{
    return process.env.print_format
}
export function format(results: string[][] | string) {
    let i18n = Utils.getI18n()
    let statusMap = new Map(Array.from(Object.entries(i18n.status)).map(([key, value]) => {
        return [value, key]
    }))
    const type = getPrintFormat()
    if (type === 'alfred') {
        const items:AlfredItem[] = json(results).map(item => {
            let index = Utils.getIndexByString(item.title)
            const status = item.subtitle.replace(/^.*? /,'')
            let iconpath
            if (statusMap.get(status)){
                iconpath=`icon/file_${statusMap.get(status)}.png`
            }else{
                iconpath=`icon/file_normal.png`
            }
            return {
                valid:false,
                autocomplete: `-i=${index}`,
                icon:{
                    path:iconpath
                },
                ...item
            }
        })
        return items
    } else {
        return Table.table(results)
    }
}

function json(array: string[][] | string) {
    if (typeof array === 'string') {
        return []
    }
    const items = array.slice(1).map(([name,time,status])=>{
        return {
            title: name,
            subtitle: status,
        }
    })
    return items
}