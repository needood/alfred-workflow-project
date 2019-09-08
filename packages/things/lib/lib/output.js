"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.output = output;

var _utils = _interopRequireDefault(require("./utils"));

var _CSVBuilder = _interopRequireDefault(require("./output/CSVBuilder"));

var _JSONBuilder = _interopRequireDefault(require("./output/JSONBuilder"));

var _HtmlBuilder = _interopRequireDefault(require("./output/HtmlBuilder"));

var _Config = _interopRequireDefault(require("./Config"));

var path = _Config.default.getSavePath();

function output(type) {
  var workDir = _utils.default.getWorkDir();

  var builder;

  if (type.toLowerCase() === 'csv') {
    builder = new _CSVBuilder.default(path, workDir);
  } else if (type.toLowerCase() === 'json') {
    builder = new _JSONBuilder.default(path, workDir);
  } else if (type.toLowerCase() === 'html') {
    builder = new _HtmlBuilder.default(path, workDir);
  } else {
    var message = '\n error: type ' + type + ' current not supported';
    console.log(message);
    return message;
  }

  var output = builder.buildContent();
  builder.output();
  return output;
}
//# sourceMappingURL=output.js.map