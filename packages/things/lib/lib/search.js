"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = search;

var _SearchListGenerateBuilder = _interopRequireDefault(require("./base/SearchListGenerateBuilder"));

var _Config = _interopRequireDefault(require("./Config"));

var _utils = _interopRequireDefault(require("./utils"));

var _StatusHelper = _interopRequireDefault(require("./StatusHelper"));

var findInFiles = require("find-in-files");

var Table = require("table");

var savePath = _Config.default.getSavePath();

function buildTocBodyFun(index, decision, file, bodyString) {
  var lastStatus = _StatusHelper.default.getLatestStatus(savePath + file.relativePath);

  var newItem = [index + '.' + decision, lastStatus];
  return bodyString.push(newItem);
}

function search(keywords) {
  findInFiles.find({
    'term': keywords,
    'flags': 'ig'
  }, savePath, '.md$').then(results => {
    var files = [];

    for (var result in results) {
      files.push({
        relativePath: result.substring(savePath.length, result.length)
      });
    }

    var listGenerateBuilder = new _SearchListGenerateBuilder.default(savePath);

    var i18n = _utils.default.getI18n();

    var tableData = [i18n.decision, i18n.lastStatus];
    var searchResults = listGenerateBuilder.setStart(tableData).setFiles(files).setEnd().setBody(buildTocBodyFun).build();
    console.log(Table.table(searchResults));
    return Table.table(searchResults);
  });
}
//# sourceMappingURL=search.js.map