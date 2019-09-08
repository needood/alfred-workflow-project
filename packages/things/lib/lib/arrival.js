"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrival = arrival;

var _file = require("./file");

var _Config = _interopRequireDefault(require("./Config"));

var _utils = _interopRequireDefault(require("./utils"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _print = require("./print");

var _generate = require("./generate");

function arrival(index) {
  var outputArray = (0, _file.getAllFilesName)();
  var currentFileName = outputArray[index];

  var savePath = _Config.default.getSavePath();

  var _fileName = _utils.default.generateFileName(currentFileName);

  var filePath = _path.default.join(process.cwd(), savePath, _fileName);

  _fs.default.renameSync(filePath, filePath + '.arrival');

  delete process.env.file_result;
  var toc = (0, _generate.generate)('toc', {
    output: false
  });

  _fs.default.writeFileSync(savePath + 'README.md', toc);

  var type = (0, _print.getPrintFormat)();

  if (type === 'alfred') {
    process.stdout.write('ok');
  }

  return filePath;
}
//# sourceMappingURL=arrival.js.map