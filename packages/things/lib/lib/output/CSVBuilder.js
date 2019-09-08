"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _StatusHelper = _interopRequireDefault(require("../StatusHelper"));

var _utils = _interopRequireDefault(require("../utils"));

var _Config = _interopRequireDefault(require("../Config"));

var _BasicOutput = _interopRequireDefault(require("./BasicOutput"));

var _GenerateBuilder = require("../base/GenerateBuilder");

var fs = require("fs");

var moment = require("moment");

var savePath = _Config.default.getSavePath();

class CSVBuilder extends _BasicOutput.default {
  buildFunc(index, decision, file, bodyString) {
    var lastStatus = _StatusHelper.default.getLatestStatus(savePath + file.relativePath);

    var body = `${index}, ${decision}, ${moment(file.mtime).format('YYYY-MM-DD')}, ${lastStatus}\n`;
    return bodyString.push(body);
  }

  buildContent() {
    var path = _Config.default.getSavePath();

    var i18n = _utils.default.getI18n();

    var graphGenerate = new _GenerateBuilder.GenerateBuilder(path);
    var startString = `Index, ${i18n.decision}, ${i18n.modifiedDate}, ${i18n.lastStatus}\n`;
    this.result = graphGenerate.setStart(startString).setEnd('').setBody(this.buildFunc).build();
    return this.result;
  }

  output() {
    fs.writeFileSync(this.workDir + '/export.csv', this.result);
  }

}

var _default = CSVBuilder;
exports.default = _default;
//# sourceMappingURL=CSVBuilder.js.map