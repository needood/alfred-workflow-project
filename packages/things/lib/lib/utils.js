"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("./helpers/i18n");

var _Config = _interopRequireDefault(require("./Config"));

var _file = require("./file");

var moment = require("moment");

function getWorkDir() {
  return process.cwd();
}

function createIndexByNumber(num) {
  var s = '00000000' + num;
  return _Config.default.getPrefix() + s.substr(s.length - _Config.default.getDigits());
}

function getMaxIndex(files) {
  var maxNumber = 0;
  files.forEach(function (file) {
    var fileName = file.relativePath;

    if (fileName === 'README.md') {
      return;
    }

    var indexNumber = fileName.substring(_Config.default.getPrefix().length, _Config.default.getDigits() + _Config.default.getPrefix().length);
    var currentIndex = parseInt(indexNumber, 10);

    if (currentIndex > maxNumber) {
      maxNumber = currentIndex;
    }
  });
  return maxNumber;
}

function getLatestIndex() {
  var files = (0, _file.getFiles)();

  if (!(files && files.length > 0)) {
    return 0;
  }

  return getMaxIndex(files);
}

function getNewIndexString() {
  var lastIndex = getLatestIndex();

  if (!lastIndex) {
    return createIndexByNumber(1);
  }

  lastIndex = lastIndex + 1;
  return createIndexByNumber(lastIndex);
}

function generateFileName(originFileName) {
  return originFileName.toLowerCase().trim().replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single _
  .replace(/^-+|-+$/g, '') // remove leading, trailing -
  .replace(/，/g, '').replace(/。/g, '').replace(/ /g, '-').replace(/\?/g, '-').replace(/#/g, '').replace(/:/g, '').replace(/# /g, '');
}

function getNumberLength(fileName) {
  var numberLength = fileName.split('-')[0];
  return numberLength.length;
}

function getIndexByString(fileName) {
  var numberLength = getNumberLength(fileName);

  var prefixLength = _Config.default.getPrefix().length;

  return parseInt(fileName.substring(prefixLength, numberLength + prefixLength), 10);
}

function createDateString() {
  return moment().format('YYYY-MM-DD');
}

var Utils = {
  getNewIndexString: getNewIndexString,
  getLatestIndex: getLatestIndex,
  createIndexByNumber: createIndexByNumber,
  generateFileName: generateFileName,
  getWorkDir: getWorkDir,
  getI18n: _i18n.getI18n,
  createDateString: createDateString,
  getNumberLength: getNumberLength,
  getIndexByString: getIndexByString
};
var _default = Utils;
exports.default = _default;
//# sourceMappingURL=utils.js.map