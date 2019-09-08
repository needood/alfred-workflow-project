"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generate = generate;

var _GenerateBuilder = require("./base/GenerateBuilder");

var _Config = _interopRequireDefault(require("./Config"));

var _i18n = require("./helpers/i18n");

var fs = require("fs");

function buildGraphBuildFun(index, decision, file, bodyString, filesLength) {
  bodyString[index] = '\n  _' + index + ' [label="' + index + '.' + decision + '"; URL="' + file.relativePath + '"]';

  if (index !== 1) {
    bodyString[filesLength + index] = '\n  _' + (index - 1) + ' -> _' + index + ' [style="dotted"];';
  }

  return bodyString;
}

function buildTocBodyFun(index, decision, file, bodyString) {
  bodyString[index] = '\n* [' + index + '. ' + decision + '](' + file.relativePath + ')';
  return bodyString;
}

function generateToc(options) {
  var path = _Config.default.getSavePath();

  var graphGenerate = new _GenerateBuilder.GenerateBuilder(path);
  var header = '# ' + (0, _i18n.getI18n)().tocHeader + '\n';
  var results = graphGenerate.setStart(header).setEnd('').setBody(buildTocBodyFun).build();

  if (options && options.output) {
    console.log(results);
  }

  return results;
}

function generateGraph() {
  var path = _Config.default.getSavePath();

  var graphGenerate = new _GenerateBuilder.GenerateBuilder(path);
  var header = 'digraph {\n  node [shape=plaintext];';
  var results = graphGenerate.setStart(header).setEnd('\n}\n').setBody(buildGraphBuildFun).build();
  console.log(results);
  return results;
}

function generate(type, options) {
  if (type === 'toc') {
    var toc = generateToc(options);
    fs.writeFileSync(_Config.default.getSavePath() + 'README.md', toc);
    return toc;
  }

  if (type === 'graph') {
    return generateGraph();
  }

  var message = '\n error: type ' + type + ' current not supported';
  console.log(message);
  return message;
}
//# sourceMappingURL=generate.js.map