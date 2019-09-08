"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenerateBuilder = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = _interopRequireDefault(require("../utils"));

var _file = require("../file");

///<reference path="AbstractBuilder.ts"/>
class GenerateBuilder {
  constructor(path) {
    (0, _defineProperty2.default)(this, "path", void 0);
    (0, _defineProperty2.default)(this, "files", void 0);
    (0, _defineProperty2.default)(this, "startString", void 0);
    (0, _defineProperty2.default)(this, "endString", void 0);
    (0, _defineProperty2.default)(this, "bodyString", void 0);
    this.path = path;
    this.bodyString = [''];
    this.files = (0, _file.getFiles)(this.path);
  }

  setBody(handleBody) {
    var files = this.files;
    var bodyString = this.bodyString;
    this.files.forEach(function (file) {
      var fileName = file.relativePath;
      var fileNameLength = fileName.length;
      var numberLength = _utils.default.getNumberLength(fileName) + '-'.length;
      var markdownWithPrefixLength = '.md'.length;

      var index = _utils.default.getIndexByString(fileName);

      if (index) {
        var decision = fileName.substring(numberLength, fileNameLength - markdownWithPrefixLength);
        handleBody(index, decision, file, bodyString, files.length);
      }
    });
    return this;
  }

  setStart(startSting) {
    this.startString = startSting;
    return this;
  }

  setEnd(endString) {
    if (endString) {
      this.endString = endString;
    } else if (typeof endString === 'string') {
      this.endString = '';
    }

    return this;
  }

  build() {
    if (typeof this.startString === 'string') {
      return this.startString + this.bodyString.join('') + this.endString;
    }

    if (typeof this.startString === 'object') {
      var results = [];
      results.push(this.startString);

      for (var i = 0; i < this.bodyString.length; i++) {
        var currentBodyString = this.bodyString[i];

        if (currentBodyString) {
          results.push(currentBodyString);
        }
      }

      return results;
    }

    return '';
  }

}

exports.GenerateBuilder = GenerateBuilder;
//# sourceMappingURL=GenerateBuilder.js.map