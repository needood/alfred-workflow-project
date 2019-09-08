"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var fs = require("fs");

var md = require("markdown").markdown;

var i18n = _utils.default.getI18n();

function getStatusSection(tree) {
  var statusFlag = false;
  var statusSection = [];

  for (var i = 0; i < tree.length; i++) {
    var node = tree[i];

    if (statusFlag && node[0] === 'header') {
      return statusSection;
    }

    if (statusFlag) {
      statusSection.push(node);
    }

    if (node[0] === 'header' && node[2] === i18n.Status) {
      statusFlag = true;
    }
  }

  return statusSection;
}

function getStatusWithDate(statusSections) {
  var status = [];

  for (var i = 0; i < statusSections.length; i++) {
    var currentStatusSection = statusSections[i];

    if (currentStatusSection[0] === 'para') {
      if (/\d{1,4}-\d{1,2}-\d{1,2}/.test(currentStatusSection[1])) {
        status.push(currentStatusSection[1]);
      }
    }
  }

  return status;
}

function setStatus(filePath, status) {
  var fileData;

  try {
    fileData = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.log(error);
    return [];
  }

  var flag = false;
  var regExp = `## ${i18n.Status}`;
  var data = fileData.split('\n');

  for (var i = 0; i < data.length; i++) {
    var line = data[i];

    if (flag && line[0] === '#') {
      data.splice(i, 0, `${_utils.default.createDateString()} ${status}`);
      data.splice(i + 1, 0, '');
      return fs.writeFileSync(filePath, data.join('\n'));
    }

    if (line.match(regExp)) flag = true;
  }
}

function getAllStatus(filePath) {
  var fileData;

  try {
    fileData = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.log(error);
    return [];
  }

  var tree = md.parse(fileData);
  var statusSections = getStatusSection(tree);
  var status = getStatusWithDate(statusSections);

  if (status.length === 0) {
    var lastStatusSection = statusSections[statusSections.length - 1];

    if (!(lastStatusSection && lastStatusSection[1])) {
      return [];
    }

    status = [lastStatusSection[1]];
  }

  return status;
}

function getLatestStatus(filePath) {
  var allStatus = getAllStatus(filePath);
  return allStatus[allStatus.length - 1];
}

var StatusHelper = {
  setStatus: setStatus,
  getLatestStatus: getLatestStatus,
  getAllStatus: getAllStatus
};
var _default = StatusHelper;
exports.default = _default;
//# sourceMappingURL=StatusHelper.js.map