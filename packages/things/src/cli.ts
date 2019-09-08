#!/usr/bin/env node
import 'v8-compile-cache'
import { buildCli } from 'cliver'
import { file } from './lib/file';
import { alfred } from './lib/alfred';
import { Autofly } from 'cliver4alfred/src/';
import { arrival } from './lib/arrival';
let {create} = require('./lib/create')
let {list} = require('./lib/list')
let {generate} = require('./lib/generate')
let {update} = require('./lib/update')
let {init} = require('./lib/init')
let {logs} = require('./lib/logs')
let {output} = require('./lib/output')
let {search} = require('./lib/search')
let {status} = require('./lib/status')

const commands = [{
    name: "new [name]",
    desc: "create new ADR",
    handler(argv) {
        if (argv.name) {
          create(argv.name)
        }
    }
    
},{
    name: "file",
    desc: "get file path",
    handler(argv) {
      if (argv.index) {
        file(argv.index)
      }
    }
},{
    name: "list",
    desc: "list all ADR",
    handler() {
      return list()
    }
},{
    name: "update",
    desc: "update ADR",
    handler() {
      return update()
    }
  },{

    name: "arrival",
    desc: "arrival ADR",
    handler(argv) {
      if(argv.index)
      return arrival(argv.index)
    }
},{
    name: "status [status]",
    desc: "change one ADR status",
    handler(argv) {
        if (argv.index) {
          status(argv.index,argv.status)
        }
    }
},{
    name: "generate [type]",
    desc: "generate toc or graph, default toc",
    handler(argv) {
      generate(argv.type)
    }
},{
    name: "init [language]",
    desc: "init ADR with language, e.g. ``adr init en``",
    handler(argv) {
      init(argv.language)
    }
},{
    name: "logs",
    desc: "list one ADR status logs",
    handler(argv) {
      if(argv.index){
        logs(argv.index)
      }
    }
},{
    name: "export [format]",
    desc: "export ADR reporter in HTML, CSV, JSON, Markdown",
    handler(argv) {
      if(argv.format){
        output(argv.format)
      }
    }
},{
    name: "search [keywords]",
    desc: "search ADRs by keywords",
    handler(argv) {
      if(argv.keywords){
        search(argv.keywords)
      }
    }
}]
const options = [{
  name:'print',
  alias:'p',
  desc: '输出格式',
  handler(argv){
    if(argv.print){
      process.env.print_format = argv.print
    }
  }
},{
  name:'index',
  alias:'i',
  desc: '文件序列'
}]
const autofly = new Autofly({commands, options})
autofly.addResult((obj) => {
  alfred(obj)
})
buildCli(autofly.output())

