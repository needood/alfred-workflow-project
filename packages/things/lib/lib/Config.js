"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _init = require("./init");

var fs = require("fs");

var LRU = require("lru-cache");

var cache = new LRU({
  max: 500
});
var DEFAULT_CONFIG = {
  language: 'zh-cn',
  path: _utils.default.getWorkDir() + '/docs/adr/',
  prefix: '',
  digits: 4
};

function getAllConfig(defaultValue) {
  if (!fs.existsSync(_utils.default.getWorkDir() + '/.adr.json')) {
    (0, _init.init)();
    return defaultValue;
  }

  var config = fs.readFileSync(_utils.default.getWorkDir() + '/.adr.json', 'utf8');

  try {
    var parsedConfig = JSON.parse(config);
    cache.set('config', parsedConfig);
    return parsedConfig;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
}

function getConfig(key) {
  var defaultValue = DEFAULT_CONFIG[key];
  var config;

  if (cache.get('config')) {
    config = cache.get('config');
  } else {
    config = getAllConfig(defaultValue);
  }

  if (config && config[key]) {
    return config[key];
  }

  return defaultValue;
}

function getLanguage() {
  return getConfig('language');
}

function getPrefix() {
  return getConfig('prefix');
}

function getDigits() {
  return getConfig('digits');
}

function getSavePath() {
  return getConfig('path');
}

var Config = {
  getAllConfig: getAllConfig,
  getSavePath: getSavePath,
  getLanguage: getLanguage,
  getPrefix: getPrefix,
  getDigits: getDigits,
  getConfig: getConfig
};
var _default = Config;
exports.default = _default;
//# sourceMappingURL=Config.js.map