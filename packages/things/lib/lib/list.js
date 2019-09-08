"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusColor = getStatusColor;
exports.list = list;

var _utils = _interopRequireDefault(require("./utils"));

var _StatusHelper = _interopRequireDefault(require("./StatusHelper"));

var _ListGenerateBuilder = require("./base/ListGenerateBuilder");

var _Config = _interopRequireDefault(require("./Config"));

var _StatusColor = _interopRequireDefault(require("./enum/StatusColor"));

var _print = require("./print");

var moment = require("moment");

var colors = require("colors/safe");

var path = _Config.default.getSavePath();

function getStatusColor(lastStatus) {
  var allStatus = _utils.default.getI18n()['status'];

  var color = '';

  if (!allStatus) {
    return _StatusColor.default.get('done');
  }

  Object.keys(allStatus).forEach(function (statusKey) {
    if (allStatus[statusKey] === lastStatus) {
      color = _StatusColor.default.get(statusKey);
    }
  });
  return color;
}

function getStatusWithColor(lastStatus) {
  if (!lastStatus) {
    return lastStatus;
  }

  var originLastStatus = lastStatus;
  var splitStatus = lastStatus.split(' ');

  if (splitStatus.length > 1) {
    lastStatus = splitStatus[splitStatus.length - 1].replace(' ', '');
  }

  var color = getStatusColor(lastStatus);

  if (color) {
    var ColorText = colors[color];
    return originLastStatus = ColorText(originLastStatus);
  }

  return originLastStatus;
}

function buildTocBodyFun(index, decision, file, bodyString) {
  var lastStatus = _StatusHelper.default.getLatestStatus(path + file.relativePath);

  var newItem = [index + '.' + decision, moment(file.mtime).format('YYYY-MM-DD'), getStatusWithColor(lastStatus)];
  return bodyString.push(newItem);
}

function listAdrByPath(path) {
  var i18n = _utils.default.getI18n();

  var tableData = [i18n.decision, i18n.modifiedDate, i18n.lastStatus];
  var listGenerateBuilder = new _ListGenerateBuilder.ListGenerateBuilder(path);
  var results = listGenerateBuilder.setStart(tableData).setEnd().setBody(buildTocBodyFun).build();
  return results;
}

function list() {
  var path = _Config.default.getSavePath();

  var adrs = listAdrByPath(path); // TODO: not to remove again

  var type = (0, _print.getPrintFormat)();

  if (type !== 'alfred') {
    console.log((0, _print.format)(adrs));
  }

  return adrs;
}
//# sourceMappingURL=list.js.map