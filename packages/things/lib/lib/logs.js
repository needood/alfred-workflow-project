"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logs = logs;

var _StatusHelper = _interopRequireDefault(require("./StatusHelper"));

var _Config = _interopRequireDefault(require("./Config"));

var _file = require("./file");

var walkSync = require("walk-sync");

var Table = require("table");

var path = _Config.default.getSavePath();

function createLogsHeader(allStatus) {
  var tableHeader = [];
  var currentStatus = allStatus[0];
  var splitCurrentStatus = currentStatus.split(' ');

  for (var i = 0; i < splitCurrentStatus.length; i++) {
    tableHeader.push(' - ');
  }

  return tableHeader;
}

function createLogsBody(allStatus, tableData) {
  for (var i = 0; i < allStatus.length; i++) {
    var tableHeader = [];
    var currentStatus = allStatus[i];
    var splitCurrentStatus = currentStatus.split(' ');

    for (var _i = 0; _i < splitCurrentStatus.length; _i++) {
      tableHeader.push(splitCurrentStatus[_i]);
    }

    tableData.push(tableHeader);
  }

  return tableData;
}

function logs(index) {
  var outputArray = (0, _file.getAllFilesName)();
  var currentFileName = outputArray[index];
  var filePath = path + currentFileName;

  var allStatus = _StatusHelper.default.getAllStatus(filePath);

  if (allStatus.length === 0) {
    console.log('no status: did .adr.json config has correct config of language??');
    return '';
  }

  var tableData = [];
  var tableHeader = createLogsHeader(allStatus);
  tableData.push(tableHeader);
  createLogsBody(allStatus, tableData);
  var output = Table.table(tableData);
  console.log(output);
  return output;
}
//# sourceMappingURL=logs.js.map