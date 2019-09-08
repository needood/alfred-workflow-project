"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _Config = _interopRequireDefault(require("./Config"));

var _utils = _interopRequireDefault(require("./utils"));

var _generate = require("./generate");

var _print = require("./print");

var fs = require("fs");

var path = require("path");

var mkdirp = require("mkdirp");

function createDecisions(name, savePath) {
  var language = _Config.default.getLanguage();

  var raw = fs.readFileSync(path.join(__dirname, '..', '..', 'templates', `${language}.md`), 'utf8');

  var newDate = _utils.default.createDateString();

  var fileName = _utils.default.generateFileName(name);

  var newIndex = _utils.default.getNewIndexString();

  var fileData = raw.replace(/{NUMBER}/g, _utils.default.getLatestIndex() + 1).replace(/{TITLE}/g, name).replace(/{DATE}/g, newDate);
  var filePath = savePath + newIndex + '-' + fileName + '.md';
  fs.writeFileSync(filePath, fileData);
  return filePath;
}

function create(name) {
  var savePath = _Config.default.getSavePath();

  var i18n = _utils.default.getI18n();

  mkdirp.sync(savePath);
  var filePath = createDecisions(name, savePath);
  var toc = (0, _generate.generate)('toc', {
    output: false
  });
  fs.writeFileSync(savePath + 'README.md', toc);

  if ((0, _print.getPrintFormat)() === 'alfred') {
    console.log(path.join(process.cwd(), filePath));
  } else {
    console.log(i18n.logSavePath + savePath);
  }
}
//# sourceMappingURL=create.js.map