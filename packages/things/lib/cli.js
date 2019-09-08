#!/usr/bin/env node
"use strict";

var _cliver = require("cliver");

var _file = require("./lib/file");

var _alfred = require("./lib/alfred");

var _lib = require("cliver4alfred/lib/");

var _arrival = require("./lib/arrival");

if (process.env.twd) {
  process.chdir(process.env.twd);
}

var {
  create
} = require("./lib/create");

var {
  list
} = require("./lib/list");

var {
  generate
} = require("./lib/generate");

var {
  update
} = require("./lib/update");

var {
  init
} = require("./lib/init");

var {
  logs
} = require("./lib/logs");

var {
  output
} = require("./lib/output");

var {
  search
} = require("./lib/search");

var {
  status
} = require("./lib/status");

var commands = [{
  name: "new [name]",
  desc: "create new ADR",

  handler(argv) {
    if (argv.name) {
      create(argv.name);
    }
  }

}, {
  name: "file",
  desc: "get file path",

  handler(argv) {
    if (argv.index) {
      (0, _file.file)(argv.index);
    }
  }

}, {
  name: "list",
  desc: "list all ADR",

  handler() {
    return list();
  }

}, {
  name: "update",
  desc: "update ADR",

  handler() {
    return update();
  }

}, {
  name: "arrival",
  desc: "arrival ADR",

  handler(argv) {
    if (argv.index) return (0, _arrival.arrival)(argv.index);
  }

}, {
  name: "status [status]",
  desc: "change one ADR status",

  handler(argv) {
    if (argv.index) {
      status(argv.index, argv.status);
    }
  }

}, {
  name: "generate [type]",
  desc: "generate toc or graph, default toc",

  handler(argv) {
    generate(argv.type);
  }

}, {
  name: "init [language]",
  desc: "init ADR with language, e.g. ``adr init en``",

  handler(argv) {
    init(argv.language);
  }

}, {
  name: "logs",
  desc: "list one ADR status logs",

  handler(argv) {
    if (argv.index) {
      logs(argv.index);
    }
  }

}, {
  name: "export [format]",
  desc: "export ADR reporter in HTML, CSV, JSON, Markdown",

  handler(argv) {
    if (argv.format) {
      output(argv.format);
    }
  }

}, {
  name: "search [keywords]",
  desc: "search ADRs by keywords",

  handler(argv) {
    if (argv.keywords) {
      search(argv.keywords);
    }
  }

}];
var options = [{
  name: 'print',
  alias: 'p',
  desc: '输出格式',

  handler(argv) {
    if (argv.print) {
      process.env.print_format = argv.print;
    }
  }

}, {
  name: 'index',
  alias: 'i',
  desc: '文件序列'
}];
var autofly = new _lib.Autofly({
  commands,
  options
});
autofly.addResult(obj => {
  (0, _alfred.alfred)(obj);
});
(0, _cliver.buildCli)(autofly.output());
//# sourceMappingURL=cli.js.map