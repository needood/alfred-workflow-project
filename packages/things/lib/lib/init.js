"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;

var _utils = _interopRequireDefault(require("./utils"));

var fs = require("fs");

function init(language = 'zh-cn') {
  var workDir = _utils.default.getWorkDir();

  var defaultConfig = {
    language: language,
    path: 'docs/adr/',
    prefix: '',
    digits: 4
  };

  if (language === 'zh-cn' || language === 'chinese') {
    defaultConfig.language = 'zh-cn';
  } else {
    defaultConfig.language = 'en';
  }

  fs.writeFileSync(workDir + '/.adr.json', JSON.stringify(defaultConfig));
}
//# sourceMappingURL=init.js.map