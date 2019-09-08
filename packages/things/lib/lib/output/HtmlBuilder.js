"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MdHelper = _interopRequireDefault(require("../helpers/MdHelper"));

var _BasicOutput = _interopRequireDefault(require("./BasicOutput"));

var _file = require("../file");

var walkSync = require("walk-sync");

var fs = require("fs");

class HtmlBuilder extends _BasicOutput.default {
  buildFunc() {
    var files = (0, _file.getFiles)(this.path);
    var path = this.path;
    files.forEach(function (file) {
      var fileName = file.relativePath;

      if (fileName === 'README.md' || fileName.indexOf('.md') === -1) {
        return;
      }

      var fileData = fs.readFileSync(path + fileName, 'utf8');
      fs.appendFileSync('output.md', fileData + '\n\n');
    });
  }

  buildContent() {
    this.buildFunc();
    var fileData = fs.readFileSync('output.md', 'utf-8');
    fs.unlinkSync('output.md');
    this.result = _MdHelper.default.mdRender(fileData);
    return this.result;
  }

  output() {
    fs.writeFileSync(this.workDir + '/export.html', this.result, 'utf-8');
  }

}

var _default = HtmlBuilder;
exports.default = _default;
//# sourceMappingURL=HtmlBuilder.js.map