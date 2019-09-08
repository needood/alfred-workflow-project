"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = update;

var _utils = _interopRequireDefault(require("./utils"));

var _generate = require("./generate");

var _Config = _interopRequireDefault(require("./Config"));

var _file = require("./file");

///<reference path="generate.ts"/>
var walkSync = require("walk-sync");

var fs = require("fs");

var savePath = _Config.default.getSavePath();

function generateNewFileName(newIndex, title) {
  var indexString = _utils.default.createIndexByNumber(newIndex);

  var decisionInfile = _utils.default.generateFileName(title);

  return indexString + '-' + decisionInfile + '.md';
}

function updateNameByTitle() {
  var files = (0, _file.getFiles)();
  files.forEach(function (file) {
    var fileName = file.relativePath;
    var fileData = fs.readFileSync(savePath + fileName, 'utf8');
    var firstLine = fileData.split('\n')[0];
    var title = firstLine.replace(/#\s\d+\.\s/g, '');
    var indexRegex = /#\s(\d+)\.\s/.exec(firstLine);
    var oldIndex;

    if (!indexRegex) {
      oldIndex = _utils.default.getIndexByString(fileName);

      if (!oldIndex) {
        return;
      }
    } else {
      oldIndex = indexRegex[1];
    }

    var newIndex = parseInt(oldIndex, 10);
    var newFileName = generateNewFileName(newIndex, title);

    if (fileName !== newFileName) {
      console.log(fileName + ' -> ' + newFileName);
      fs.renameSync(savePath + fileName, savePath + newFileName);
    }
  });
}

function updateToc() {
  var toc = (0, _generate.generate)('toc', {
    output: false
  });
  fs.writeFileSync(savePath + 'README.md', toc);
}

function update() {
  console.log('update decisions ...');
  updateNameByTitle();
  console.log('update adr toc ...');
  updateToc();
}
//# sourceMappingURL=update.js.map