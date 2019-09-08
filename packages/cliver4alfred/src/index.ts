import yargs from 'yargs'
import { bindOptions } from 'cliver/lib/options'
import { bindCommands } from 'cliver/lib/commands'
export interface AlfredItem{
    title
    subtitle
    arg?
    autocomplete?
    valid?
    icon?
}
interface handleFunc {
    (value): void;
}
interface Command {
    name: string
    desc: string
    handler: Function
}
interface Option {
    name: string
    alias?: string,
    desc: string,
    handler?: Function
}
class BaseAutofly {
    private _commands: Command[]
    private _options: Option[]
    private _variable: Map<string, string>=new Map
    private handlers: handleFunc[] = []
    private _getVariable = (key: string): string => {
        return this._variable.get(key)
    }
    private _output = (items: AlfredItem[] | AlfredItem): void => {
        this._results = this._results.concat(items)
    }
    private _setVariable = (key: string, value: string): void => {
        this._variable.set(key, value)
    }
    private _results: AlfredItem[] = []
    private _handleParam:Map<string,any>=new Map
    constructor({ commands, options }: { commands: Command[], options: Option[] }) {
        this._commands = commands
        this._options = options
        const handlers = this.handlers
        this._handleParam.set('output',this._output)
        this._handleParam.set('setVariable',this._setVariable)
        this._handleParam.set('getVariable',this._getVariable)
        this._commands.push({
            name: "alfred",
            desc: "for alfred",
            handler: _ => {
                const param = Object.fromEntries(this._handleParam)
                handlers.forEach(handler => {
                    handler(param)
                })
                console.log(JSON.stringify({ items: this._results, variables: Object.fromEntries(this._variable) }))
            }
        })
    }
    addResult(fn: handleFunc) {
        this.handlers.push(fn)
    }
    protected addHandleParam(key,value){
        this._handleParam.set(key, value)
    }
    output() {
        return { commands: this._commands, options: this._options }
    }
}
export class Autofly extends BaseAutofly {
    constructor({ commands, options }: { commands: Command[], options: Option[] }) {
        super({ commands, options });
        const cli = yargs()
        const setCommand = this._setCommand
        const setOption = this._setOption
        const arg = (process.env.query||'').trim().split(/ +/)
        bindOptions(cli, options.map((option): Option => {
            const { handler, ...other } = option
            return {
                handler(argv) {
                    if(argv[option.name]){
                        if(argv[option.name]===true){
                            setOption(option.name, 2)
                        }else{
                            setOption(option.name, 1)
                        }
                    }
                },
                ...other
            }
        }), arg)
        bindCommands(cli, commands.map((command): Command => {
            const { handler, ...other } = command
            return {
                handler(argv) {
                    const regexpResults = /\[(\w+)\]/.exec(command.name)
                    if (regexpResults && regexpResults[1]) {
                        if (argv[regexpResults[1]]){
                            setCommand(command.name, 1)
                        }else{
                            setCommand(command.name, 2)
                        }
                    }else{
                        setCommand(command.name, 1)
                    }
                },
                ...other
            }
        }))
        cli.parse(arg)
        this.addHandleParam('hasCommand', this._hasCommand)
        this.addHandleParam('hasOption', this._hasOption)
    }
    private _hasCommand = (key: string): number => {
        return this._command.get(key)||0
    }
    private _setCommand=(key:string,value:number)=>{
        this._command.set(key, value)
    }
    private _command:Map<string,number>=new Map
    private _option:Map<string,number>=new Map
    private _setOption=(key:string,value:number)=>{
        this._option.set(key, value)
    }
    private _hasOption = (key: string):number => {
        return this._option.get(key)||0
    }
}