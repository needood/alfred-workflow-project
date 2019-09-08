"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.file = file;
exports.getFiles = getFiles;
exports.getAllFilesName = getAllFilesName;

var _Config = _interopRequireDefault(require("./Config"));

var _utils = _interopRequireDefault(require("./utils"));

var _path = _interopRequireDefault(require("path"));

var _walkSync = _interopRequireDefault(require("walk-sync"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

function file(index) {
  var outputArray = getAllFilesName();
  var currentFileName = outputArray[index];

  var savePath = _Config.default.getSavePath();

  var _fileName = _utils.default.generateFileName(currentFileName);

  var filePath = _path.default.join(process.cwd(), savePath, _fileName);

  console.log(filePath);
  return filePath;
}

function getFiles(path) {
  if (path) {
    var savePath = _Config.default.getSavePath();

    if (savePath !== path) {
      _mkdirp.default.sync(path);

      var files = _walkSync.default.entries(path, {
        globs: ['**/*.md'],
        ignore: ['README.md']
      });

      return files;
    }
  }

  var file_result = process.env.file_result;

  if (file_result) {
    return JSON.parse(file_result);
  } else {
    var _savePath = _Config.default.getSavePath();

    _mkdirp.default.sync(_savePath);

    var _files = _walkSync.default.entries(_savePath, {
      globs: ['**/*.md'],
      ignore: ['README.md']
    });

    process.env.file_result = JSON.stringify(_files);
    return _files;
  }
}

function getAllFilesName() {
  var outputArray = [''];
  var files = getFiles();
  files.forEach(function (file) {
    var fileName = file.relativePath;

    var index = _utils.default.getIndexByString(fileName);

    if (index) {
      outputArray[index] = fileName;
    }
  });
  return outputArray;
}
//# sourceMappingURL=file.js.map