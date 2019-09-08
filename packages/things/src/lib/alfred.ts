import { setPrintFormat, format } from "./print"
import { list } from "./list"
import { AlfredItem } from "autocomplete/src"
import Utils from "./utils";

export function alfred({ output, setVariable, hasCommand, hasOption }) {
    setPrintFormat('alfred')
    const arg = process.env.query
    const argOption = (arg||'').replace(/(^| )+([^- ][^ ]+)/g, '')
    if (!hasOption('index')) {
        const isNew = hasCommand("new [name]")===1
        const newItem: AlfredItem = {
            title: `新建`,
            subtitle: isNew ? `${arg}` : `new`,
            autocomplete: isNew ? undefined : `new `,
            valid: isNew ? true : false,
            arg: `${arg}`,
            icon:{
                path:'./icon/new.png'
            }
        }
        output(newItem)
        output(format(list()))
    } else if(hasOption('index')===2){
        output(format(list()))
    } else {
        if (hasCommand('status [status]')) {
            let i18n = Utils.getI18n()
            let statusEntries = Object.entries(i18n.status)
            output(Array.from(statusEntries).map(([key, value]) => {
                return {
                    title: `更新为 ${value}`,
                    subtitle: `${arg} ${value}`,
                    arg: `${arg} ${value}`,
                    icon:{
                        path:`./icon/file_${key}.png`
                    }
                }
            }))
        }else{
            const doItem: AlfredItem[] = [{
                title: `打开`,
                subtitle: `${argOption} file`,
                arg: `${argOption} file`,
                icon:{
                    path:`./icon/open.png`
                }
            },{
                title: `状态更新`,
                subtitle: `${argOption} status`,
                autocomplete: `${argOption} status `,
                valid:false,
                icon:{
                    path:`./icon/update.png`
                }
            },{
                title: `归档`,
                subtitle: `${argOption} arrival`,
                arg: `${argOption} arrival `,
                icon:{
                    path:`./icon/arrival.png`
                }
            }]
            output(doItem)
        }
    }

    if (process.env.file_result) {
        setVariable('file_result', process.env.file_result)
    }
}