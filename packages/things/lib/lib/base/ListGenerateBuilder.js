"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListGenerateBuilder = void 0;

var _GenerateBuilder = require("./GenerateBuilder");

var _Config = _interopRequireDefault(require("../Config"));

var _utils = _interopRequireDefault(require("../utils"));

var fs = require("fs");

var savePath = _Config.default.getSavePath();

class ListGenerateBuilder extends _GenerateBuilder.GenerateBuilder {
  setBody(handleBody) {
    var files = this.files;
    var bodyString = this.bodyString;
    files.forEach(function (file) {
      var fileName = file.relativePath;

      var index = _utils.default.getIndexByString(fileName);

      var fileData = fs.readFileSync(savePath + fileName, 'utf8');
      var firstLine = fileData.split('\n')[0];

      if (index) {
        var decision = firstLine.replace(/#\s\d+\.\s/g, '');
        handleBody(index, decision, file, bodyString, files.length);
      }
    });
    return this;
  }

}

exports.ListGenerateBuilder = ListGenerateBuilder;
//# sourceMappingURL=ListGenerateBuilder.js.map