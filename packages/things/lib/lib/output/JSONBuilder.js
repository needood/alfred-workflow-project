"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JsonGenerateBuilder = require("../base/JsonGenerateBuilder");

var _BasicOutput = _interopRequireDefault(require("./BasicOutput"));

var _StatusHelper = _interopRequireDefault(require("../StatusHelper"));

var _Config = _interopRequireDefault(require("../Config"));

var fs = require("fs");

var moment = require("moment");

var savePath = _Config.default.getSavePath();

class JSONBuilder extends _BasicOutput.default {
  buildFunc(index, decision, file, bodyString) {
    var lastStatus = _StatusHelper.default.getLatestStatus(savePath + file.relativePath);

    var body = {
      index: index,
      decision: decision,
      modifiedDate: moment(file.mtime).format('YYYY-MM-DD'),
      lastStatus: lastStatus
    };
    return bodyString.push(body);
  }

  buildContent() {
    var path = _Config.default.getSavePath();

    var graphGenerate = new _JsonGenerateBuilder.JsonGenerateBuilder(path);
    this.result = graphGenerate.setBody(this.buildFunc).build();
    return JSON.stringify(this.result);
  }

  output() {
    fs.writeFileSync(this.workDir + '/export.json', JSON.stringify(this.result), 'utf-8');
  }

}

var _default = JSONBuilder;
exports.default = _default;
//# sourceMappingURL=JSONBuilder.js.map